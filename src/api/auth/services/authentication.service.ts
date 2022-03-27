import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ObjectId } from 'mongodb'
import { RefreshTokenCollection } from 'src/api/refresh-token/collections/refresh-token'
import { UserDto } from 'src/api/user/dtos'
import { User } from 'src/api/user/schemas'
import { SessionCollection } from 'src/common/session/collections/session'
import { SessionService } from 'src/common/session/services'
import { AppConfigService } from 'src/config/app-configs'
import {
  RefreshTokenDto,
  SignOutResponseDto,
  UserAuthenticationResponseDto,
} from '../dtos'
import { IAccessTokenAndRefreshToken, IJWTPayload } from '../interfaces'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,

    private readonly sessionCollection: SessionCollection,
    private readonly refreshTokenCollection: RefreshTokenCollection,
  ) {}

  async signIn(
    user: User,
    tokenDuration?: number,
  ): Promise<UserAuthenticationResponseDto> {
    const { accessToken, refreshToken } = await this.createTokenAndRefreshToken(
      user._id,
      tokenDuration,
    )

    return {
      refreshToken,
      accessToken,
      user: new UserDto(user),
    } as UserAuthenticationResponseDto
  }
  async createTokenAndRefreshToken(
    userId: ObjectId,
    tokenDuration: number,
  ): Promise<IAccessTokenAndRefreshToken> {
    const session = await this.sessionService.createSessionForUser(
      userId,
      tokenDuration,
    )

    const accessTokenString = this._generateToken(session?._id, false)
    const refreshTokenString = this._generateToken(session?._id, true)

    this.refreshTokenCollection
      .createRefreshToken(refreshTokenString, userId)
      .then()

    return {
      accessToken: accessTokenString,
      refreshToken: refreshTokenString,
    } as IAccessTokenAndRefreshToken
  }

  private _generateToken(
    sessionId: ObjectId,
    isRefreshToken: boolean = false,
  ): string {
    return this.jwtService.sign(
      {
        sessionId: sessionId?.toString() || '',
      } as IJWTPayload,
      {
        expiresIn: isRefreshToken
          ? AppConfigService.shared.refreshTokenExpired
          : AppConfigService.shared.accessTokenExpired,
      },
    )
  }

  async signOut(
    sessionId: ObjectId,
    user: User,
    body: RefreshTokenDto,
  ): Promise<SignOutResponseDto> {
    const { refreshToken: refreshTokenString } = body
    if (refreshTokenString) {
      await this.refreshTokenCollection.deleteRefreshTokenByRefreshTokenString(
        refreshTokenString,
      )
    }

    const session = await this.sessionCollection.invalidateSessionById(
      sessionId,
    )

    return new SignOutResponseDto(session)
  }
}
