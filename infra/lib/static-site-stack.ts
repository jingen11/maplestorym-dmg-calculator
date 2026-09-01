import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { getDomainName, getHostedZone } from "./zone";

export interface StaticSiteStackProps extends cdk.StackProps {
  /** us-east-1 certificate from CertificateStack (CloudFront requirement) */
  certificate: acm.ICertificate;
}

/**
 * Static site: CloudFront -> private S3 bucket (Origin Access Control),
 * serving the Next.js static export from ../out on the apex domain. www
 * stays an alias on the same distribution — with a DNS record and a cert
 * SAN — purely so it can answer over HTTPS with a 301 to the apex.
 */
export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props);

    const domainName = getDomainName(this);
    const wwwDomainName = `www.${domainName}`;
    const zone = getHostedZone(this, "Zone");
    const certificate = props.certificate;

    const bucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    /* Viewer-request function, doing two jobs in one (CloudFront allows only
       one function per event type per behaviour):

       1. Canonical host. The distribution answers on www and on its own
          *.cloudfront.net name as well as the apex, and used to serve all
          three a 200 — so Google indexed www separately from the apex and
          split the rankings between them. Anything that isn't the apex now
          301s to it. This runs before the cache lookup and builds its own
          response, so the cached objects (whose key carries no host) are
          never involved.

       2. The export uses trailingSlash, so pages live at <path>/index.html.
          CloudFront only maps the root automatically; the rest is rewritten
          here — after the redirect, so Location keeps the clean URL. */
    const rewriteFunction = new cloudfront.Function(this, "IndexRewrite", {
      comment: "Redirect non-apex hosts, rewrite directory URLs to index.html",
      code: cloudfront.FunctionCode.fromInline(`
var APEX = '${domainName}';

function handler(event) {
  var request = event.request;

  var host = request.headers.host ? request.headers.host.value.toLowerCase() : APEX;
  if (host !== APEX) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + APEX + request.uri + queryString(request) },
        'cache-control': { value: 'max-age=86400' }
      }
    };
  }

  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.includes('.')) {
    request.uri = uri + '/index.html';
  }
  return request;
}

// Rebuild the query string the redirect has to carry through: the event
// hands it over already split into an object, one entry per name.
function queryString(request) {
  var parts = [];
  for (var name in request.querystring) {
    var param = request.querystring[name];
    var values = param.multiValue || [param];
    for (var i = 0; i < values.length; i++) {
      parts.push(values[i].value === '' ? name : name + '=' + values[i].value);
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}
`),
    });

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        functionAssociations: [
          {
            function: rewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: [domainName, wwwDomainName],
      certificate,
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion:
        cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
    });

    for (const [recordId, name] of [
      ["ApexAlias", domainName],
      ["WwwAlias", wwwDomainName],
    ] as const) {
      const target = route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      );
      new route53.ARecord(this, recordId, { zone, recordName: name, target });
      new route53.AaaaRecord(this, `${recordId}AAAA`, {
        zone,
        recordName: name,
        target,
      });
    }

    new s3deploy.BucketDeployment(this, "DeploySite", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../out"))],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
      prune: true,
    });

    new cdk.CfnOutput(this, "SiteUrl", { value: `https://${domainName}` });
    new cdk.CfnOutput(this, "DistributionDomain", {
      value: distribution.distributionDomainName,
    });
    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
  }
}
