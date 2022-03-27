import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CommonModule } from 'src/common/common.module'
import { SessionModule } from 'src/common/session/session.module'
import { AppConfigModule, AppConfigService } from 'src/config/app-configs'
import { RefreshTokenCollectionModule } from '../refresh-token/collections/refresh-token'
import { UserModule } from '../user/user.module'
import { AuthenticationController } from './controllers/authentication.controller'
import { UserAuthenticationController } from './controllers/user-authentication.controller'
import {
  AuthenticationService,
  AuthenticationUtilsService,
  AuthenticationValidatorService,
  UserAuthenticationService,
} from './services'
import { JwtStrategy } from './strategies'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        privateKey: appConfigService.privateKey,
        publicKey: appConfigService.publicKey,
        signOptions: appConfigService.signOptions,
        verifyOptions: appConfigService.verifyOptions,
      }),
      inject: [AppConfigService],
    }),
    CommonModule,
    AppConfigModule,

    UserModule,
    SessionModule,

    RefreshTokenCollectionModule,
  ],
  controllers: [UserAuthenticationController, AuthenticationController],
  providers: [
    JwtStrategy,

    AuthenticationService,
    UserAuthenticationService,
    AuthenticationValidatorService,
    AuthenticationUtilsService,
  ],
  exports: [
    AuthenticationService,
    UserAuthenticationService,
    AuthenticationValidatorService,
    AuthenticationUtilsService,
  ],
})
export class AuthModule {}
