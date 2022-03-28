import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ObjectId } from 'mongodb'
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
    const message = `Session expired`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.EXPIRED_TOKEN,
      },
      HttpStatus.UNAUTHORIZED,
    )
  }

  async throwErrorInvalidToken(): Promise<never> {
    const message = `Invalid session, please sign in again!`
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

  async throwErrorBoardNotFound(): Promise<never> {
    const message = `Board not found`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.BOARD_NOT_FOUND,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
  async throwErrorUserCannotAccessBoard(): Promise<never> {
    const message = `You cannot access this board because you have no permission or board is deleted`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.FORBIDDEN_RESOURCE,
      },
      HttpStatus.FORBIDDEN,
    )
  }

  async throwErrorListNotFound(listId: string | ObjectId): Promise<never> {
    const message = `List ${listId} not found`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.LIST_NOT_FOUND,
      },
      HttpStatus.BAD_REQUEST,
    )
  }

  async throwErrorListCanOnlyMoveInTheCurrentBoard(): Promise<never> {
    const message = `List can only move within the current board`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.LIST_CAN_ONLY_MOVE_WITHIN_CURRENT_BOARD,
      },
      HttpStatus.FORBIDDEN,
    )
  }

  async throwErrorRankNotFoundInBoard(): Promise<never> {
    const message = `Cannot move list to this position, please reload page and try again`
    throw new HttpException(
      {
        message,
        statusCode: ERROR_CODE.RANK_NOT_FOUND_IN_BOARD,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
