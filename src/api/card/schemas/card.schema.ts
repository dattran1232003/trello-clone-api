import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'

@MongoSchema({
  modelName: COLLECTION_NAME.CARD_MODEL,
})
export class Card extends BaseSchemaNestJS {
  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.BOARD_MODEL,
    required: true,
  })
  boardId: ObjectId

  @Prop({
    type: ObjectId,
    ref: COLLECTION_NAME.LIST_MODEL,
    required: true,
  })
  listId: ObjectId

  @Prop({
    type: String,
    required: true,
  })
  content: string

  @Prop({
    type: String,
    required: false,
  })
  description?: string

  @Prop({
    rank: String,
    required: true,
  })
  rank: string
}

export const CardSchema = SchemaFactory.createForClass(Card)

CardSchema.index({
  listId: 1,
  rank: 1,
})
