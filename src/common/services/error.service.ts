import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ErrorService {
  constructor(private readonly logger: Logger) {}
}
