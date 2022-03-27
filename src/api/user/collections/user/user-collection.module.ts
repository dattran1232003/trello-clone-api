import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from 'src/common/common.module'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { UserSchema } from '../../schemas'
import { UserCollection } from './user.collection'

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.USER_MODEL,
          schema: UserSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [UserCollection],
  exports: [UserCollection],
})
export class UserCollectionModule {}
