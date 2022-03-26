import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { UserSchema } from '../../schemas'
import { UserCollection } from './user.collection'

@Module({
  imports: [
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
