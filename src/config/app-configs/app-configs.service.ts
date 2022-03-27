import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ExtractJwt, StrategyOptions } from 'passport-jwt'
import { ENV_FILE_PATH, NODE_ENV } from 'src/common/constants'
import { EnvConfig } from 'src/common/decorators'
import { AppEnvironmentVariables } from './app-configs.validator'
const ms = require('ms')
const version = require('../../../package.json').version

@Injectable()
export class AppConfigService {
  @EnvConfig(AppEnvironmentVariables, ENV_FILE_PATH)
  envConfig: AppEnvironmentVariables

  get nodeEnv(): NODE_ENV {
    return this.envConfig.NODE_ENV
  }

  get appVersion(): string {
    return version
  }

  get serverPort(): number {
    return this.envConfig.PORT
  }

  get mongoURI(): string {
    return this.envConfig.MONGO_URI
  }

  get apiDocsPath(): string {
    return this.envConfig.API_DOCS_PATH
  }

  get privateKey() {
    return this.envConfig.PRIVATE_KEY
  }

  get publicKey(): string {
    return this.envConfig.PUBLIC_KEY
  }

  get verifyOptions(): jwt.VerifyOptions | any {
    return {
      algorithms: ['HS256'] as jwt.Algorithm[],
    }
  }

  get signOptions(): jwt.SignOptions {
    return {
      expiresIn: AppConfigService.shared.accessTokenExpired,
      algorithm: 'HS256',
    }
  }

  /** shared configs */
  static shared: {
    /** access token expired time in ms */
    accessTokenExpired: number
    /** session expired time in ms */
    sessionExpired: number
    /** refresh token expired time in ms */
    refreshTokenExpired: number
  } = {
    accessTokenExpired: ms('30m'),
    sessionExpired: ms('30m'),
    refreshTokenExpired: ms('30d'),
  }

  get jwtStrategyOpts(): StrategyOptions {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.privateKey,
      jsonWebTokenOptions: this.verifyOptions,
    } as StrategyOptions
  }
}
