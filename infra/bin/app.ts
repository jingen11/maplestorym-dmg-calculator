#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CertificateStack } from "../lib/certificate-stack";
import { StaticSiteStack } from "../lib/static-site-stack";

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT;

// CloudFront certificates must live in us-east-1; everything else runs in
// ap-southeast-5. crossRegionReferences wires the certificate across.
const certStack = new CertificateStack(app, "MaplestorymCert", {
  env: { account, region: "us-east-1" },
  crossRegionReferences: true,
});

new StaticSiteStack(app, "MaplestorymSite", {
  env: { account, region: "ap-southeast-5" },
  crossRegionReferences: true,
  certificate: certStack.certificate,
});
