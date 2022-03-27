import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly logger: Logger) {}

  onModuleInit() {
    this.logger.warn('INIT MAIN APP')
  }
}
