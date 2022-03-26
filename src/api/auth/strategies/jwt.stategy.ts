export class JwtStrategy {}
//
// import { Injectable } from '@nestjs/common'
// import { PassportStrategy } from '@nestjs/passport'
// import { Strategy } from 'passport-jwt'
// import { IProfile } from 'src/api/user/interfaces'
// import {AppConfigsService} from 'src/config/app-configs'
//
// import { AuthenticationValidatorService } from '../services/authentication-validator.service'
// import { IValidatePayload } from '../interfaces'
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
// 	constructor(
// 		private readonly appConfigService: AppConfigsService,
// 		private readonly authenticationValidatorService: AuthenticationValidatorService,
// 	) {
// 		super(appConfigService.jwtStrategyOpts)
// 	}
//
// 	async validate(validatePayload: IValidatePayload): Promise<IProfile> {
// 		return this.authenticationValidatorService.validate(validatePayload)
// 	}
// }
