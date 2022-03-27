import { Module } from '@nestjs/common'
import { AppConfigModule } from 'src/config/app-configs'
import { ErrorService } from './services'

const commonServices = [ErrorService]

@Module({
  imports: [AppConfigModule],
  providers: [...commonServices],
  exports: [...commonServices],
})
export class CommonModule {}
