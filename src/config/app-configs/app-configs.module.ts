import { Module } from '@nestjs/common'
import { AppConfigService } from './app-configs.service'

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
