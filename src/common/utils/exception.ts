import * as ERROR from '@/asset/error.json';

interface KudogErrorResponse {
  statusCode: number;
  errorCode: number;
  message: string;
  name: string;
}

export type ExceptionNames = keyof typeof ERROR;

export const EXCEPTIONS: { [key in ExceptionNames]: KudogErrorResponse } =
  ERROR;

export class HttpException extends Error {
  statusCode: number;
  errorCode: number;
  constructor(name: ExceptionNames) {
    super(name);
    this.message = EXCEPTIONS[name].message;
    this.name = name;
    this.statusCode = EXCEPTIONS[name].statusCode;
    this.errorCode = EXCEPTIONS[name].errorCode;
  }
}

export function throwKudogException(name: ExceptionNames): never {
  throw new HttpException(name);
}