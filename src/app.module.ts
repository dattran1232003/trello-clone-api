import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { RefreshTokenModule } from './api/refresh-token/refresh-token.module'
import { UserModule } from './api/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MONGO_CONNECTION } from './common/constants'
import { SessionModule } from './common/session/session.module'
import { AppConfigsModule, AppConfigsService } from './config/app-configs'
import { AuthModule } from './api/auth/auth.module';

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
    UserModule,
    RefreshTokenModule,
    SessionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
