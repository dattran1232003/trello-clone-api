import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { getCountMongoResult } from 'src/common/functions'
import { ICountMongo } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { BoardCollection, UserInBoardCollection } from '../collections'
import { UserInBoard } from '../schemas'

@Injectable()
export class UserInBoardService {
  constructor(
    private readonly errorService: ErrorService,

    private readonly boardCollection: BoardCollection,
    private readonly userInBoardCollection: UserInBoardCollection,
  ) {}

  async getUserBoardsPageLoad(
    userId: ObjectId,
    skip: number,
    limit: number,
  ): Promise<UserInBoard[]> {
    return this.userInBoardCollection.getUserBoardsPageLoadQuery<UserInBoard>(
      userId,
      skip,
      limit,
      false,
    )
  }

  async countUserBoards(userId: ObjectId): Promise<number> {
    const countMongoRes =
      await this.userInBoardCollection.getUserBoardsPageLoadQuery<ICountMongo>(
        userId,
        undefined,
        undefined,
        true,
      )

    return getCountMongoResult(countMongoRes)
  }
}
