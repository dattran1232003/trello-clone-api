import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { ListCollectionModule } from './collections/list/list-collection.module'
import { ListController } from './controllers/list.controller'
import { ListSharedService } from './services/list-shared.service'
import { ListUtilsService } from './services/list-utils.service'
import { ListService } from './services/list.service'

@Module({
  controllers: [ListController],
  providers: [ListService, ListUtilsService, ListSharedService],
  imports: [CommonModule, ListCollectionModule],
  exports: [
    ListCollectionModule,
    ListService,
    ListUtilsService,
    ListSharedService,
  ],
})
export class ListModule {}
