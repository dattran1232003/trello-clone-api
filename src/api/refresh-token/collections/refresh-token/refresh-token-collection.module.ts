import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { RefreshTokenSchema } from '../../schemas'
import { RefreshTokenCollection } from './refresh-token.collection'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.REFRESH_TOKEN_MODEL,
          schema: RefreshTokenSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [RefreshTokenCollection],
  exports: [RefreshTokenCollection],
})
export class RefreshTokenCollectionModule {}
