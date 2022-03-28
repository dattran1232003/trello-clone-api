import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from 'src/common/common.module'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { ListSchema } from '../../schemas'
import { ListCollection } from './list.collection'

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.LIST_MODEL,
          schema: ListSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [ListCollection],
  exports: [ListCollection],
})
export class ListCollectionModule {}
