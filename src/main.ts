import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'
import { AppModule } from './app.module'
import { AllExceptionFilter, HttpExceptionFilter } from './common/filters'
import { AppConfigService } from './config/app-configs'
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

  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(
    //
    new AllExceptionFilter(),
    new HttpExceptionFilter(),
  )

  const appConfigService: AppConfigService = app.get(AppConfigService)
  const { serverPort: port, appVersion } = appConfigService

  const options = new DocumentBuilder()
    .setTitle('Trello Clone API')
    .addBearerAuth()
    .setDescription(
      `
      The Trello Clone APIs documentation
    `,
    )
    .setVersion(appVersion)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(appConfigService.apiDocsPath, app, document)

  app.use(MORGAN_MIDDLEWARE_CONFIG)

  const logger = new Logger(AppModule.name)
  logger.warn(`[INFO] Main Server v${appVersion} is listening on port ${port}`)
  await app.listen(port)
}
bootstrap()
