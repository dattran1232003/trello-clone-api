import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { Session } from '../../schemas'

@Injectable()
export class SessionCollection {
  async getSessionById(sessionId: ObjectId): Promise<Session> {
    return this.sessionModel.findOne({
      _id: sessionId,
      restricted: false,
    })
  }
  constructor(
    @InjectModel(COLLECTION_NAME.SESSION_MODEL)
    private readonly sessionModel: Model<Session>,
  ) {}

  async create(session: Session): Promise<Session> {
    return this.sessionModel.create(session)
  }

  async updateAccessToken(
    _id: ObjectId,
    accessTokenString: string,
  ): Promise<void> {
    await this.sessionModel.updateOne(
      {
        _id,
      },
      {
        $set: {
          accessTokenString,
        },
      },
    )
  }

  async invalidateSessionById(sessionId: ObjectId): Promise<Session> {
    return this.sessionModel.findOneAndUpdate(
      {
        _id: sessionId,
      },
      {
        $set: {
          restricted: true,
        },
      },
      {
        new: true,
      },
    )
  }
}
