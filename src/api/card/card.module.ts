import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { UserInBoardCollectionModule } from '../board/collections'
import { ListCollectionModule } from '../list/collections'
import { CardCollectionModule } from './collections'
import { CardController } from './controllers'
import { CardService, CardSharedService, CardUtilsService } from './services'

@Module({
  providers: [CardService, CardUtilsService, CardSharedService],
  controllers: [CardController],
  imports: [
    CommonModule,

    CardCollectionModule,
    ListCollectionModule,
    UserInBoardCollectionModule,
  ],
  exports: [CardCollectionModule, CardUtilsService, CardSharedService],
})
export class CardModule {}
