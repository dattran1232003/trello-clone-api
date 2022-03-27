import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { AppConfigService } from 'src/config/app-configs'
import { SessionCollection } from '../collections/session'
import { Session } from '../schemas'

@Injectable()
export class SessionService {
  constructor(private readonly sessionCollection: SessionCollection) {}
  async createSessionForUser(
    userId: ObjectId,
    tokenDuration: number,
  ): Promise<Session> {
    tokenDuration = tokenDuration ?? AppConfigService.shared.sessionExpired

    const expiredDate = new Date(Date.now() + tokenDuration)
    const session = {
      userId,
      expiredAt: expiredDate,
    } as Session

    return this.sessionCollection.create(session)
  }
}
