import { AWSError } from 'aws-sdk/lib/error';

export function awsErr(error: AWSError): string {
  return `[AWS] ${error.code}: ${error.message}`;
}
