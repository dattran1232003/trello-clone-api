import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from 'src/common/common.module'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { BoardSchema } from '../../schemas'
import { BoardCollection } from './board.collection'

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.BOARD_MODEL,
          schema: BoardSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [BoardCollection],
  exports: [BoardCollection],
})
export class BoardCollectionModule {}
