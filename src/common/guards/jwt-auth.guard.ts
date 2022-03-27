import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ERROR_CODE } from '../constants'
import { isDateAnterior } from '../functions'
import { ErrorService } from '../services'

/**
 * JwtStrategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly errorService: ErrorService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const shouldActive = await super.canActivate(context)
    if (!shouldActive) {
      await this.errorService.throwErrorForbiddenResource()
      return false
    }
    const req = context.switchToHttp().getRequest()
    return true
  }

  handleRequest<IProfile>(
    httpException: HttpException,
    user: IProfile,
    error: Error & { expiredAt?: Date },
  ): IProfile {
    if (error?.expiredAt && isDateAnterior(error.expiredAt, new Date())) {
      throw new HttpException(
        {
          message: error?.message || 'Session expired',
          statusCode: ERROR_CODE.EXPIRED_TOKEN,
        },
        HttpStatus.FORBIDDEN,
      )
    }

    if (error) {
      throw new HttpException(
        {
          message: error?.message || 'Forbidden',
          statusCode: ERROR_CODE.INVALID_TOKEN,
        },
        HttpStatus.FORBIDDEN,
      )
    }
    if (httpException) {
      throw httpException
    }
    return user
  }
}
