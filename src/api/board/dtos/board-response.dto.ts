import { ApiProperty } from '@nestjs/swagger'
import { Board } from '../schemas'

export class BoardResponseDto {
  @ApiProperty({})
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  isClosed: boolean

  constructor(board: Board) {
    if (!board) {
      return
    }
    this.id = board._id || board.id || null
    this.name = board.name || null
    this.isClosed = board.isClosed ?? null
  }
}
