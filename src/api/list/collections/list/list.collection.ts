import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME, DEFAULT_CONSTANT } from 'src/common/constants'
import { ICountMongo } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { List } from '../../schemas'

@Injectable()
export class ListCollection {
  constructor(
    @InjectModel(COLLECTION_NAME.LIST_MODEL)
    private readonly listModel: Model<List>,
    private readonly errorService: ErrorService,
  ) {}

  async create(list: List): Promise<List> {
    return this.listModel.create(list)
  }

  async getListById(
    listId: string | ObjectId,
    nullable = false,
  ): Promise<List> {
    if (!ObjectId.isValid(listId)) {
      await this.errorService.throwErrorListNotFound(listId)
    }

    const list = await this.listModel.findOne({
      _id: new ObjectId(listId),
      deleted: false,
    })

    if (!nullable && !list) {
      await this.errorService.throwErrorListNotFound(listId)
    }

    return list
  }

  async getLastListInBoard(boardId: ObjectId): Promise<List | null> {
    return this.listModel
      .findOne({
        boardId,
        deleted: false,
      })
      .sort({
        rank: -1,
      })
  }

  async getFirstListInBoard(boardId: ObjectId): Promise<List | null> {
    return this.listModel
      .findOne({
        boardId,
        deleted: false,
      })
      .sort({
        rank: 1,
      })
  }

  async getListNeighboursByBoardIdAndReplacedListId(
    boardId: ObjectId,
    replacedListId: ObjectId,
  ): Promise<[List, List]> {
    const afterList = await this.listModel
      .findOne({
        _id: replacedListId,
        boardId,
        deleted: false,
      })
      .sort({
        rank: 1,
      })

    if (!afterList) {
      await this.errorService.throwErrorRankNotFoundInBoard()
    }

    const prevList = await this.listModel
      .findOne({
        boardId,
        deleted: false,
        rank: {
          $lt: afterList.rank,
        },
      })
      .sort({
        rank: -1,
      })

    return [prevList, afterList]
  }

  async getListInABoardsPageLoadQuery<T extends ICountMongo | List>(
    boardId: ObjectId,
    skip = 0,
    limit = DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_LISTS_PAGE_LOAD,
    isCount = false,
  ): Promise<T[]> {
    return this.listModel.aggregate<T>([
      {
        $match: {
          boardId,
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
                rank: 1 as 1,
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

  async updateListById(listId: ObjectId, updateListBody: List): Promise<List> {
    return this.listModel.findOneAndUpdate(
      {
        _id: listId,
        deleted: false,
      },
      {
        $set: updateListBody,
      },
      {
        new: true,
      },
    )
  }

  async updateListRank(listId: ObjectId, rank: string): Promise<void> {
    await this.listModel.updateOne(
      {
        _id: listId,
      },
      {
        $set: {
          rank,
        },
      },
    )
  }

  async updateListBoardId(listId: ObjectId, boardId: ObjectId): Promise<void> {
    await this.listModel.updateOne(
      {
        _id: listId,
      },
      {
        $set: {
          boardId,
        },
      },
    )
  }

  async deleteListById(listId: string): Promise<void> {
    await this.listModel.updateOne({
      _id: listId,
      deleted: true,
    })
  }
}
