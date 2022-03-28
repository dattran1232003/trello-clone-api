import { Injectable } from '@nestjs/common'
import { LexoRank } from 'lexorank'
import { ListCollection } from 'src/api/list/collections'
import {
  GetListsPageLoadQueryRequestDto,
  GetListsPageLoadResponseDto,
  ListResponseDto,
} from 'src/api/list/dtos'
import { List } from 'src/api/list/schemas'
import { ListSharedService, ListUtilsService } from 'src/api/list/services'
import { IUser } from 'src/api/user/interfaces'
import { ITrackingHeaders } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { BoardCollection, UserInBoardCollection } from '../collections'
import {
  BoardListParamRequestDto,
  MoveListInBoardParamRequestDto,
  MoveListInBoardRequestDto,
} from '../dtos'

@Injectable()
export class BoardListService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly listUtilsService: ListUtilsService,
    private readonly listSharedService: ListSharedService,

    private readonly listCollection: ListCollection,
    private readonly boardCollection: BoardCollection,
    private readonly userInBoardCollection: UserInBoardCollection,
  ) {}

  async getListsInBoard(
    user: IUser,
    param: BoardListParamRequestDto,
    query: GetListsPageLoadQueryRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<GetListsPageLoadResponseDto> {
    const { skip, limit } = query

    const board = await this.boardCollection.getBoardById(param.boardId)
    await this.userInBoardCollection.checkUserInBoard(user._id, board._id)

    const [lists, totalItems] = await Promise.all([
      this.listSharedService.getListsInBoardPageLoad(board._id, skip, limit),
      this.listSharedService.countTotalListsInBoard(board._id),
    ])

    const listsResponse = await Promise.all(
      lists.map(async list => {
        return this.listSharedService.getListResponse(list)
      }),
    )

    return {
      items: listsResponse,
      totalItems,
    } as GetListsPageLoadResponseDto
  }

  async moveListInBoard(
    user: IUser,
    param: MoveListInBoardParamRequestDto,
    body: MoveListInBoardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    const { listId, boardId } = param
    const { destinationListId } = body

    const [board, currentList, replacedList] = await Promise.all([
      this.boardCollection.getBoardById(boardId),
      this.listCollection.getListById(listId),
      destinationListId && this.listCollection.getListById(destinationListId),
    ])

    if (
      !board._id?.equals(currentList.boardId) ||
      (replacedList && !board._id?.equals(replacedList?.boardId))
    ) {
      await this.errorService.throwErrorListCanOnlyMoveInTheCurrentBoard()
    }

    await Promise.all([
      this.userInBoardCollection.checkUserInBoard(user._id, board._id),
    ])

    let newRank: string
    if (destinationListId) {
      const [prevList, afterList] =
        await this.listCollection.getListNeighboursByBoardIdAndReplacedListId(
          board._id,
          replacedList._id,
        )
      const prevListRank = prevList && LexoRank.parse(prevList.rank)
      const afterListRank = afterList && LexoRank.parse(afterList.rank)

      if (prevList && afterList) {
        newRank = prevListRank.between(afterListRank).toString()
      } else if (!prevList && afterList) {
        // move to very top
        const firstList = await this.listCollection.getFirstListInBoard(
          board._id,
        )
        newRank = firstList
          ? LexoRank.parse(firstList.rank).genPrev().toString()
          : LexoRank.middle().toString()
      } else {
        // gen new rank because board has no list
        newRank = LexoRank.middle().toString()
      }
    } else {
      // user want to move list to bottom by set rank property = empty
      const lastList = await this.listCollection.getLastListInBoard(board._id)
      newRank = lastList
        ? LexoRank.parse(lastList.rank).genNext().toString()
        : LexoRank.middle().toString()
    }

    const updatedList = await this.listCollection.updateListById(
      currentList._id,
      {
        rank: newRank,
      } as List,
    )

    return this.listSharedService.getListResponse(updatedList)
  }
}
