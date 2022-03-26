import { Module } from '@nestjs/common'
import { SessionCollectionModule } from './collections/session'

@Module({
  imports: [SessionCollectionModule],
  exports: [SessionCollectionModule],
})
export class SessionModule {}
