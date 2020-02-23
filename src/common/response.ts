export enum ErrorCode {
  EMPTY_BODY = 'EMPTY_BODY',
  MISSING_MESSAGE = 'MISSING_MESSAGE',
  FAILED_TO_SEND_MESSAGE = 'FAILED_TO_SEND_MESSAGE',
  FAILED_TO_PUT_DATA = 'FAILED_TO_PUT_DATA',
  FAILED_TO_GET_DATA = 'FAILED_TO_GET_DATA',
  FAILED = 'FAILED'
}

export enum Status {
  Success = 'success',
  Failure = 'failure'
}

export interface ServiceResponse {
  status: Status;
  errorCode?: ErrorCode;
  data?: any;
}

export async function newResponse(
  status: Status, errorCode: ErrorCode, data?: any,
): Promise<ServiceResponse> {
  return Promise.resolve({ status, errorCode, data });
}

export async function failure(errorCode: ErrorCode, data?: any): Promise<ServiceResponse> {
  return Promise.resolve({ status: Status.Failure, errorCode, data });
}

export async function success(data?: any): Promise<ServiceResponse> {
  return Promise.resolve({ status: Status.Success, data });
}
