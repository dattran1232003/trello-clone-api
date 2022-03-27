import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'
import { ROLES_IN_BOARD_LIST, ROLE_IN_BOARD } from '../constants'

@MongoSchema({
  modelName: COLLECTION_NAME.USER_IN_BOARD_MODEL,
})
export class UserInBoard extends BaseSchemaNestJS {
  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.USER_MODEL,
    required: true,
  })
  userId: ObjectId

  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.BOARD_MODEL,
    required: true,
  })
  boardId: ObjectId

  @Prop({
    type: String,
    enum: ROLES_IN_BOARD_LIST,
    required: true,
    default: ROLE_IN_BOARD.NORMAL,
  })
  role: ROLE_IN_BOARD
}
export const UserInBoardSchema = SchemaFactory.createForClass(UserInBoard)

UserInBoardSchema.index({
  userId: 1,
  boardId: 1,
})
