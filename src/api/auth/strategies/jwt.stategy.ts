import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { IProfile } from 'src/api/user/interfaces'
import { AppConfigService } from 'src/config/app-configs'
import { IValidatePayload } from '../interfaces'
import { AuthenticationValidatorService } from '../services/authentication-validator.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly authenticationValidatorService: AuthenticationValidatorService,
  ) {
    super(appConfigService.jwtStrategyOpts)
  }

  async validate(validatePayload: IValidatePayload): Promise<IProfile> {
    return this.authenticationValidatorService.validate(validatePayload)
  }
}
