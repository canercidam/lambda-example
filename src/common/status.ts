export enum ErrorCode {
  EMPTY_BODY = 'EMPTY_BODY',
  MISSING_MESSAGE = 'MISSING_MESSAGE',
  FAILED = 'FAILED'
}

export enum Status {
  OK = 200,
  BadRequest = 400,
  InternalError = 500,
}

export interface ServiceResponse {
  statusCode: number;
  body?: string;
}

export async function badRequest(errorCode: ErrorCode, data?: any): Promise<ServiceResponse> {
  return Promise.resolve({
    statusCode: Status.BadRequest,
    body: JSON.stringify({
      error_code: errorCode,
      message: data,
    }),
  });
}

export async function internalErr(data?: any): Promise<ServiceResponse> {
  return Promise.resolve({
    statusCode: Status.InternalError,
    body: JSON.stringify({
      error_code: ErrorCode.FAILED,
      message: data,
    }),
  });
}

export async function ok(data?: any): Promise<ServiceResponse> {
  return Promise.resolve({
    statusCode: Status.OK,
    body: data,
  });
}

export function is2xx(statusCode: number): boolean {
  return (statusCode / 100) === 2;
}

export function is4xx(statusCode: number): boolean {
  return (statusCode / 100) === 4;
}

export function is5xx(statusCode: number): boolean {
  return (statusCode / 100) === 5;
}
