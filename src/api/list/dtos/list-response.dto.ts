import { ApiProperty } from '@nestjs/swagger'
import { List } from '../schemas'

export class ListResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  boardId: string

  @ApiProperty()
  title: string

  @ApiProperty()
  rank: string

  constructor(list: List) {
    if (!list) {
      return
    }
    const { _id, id, boardId, title, rank } = list
    this.id = _id || id || null
    this.boardId = boardId?.toString() || null
    this.title = title || null
    this.rank = rank || null
  }
}
