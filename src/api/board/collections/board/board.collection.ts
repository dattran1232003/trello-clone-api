import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { ErrorService } from 'src/common/services'
import { Board } from '../../schemas'

@Injectable()
export class BoardCollection {
  constructor(
    private readonly errorService: ErrorService,

    @InjectModel(COLLECTION_NAME.BOARD_MODEL)
    private readonly boardModel: Model<Board>,
  ) {}

  async create(board: Board): Promise<Board> {
    return this.boardModel.create(board)
  }

  async getBoardById(boardId: string | ObjectId): Promise<Board> {
    if (!ObjectId.isValid(boardId)) {
      await this.errorService.throwErrorBoardNotFound()
    }

    const board = await this.boardModel.findOne({
      _id: new ObjectId(boardId),
      deleted: false,
    })

    if (!board) {
      await this.errorService.throwErrorBoardNotFound()
    }

    return board
  }

  async updateBoard(boardId: ObjectId, updateBody: Board): Promise<Board> {
    return this.boardModel.findOneAndUpdate(
      {
        _id: boardId,
        deleted: false,
      },
      {
        $set: updateBody,
      },
      {
        new: true,
      },
    )
  }
}
