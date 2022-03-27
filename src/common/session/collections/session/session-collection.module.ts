import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { COLLECTION_NAME, MONGO_CONNECTION } from 'src/common/constants'
import { SessionSchema } from '../../schemas'
import { SessionCollection } from './session.collection'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: COLLECTION_NAME.SESSION_MODEL,
          schema: SessionSchema,
        },
      ],
      MONGO_CONNECTION.MAIN,
    ),
  ],
  providers: [SessionCollection],
  exports: [SessionCollection],
})
export class SessionCollectionModule {}
