import { Prop, SchemaFactory } from '@nestjs/mongoose'
import * as argon2 from 'argon2'
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

UserSchema.pre('save', async function (next) {
  const user: any = this

  if (!user.isModified('password')) {
    return next()
  }

  try {
    user.password = await argon2.hash(user.password)
    next()
  } catch (e) {
    next(e)
  }
})
