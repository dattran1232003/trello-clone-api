import { Module } from '@nestjs/common'
import { UserCollectionModule } from './collections/user'

@Module({
  imports: [UserCollectionModule],
  exports: [UserCollectionModule],
})
export class UserModule {}
