import { Injectable } from '@nestjs/common'
import { isDateAnterior } from 'src/common/functions'
import { IProfile } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { IValidatePayload } from '../interfaces'
import { AuthenticationUtilsService } from './authentication-utils.service'

@Injectable()
export class AuthenticationValidatorService {
  constructor(
    private readonly authenticationUtilsService: AuthenticationUtilsService,
    private readonly errorService: ErrorService,
  ) {}

  async validate(validatePayload: IValidatePayload): Promise<IProfile> {
    const session = await this.authenticationUtilsService.validateSession(
      validatePayload?.sessionId,
    )
    if (!session || !session.user || session.restricted) {
      await this.throwErrorInvalidToken()
      return
    }

    if (isDateAnterior(session.expiredAt, new Date())) {
      await this.throwErrorTokenExpired()
      return
    }

    if (session.isUserDeleted) {
      await this.throwErrorUserAlreadyDeleted()
      return
    }

    // When user already logged out
    if (session.restricted) {
      await this.throwErrorRestrictedToken()
      return
    }

    return {
      user: session.user,
      session,
    }
  }

  async throwErrorInvalidToken(): Promise<void> {
    await this.errorService.throwErrorInvalidToken()
  }

  async throwErrorTokenExpired(): Promise<void> {
    await this.errorService.throwErrorTokenExpired()
  }

  private async throwErrorRestrictedToken(): Promise<void> {
    await this.errorService.throwErrorRestrictedToken()
  }

  private async throwErrorUserAlreadyDeleted(): Promise<void> {
    await this.errorService.throwErrorUserAlreadyDeleted()
  }
}
