import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { BoardCollectionModule } from './collections/board/board-collection.module'
import { UserInBoardCollectionModule } from './collections/user-in-board/user-in-board-collection.module'
import { BoardController } from './controllers/board.controller'
import { BoardService } from './services/board.service'
import { UserInBoardService } from './services/user-in-board.service';

@Module({
  imports: [CommonModule, BoardCollectionModule, UserInBoardCollectionModule],
  controllers: [BoardController],
  providers: [BoardService, UserInBoardService],
  exports: [BoardService],
})
export class BoardModule {}
