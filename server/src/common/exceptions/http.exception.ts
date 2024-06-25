import { HttpException, HttpStatus } from '@nestjs/common';

export class ExpectationFailedException extends HttpException {
  constructor(msg?: string) {
    super(msg, HttpStatus.EXPECTATION_FAILED);
  }
}
