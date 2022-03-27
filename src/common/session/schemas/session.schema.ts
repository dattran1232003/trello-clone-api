import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { User } from 'src/api/user/schemas'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'
import { AppConfigService } from 'src/config/app-configs'

@MongoSchema({
  modelName: COLLECTION_NAME.SESSION_MODEL,
})
export class Session extends BaseSchemaNestJS {
  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.USER_MODEL,
  })
  userId: ObjectId

  user?: User

  @Prop({
    type: String,
  })
  accessToken: string

  @Prop({
    type: Boolean,
    default: false,
  })
  restricted: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  isUserDeleted: boolean

  @Prop({
    type: Date,
    default: () => Date.now() + AppConfigService.shared.sessionExpired,
  })
  expiredAt: Date
}

export const SessionSchema = SchemaFactory.createForClass(Session)
