import { Module } from '@nestjs/common'
import { SessionCollectionModule } from './collections/session'
import { SessionService } from './services/session.service'

@Module({
  imports: [SessionCollectionModule],
  providers: [SessionService],
  exports: [SessionCollectionModule, SessionService],
})
export class SessionModule {}
