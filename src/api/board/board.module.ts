import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { ListModule } from '../list/list.module'
import {
  BoardCollectionModule,
  UserInBoardCollectionModule,
} from './collections'
import { BoardController, BoardListController } from './controllers'
import { BoardListService, BoardService, UserInBoardService } from './services'

@Module({
  imports: [
    CommonModule,
    ListModule,

    BoardCollectionModule,
    UserInBoardCollectionModule,
  ],
  controllers: [BoardController, BoardListController],
  providers: [BoardService, UserInBoardService, BoardListService],
  exports: [BoardService],
})
export class BoardModule {}
