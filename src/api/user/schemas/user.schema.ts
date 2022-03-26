import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'

@MongoSchema({
  modelName: COLLECTION_NAME.USER_MODEL,
})
export class User extends BaseSchemaNestJS {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string

  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Prop({
    type: String,
    required: true,
  })
  fullName: string
}
export const UserSchema = SchemaFactory.createForClass(User)
