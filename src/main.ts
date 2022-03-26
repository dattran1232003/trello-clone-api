import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import * as express from 'express'
import { AppModule } from './app.module'
import { AppConfigsService } from './config/app-configs'
import {
  MAIN_LOGGER_CONFIGS,
  MORGAN_MIDDLEWARE_CONFIG,
} from './config/main-logger'

async function bootstrap() {
  const server = express()
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    {
      logger: MAIN_LOGGER_CONFIGS,
    },
  )

  app.use(MORGAN_MIDDLEWARE_CONFIG)

  const appConfigService: AppConfigsService = app.get(AppConfigsService)

  const port = appConfigService.serverPort
  const logger = new Logger(AppModule.name)
  logger.warn(`[INFO] Main Server is listening on port ${port}`)
  await app.listen(port)
}
bootstrap()
