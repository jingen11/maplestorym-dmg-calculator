import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";

export function getDomainName(scope: Construct): string {
  return Stack.of(scope).node.tryGetContext("domainName") ?? "maplestorym.com";
}

/**
 * Resolve the hosted zone. Prefers an explicit hostedZoneId from context
 * (works without AWS credentials at synth time); falls back to a Route53
 * lookup. Route53 is global, so each stack can resolve it independently.
 */
export function getHostedZone(
  scope: Construct,
  id: string,
): route53.IHostedZone {
  const domainName = getDomainName(scope);
  const hostedZoneId = Stack.of(scope).node.tryGetContext("hostedZoneId");
  return hostedZoneId
    ? route53.HostedZone.fromHostedZoneAttributes(scope, id, {
        hostedZoneId,
        zoneName: domainName,
      })
    : route53.HostedZone.fromLookup(scope, id, { domainName });
}
