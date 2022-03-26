import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { AuthModule } from './api/auth/auth.module'
import { RefreshTokenModule } from './api/refresh-token/refresh-token.module'
import { UserModule } from './api/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './common/common.module'
import { MONGO_CONNECTION } from './common/constants'
import { GlobalModule } from './common/globals/global.module'
import { SessionModule } from './common/session/session.module'
import { AppConfigsModule, AppConfigsService } from './config/app-configs'

@Module({
  imports: [
    GlobalModule,
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
    UserModule,
    RefreshTokenModule,
    SessionModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
