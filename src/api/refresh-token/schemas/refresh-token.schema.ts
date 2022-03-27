import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'
import { AppConfigService } from 'src/config/app-configs'

@MongoSchema({
  modelName: COLLECTION_NAME.REFRESH_TOKEN_MODEL,
})
export class RefreshToken extends BaseSchemaNestJS {
  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.USER_MODEL,
    required: true,
  })
  userId: ObjectId

  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string

  @Prop({
    type: Date,
    default: () => Date.now() + AppConfigService.shared.refreshTokenExpired,
  })
  expiredAt: Date
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
