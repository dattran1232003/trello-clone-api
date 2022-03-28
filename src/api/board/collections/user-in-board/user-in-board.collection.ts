import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { ICountMongo } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { UserInBoard } from '../../schemas'

@Injectable()
export class UserInBoardCollection {
  constructor(
    private readonly errorService: ErrorService,

    @InjectModel(COLLECTION_NAME.USER_IN_BOARD_MODEL)
    private readonly userInBoardModel: Model<UserInBoard>,
  ) {}

  async create(userInBoard: UserInBoard): Promise<UserInBoard> {
    return this.userInBoardModel.create(userInBoard)
  }

  async checkUserInBoard(
    userId: ObjectId,
    boardId: ObjectId,
  ): Promise<UserInBoard | never> {
    const userInBoard = await this.userInBoardModel.findOne({
      userId,
      boardId,
      deleted: false,
    })

    if (!userInBoard) {
      await this.errorService.throwErrorUserCannotAccessBoard()
    }

    return userInBoard
  }

  async getUserBoardsPageLoadQuery<T extends ICountMongo | UserInBoard>(
    userId: ObjectId,
    skip = 0,
    limit = 10,
    isCount = false,
  ): Promise<T[]> {
    return this.userInBoardModel.aggregate<T>([
      {
        $match: {
          userId,
          deleted: false,
        },
      },
      ...(isCount
        ? [
            {
              $count: 'count',
            },
          ]
        : [
            {
              $sort: {
                createdAt: -1 as -1,
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ]),
    ])
  }

  async getUserInBoardByUserIdAndBoardId(
    userId: ObjectId,
    boardId: ObjectId,
    nullable = false,
  ): Promise<UserInBoard> {
    const userInBoard = await this.userInBoardModel.findOne({
      userId,
      boardId,
      deleted: false,
    })

    if (!nullable && !userInBoard) {
      await this.errorService.throwErrorUserCannotAccessBoard()
    }

    return userInBoard
  }
}
