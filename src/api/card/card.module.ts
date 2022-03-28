import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { CardCollectionModule } from './collections'
import { CardService, CardSharedService, CardUtilsService } from './services'

@Module({
  providers: [CardService, CardUtilsService, CardSharedService],
  imports: [CommonModule, CardCollectionModule],
  exports: [CardCollectionModule, CardUtilsService, CardSharedService],
})
export class CardModule {}
