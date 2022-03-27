import { Injectable } from '@nestjs/common'
import { IUser } from 'src/api/user/interfaces'
import { isNotNullAndNotUndefined } from 'src/common/functions'
import { ITrackingHeaders } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { BoardCollection, UserInBoardCollection } from '../collections'
import { ROLE_IN_BOARD } from '../constants'
import {
  BoardResponseDto,
  CreateBoardRequestDto,
  GetBoardsPageLoadQueryRequestDto,
  GetMyBoardsPageLoadResponseDto,
  UpdateBoardParamRequestDto,
  UpdateBoardRequestDto,
} from '../dtos'
import { Board, UserInBoard } from '../schemas'
import { UserInBoardService } from './user-in-board.service'

@Injectable()
export class BoardService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly userInBoardService: UserInBoardService,

    private readonly boardCollection: BoardCollection,
    private readonly userInBoardCollection: UserInBoardCollection,
  ) {}

  async createABoard(
    user: IUser,
    body: CreateBoardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<BoardResponseDto> {
    const { name } = body

    const boardBody = {
      name,
      isClosed: false,
    } as Board
    const board = await this.boardCollection.create(boardBody)

    const userInBoardBody = {
      userId: user._id,
      boardId: board._id,
      role: ROLE_IN_BOARD.ADMIN,
    } as UserInBoard
    await this.userInBoardCollection.create(userInBoardBody)

    return this.getBoardResponse(board)
  }

  async getMyBoards(
    user: IUser,
    query: GetBoardsPageLoadQueryRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<GetMyBoardsPageLoadResponseDto> {
    const { skip, limit } = query

    const [userInBoards, totalItems] = await Promise.all([
      this.userInBoardService.getUserBoardsPageLoad(user._id, skip, limit),
      this.userInBoardService.countUserBoards(user._id),
    ])

    const boardsResponse = await Promise.all(
      userInBoards.map(async item => {
        const board = await this.boardCollection.getBoardById(item.boardId)
        return this.getBoardResponse(board)
      }),
    )

    return {
      items: boardsResponse,
      totalItems,
    } as GetMyBoardsPageLoadResponseDto
  }

  async updateABoard(
    user: IUser,
    param: UpdateBoardParamRequestDto,
    body: UpdateBoardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<BoardResponseDto> {
    const { boardId } = param
    const { name, isClosed } = body

    const updateBody = {} as Board
    const board = await this.boardCollection.getBoardById(boardId)
    const userInBoard =
      await this.userInBoardCollection.getUserInBoardByUserIdAndBoardId(
        user._id,
        board._id,
      )

    if (isNotNullAndNotUndefined(name)) {
      updateBody.name = name
    }

    if (isNotNullAndNotUndefined(isClosed)) {
      updateBody.isClosed = isClosed
    }

    const updatedBoard = await this.boardCollection.updateBoard(
      board._id,
      updateBody,
    )

    return this.getBoardResponse(updatedBoard)
  }

  async getBoardResponse(board: Board): Promise<BoardResponseDto> {
    return new BoardResponseDto(board)
  }
}
