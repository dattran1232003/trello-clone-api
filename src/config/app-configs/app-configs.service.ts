import { Injectable } from '@nestjs/common'
import { ENV_FILE_PATH, NODE_ENV } from 'src/common/constants'
import { EnvConfig } from 'src/common/decorators'
import { AppEnvironmentVariables } from './app-configs.validator'

@Injectable()
export class AppConfigsService {
  @EnvConfig(AppEnvironmentVariables, ENV_FILE_PATH)
  envConfig: AppEnvironmentVariables

  get nodeEnv(): NODE_ENV {
    return this.envConfig.NODE_ENV
  }

  get serverPort(): number {
    return this.envConfig.PORT
  }

  get mongoURI(): string {
    return this.envConfig.MONGO_URI
  }
}
