import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { UserCollection } from 'src/api/user/collections/user'
import { SessionCollection } from 'src/common/session/collections/session'
import { Session } from 'src/common/session/schemas'

@Injectable()
export class AuthenticationUtilsService {
  constructor(
    private readonly sessionCollection: SessionCollection,
    private readonly userCollection: UserCollection,
  ) {}

  async validateSession(sessionId: string): Promise<Session> {
    if (!ObjectId.isValid(sessionId)) {
      return null
    }
    const session = await this.sessionCollection.getSessionById(
      new ObjectId(sessionId),
    )
    if (session && ObjectId.isValid(session?.userId)) {
      session.user = await this.userCollection.getUserById(
        new ObjectId(session?.userId),
      )
    }
    return session
  }
}
