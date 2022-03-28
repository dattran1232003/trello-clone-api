import { Injectable } from '@nestjs/common'
import { LexoRank } from 'lexorank'
import {
  BoardCollection,
  UserInBoardCollection,
} from 'src/api/board/collections'
import { Board } from 'src/api/board/schemas'
import { IUser } from 'src/api/user/interfaces'
import { isNotNullAndNotUndefined } from 'src/common/functions'
import { ITrackingHeaders } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { ListCollection } from '../collections'
import {
  CreateListRequestDto,
  DeleteListParamRequestDto,
  DeleteListResponseDto,
  ListResponseDto,
  UpdateListParamRequestDto,
  UpdateListRequestDto,
} from '../dtos'
import { List } from '../schemas'
import { ListSharedService } from './list-shared.service'
import { ListUtilsService } from './list-utils.service'

@Injectable()
export class ListService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly listUtilsService: ListUtilsService,
    private readonly listSharedService: ListSharedService,

    private readonly listCollection: ListCollection,
    private readonly boardCollection: BoardCollection,
    private readonly userInBoardCollection: UserInBoardCollection,
  ) {}

  async createList(
    user: IUser,
    body: CreateListRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    const { boardId, title } = body

    const board = await this.boardCollection.getBoardById(boardId)
    await this.userInBoardCollection.checkUserInBoard(user._id, board._id)
    const lastListInBoard = await this.listCollection.getLastListInBoard(
      board._id,
    )

    let rank: string
    if (lastListInBoard) {
      rank = LexoRank.parse(lastListInBoard.rank).genNext().toString()
    } else {
      // 1st list in board
      rank = LexoRank.middle().toString()
    }

    const listBody = {
      boardId: board._id,
      title,
      rank,
    } as List
    const list = await this.listCollection.create(listBody)

    return this.listSharedService.getListResponse(list)
  }
  async updateList(
    user: IUser,
    param: UpdateListParamRequestDto,
    body: UpdateListRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    const { listId } = param
    const { boardId, title } = body

    const list = await this.listCollection.getListById(listId)
    await this.userInBoardCollection.checkUserInBoard(user._id, list.boardId)

    const updateListBody = {} as List

    if (isNotNullAndNotUndefined(title)) {
      updateListBody.title = title
    }

    let board: Board
    if (isNotNullAndNotUndefined(boardId)) {
      board = await this.boardCollection.getBoardById(boardId)
      await this.userInBoardCollection.checkUserInBoard(user._id, board._id)
      updateListBody.boardId = board._id
    }

    const updatedList = await this.listCollection.updateListById(
      list._id,
      updateListBody,
    )

    return this.listSharedService.getListResponse(updatedList)
  }

  async deleteList(
    user: IUser,
    param: DeleteListParamRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<DeleteListResponseDto> {
    const { listId } = param
    const list = await this.listCollection.getListById(listId)
    await this.userInBoardCollection.checkUserInBoard(user._id, list.boardId)
    await this.listCollection.deleteListById(listId)
    return new DeleteListResponseDto(list)
  }
}
