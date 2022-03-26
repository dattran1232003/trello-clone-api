import { Module } from '@nestjs/common'
import { AppConfigsModule } from 'src/config/app-configs'
import { ErrorService } from './services'

const commonServices = [ErrorService]

@Module({
  imports: [AppConfigsModule],
  providers: [...commonServices],
  exports: [...commonServices],
})
export class CommonModule {}
