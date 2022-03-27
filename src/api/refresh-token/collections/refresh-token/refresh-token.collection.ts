import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { AppConfigService } from 'src/config/app-configs'
import { RefreshToken } from '../../schemas'

@Injectable()
export class RefreshTokenCollection {
  async deleteRefreshTokenByRefreshTokenString(
    refreshTokenString: string,
  ): Promise<void> {
    await this.refreshTokenModel.deleteOne({
      refreshToken: refreshTokenString,
    })
  }
  constructor(
    @InjectModel(COLLECTION_NAME.REFRESH_TOKEN_MODEL)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}
  async createRefreshToken(
    refreshTokenString: string,
    userId: ObjectId,
  ): Promise<RefreshToken> {
    const expiredDate = Date.now() + AppConfigService.shared.refreshTokenExpired
    return this.refreshTokenModel.create({
      userId,
      refreshToken: refreshTokenString,
      expiredAt: expiredDate,
    })
  }
}
