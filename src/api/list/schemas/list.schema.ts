import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'

@MongoSchema({
  modelName: COLLECTION_NAME.LIST_MODEL,
})
export class List extends BaseSchemaNestJS {
  @Prop({
    type: ObjectId,
    required: true,
    ref: COLLECTION_NAME.BOARD_MODEL,
  })
  boardId: ObjectId

  @Prop({
    type: String,
    required: true,
  })
  title: string

  @Prop({
    type: String,
    required: true,
  })
  rank: string
}
export const ListSchema = SchemaFactory.createForClass(List)

ListSchema.index({
  boardId: 1,
  rank: 1,
})
