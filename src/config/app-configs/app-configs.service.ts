import { Injectable } from '@nestjs/common'
import * as ms from 'ms'
import { ENV_FILE_PATH, NODE_ENV } from 'src/common/constants'
import { EnvConfig } from 'src/common/decorators'
import { AppEnvironmentVariables } from './app-configs.validator'
const version = require('../../../package.json').version

@Injectable()
export class AppConfigsService {
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

  /** shared configs */
  static shared: {
    sessionExpired: number
    refreshTokenExpired: number
  } = {
    /** session expired after ms */
    sessionExpired: ms('30m'),
    /** refresh token expired after ms */
    refreshTokenExpired: ms('30d'),
  }
}
