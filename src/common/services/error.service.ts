import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ERROR_CODE } from '../constants'

@Injectable()
export class ErrorService {
  constructor(private readonly logger: Logger) {}

  async throwErrorUserExists(
    field: 'Email' | 'Username',
    fieldValue: string,
  ): Promise<never> {
    const message = `${field} "${fieldValue}" is already taken, please choose another one.`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.USER_EXISTS,
      },
      HttpStatus.BAD_REQUEST,
    )
  }

  async throwErrorWrongUsernameOrEmail(): Promise<void> {
    const message = `You entered the wrong username/email, please try again with different one.`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.USER_EXISTS,
      },
      HttpStatus.BAD_REQUEST,
    )
  }

  async throwErrorForbiddenResource(): Promise<never> {
    const message = 'Forbidden resource'
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.FORBIDDEN_RESOURCE,
      },
      HttpStatus.BAD_REQUEST,
    )
  }

  async throwErrorWrongPassword(): Promise<void> {
    const message = `You entered incorrectly password!`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.USER_EXISTS,
      },
      HttpStatus.BAD_REQUEST,
    )
  }

  async throwErrorRestrictedToken(): Promise<never> {
    const message = `Invalid session, please sign in again!`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.RESTRICTED_TOKEN,
      },
      HttpStatus.UNAUTHORIZED,
    )
  }

  async throwErrorTokenExpired(): Promise<never> {
    const message = `Session expired, please sign in again!`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.EXPIRED_TOKEN,
      },
      HttpStatus.UNAUTHORIZED,
    )
  }

  async throwErrorInvalidToken(): Promise<never> {
    const message = `Session expired, please sign in again!`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.EXPIRED_TOKEN,
      },
      HttpStatus.UNAUTHORIZED,
    )
  }

  async throwErrorUserAlreadyDeleted(): Promise<never> {
    const message = `User already deleted`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.USER_NOT_EXISTS,
      },
      HttpStatus.FORBIDDEN,
    )
  }
}
