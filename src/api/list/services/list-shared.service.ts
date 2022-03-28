import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { getCountMongoResult } from 'src/common/functions'
import { ICountMongo } from 'src/common/interfaces'
import { ListCollection } from '../collections'
import { ListResponseDto } from '../dtos'
import { List } from '../schemas'

@Injectable()
export class ListSharedService {
  constructor(private readonly listCollection: ListCollection) {}

  async getListResponse(list: List): Promise<ListResponseDto> {
    return new ListResponseDto(list)
  }

  async getListsInBoardPageLoad(
    boardId: ObjectId,
    skip?: number,
    limit?: number,
  ): Promise<List[]> {
    return this.listCollection.getListInABoardsPageLoadQuery<List>(
      boardId,
      skip,
      limit,
      false,
    )
  }

  async countTotalListsInBoard(boardId: ObjectId): Promise<number> {
    const countMongoResult =
      await this.listCollection.getListInABoardsPageLoadQuery<ICountMongo>(
        boardId,
        undefined,
        undefined,
        true,
      )

    return getCountMongoResult(countMongoResult)
  }
}
