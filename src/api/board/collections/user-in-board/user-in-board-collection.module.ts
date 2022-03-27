import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from 'src/common/common.module'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { UserInBoardSchema } from '../../schemas'
import { UserInBoardCollection } from './user-in-board.collection'

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.USER_IN_BOARD_MODEL,
          schema: UserInBoardSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [UserInBoardCollection],
  exports: [UserInBoardCollection],
})
export class UserInBoardCollectionModule {}
