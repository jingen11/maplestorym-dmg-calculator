import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { getDomainName, getHostedZone } from "./zone";

/**
 * CloudFront requires its ACM certificate to live in us-east-1, so the
 * certificate gets its own stack there; the site stack (in another
 * region) consumes it via cross-region references.
 */
export class CertificateStack extends cdk.Stack {
  readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = getDomainName(this);
    const zone = getHostedZone(this, "Zone");

    this.certificate = new acm.Certificate(this, "Certificate", {
      domainName,
      subjectAlternativeNames: [`www.${domainName}`],
      validation: acm.CertificateValidation.fromDns(zone),
    });
  }
}
