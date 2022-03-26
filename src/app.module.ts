import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MONGO_CONNECTION } from './common/constants'
import { AppConfigsModule, AppConfigsService } from './config/app-configs'

@Module({
  imports: [
    AppConfigsModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigsModule],
      useFactory: async (appConfigService: AppConfigsService) => ({
        uri: appConfigService.mongoURI,
        useUnifiedTopology: true,
      }),
      inject: [AppConfigsService],
      connectionName: MONGO_CONNECTION.MAIN,
    } as MongooseModuleAsyncOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
