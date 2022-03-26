import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'
import { AppConfigsService } from 'src/config/app-configs'

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
    default: () => Date.now() + AppConfigsService.shared.refreshTokenExpired,
  })
  expiredAt: Date
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
