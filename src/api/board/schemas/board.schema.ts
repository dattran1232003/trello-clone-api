import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { MongoSchema } from 'src/common/decorators'
import { BaseSchemaNestJS } from 'src/common/schemas'

@MongoSchema({
  modelName: COLLECTION_NAME.BOARD_MODEL,
})
export class Board extends BaseSchemaNestJS {
  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isClosed: boolean
}
export const BoardSchema = SchemaFactory.createForClass(Board)
