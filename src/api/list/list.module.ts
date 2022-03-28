import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import {
  BoardCollectionModule,
  UserInBoardCollectionModule,
} from '../board/collections'
import { ListCollectionModule } from './collections'
import { ListController } from './controllers'
import { ListService, ListSharedService, ListUtilsService } from './services'

@Module({
  imports: [
    CommonModule,
    ListCollectionModule,
    BoardCollectionModule,
    UserInBoardCollectionModule,
  ],
  controllers: [ListController],
  providers: [ListService, ListUtilsService, ListSharedService],
  exports: [ListUtilsService, ListSharedService, ListCollectionModule],
})
export class ListModule {}
