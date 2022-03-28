import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import {
  BoardCollectionModule,
  UserInBoardCollectionModule,
} from '../board/collections'
import { CardModule } from '../card/card.module'
import { ListCollectionModule } from './collections'
import { ListCardController, ListController } from './controllers'
import {
  ListCardService,
  ListService,
  ListSharedService,
  ListUtilsService,
} from './services'

@Module({
  imports: [
    CommonModule,
    CardModule,

    ListCollectionModule,
    BoardCollectionModule,
    UserInBoardCollectionModule,
  ],
  controllers: [ListController, ListCardController],
  providers: [
    ListService,
    ListCardService,
    ListUtilsService,
    ListSharedService,
  ],
  exports: [ListUtilsService, ListSharedService, ListCollectionModule],
})
export class ListModule {}
