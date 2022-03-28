import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from 'src/common/common.module'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { CardSchema } from '../../schemas'
import { CardCollection } from './card.collection'

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.CARD_MODEL,
          schema: CardSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [CardCollection],
  exports: [CardCollection],
})
export class CardCollectionModule {}
