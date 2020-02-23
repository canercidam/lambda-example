import { AWSError } from 'aws-sdk/lib/error';

export function logFormat(message: string, data: any): string {
  return `${message}: ${JSON.stringify(data, null, 2)}`;
}

export function awsErr(error: AWSError): string {
  return `[AWS] ${error.code}: ${error.message}`;
}
