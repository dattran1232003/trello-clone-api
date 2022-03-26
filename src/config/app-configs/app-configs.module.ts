import { Module } from '@nestjs/common'
import { AppConfigsService } from './app-configs.service'

@Module({
  providers: [AppConfigsService],
  exports: [AppConfigsService],
})
export class AppConfigsModule {}
