import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { AuthModule } from './api/auth/auth.module'
import { RefreshTokenModule } from './api/refresh-token/refresh-token.module'
import { UserModule } from './api/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './common/common.module'
import { MONGO_CONNECTION } from './common/constants'
import { HttpExceptionFilter } from './common/filters'
import { GlobalModule } from './common/globals/global.module'
import { SessionModule } from './common/session/session.module'
import { AppConfigModule, AppConfigService } from './config/app-configs'
import { BoardModule } from './api/board/board.module';

@Module({
  imports: [
    GlobalModule,
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        uri: appConfigService.mongoURI,
        useUnifiedTopology: true,
      }),
      inject: [AppConfigService],
      connectionName: MONGO_CONNECTION.MAIN,
    } as MongooseModuleAsyncOptions),
    UserModule,
    RefreshTokenModule,
    SessionModule,
    AuthModule,
    CommonModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
