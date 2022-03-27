import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { UserCollectionModule } from './collections/user'
import { UserService } from './services/user.service'

@Module({
  imports: [CommonModule, UserCollectionModule],
  providers: [UserService],
  exports: [UserService, UserCollectionModule],
})
export class UserModule {}
