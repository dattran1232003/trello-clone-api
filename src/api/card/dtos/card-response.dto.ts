import { ApiProperty } from '@nestjs/swagger'
import { Card } from '../schemas'

export class CardResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  listId: string

  @ApiProperty()
  boardId: string

  @ApiProperty()
  content: string

  @ApiProperty()
  rank: string

  @ApiProperty({
    required: false,
  })
  description?: string

  constructor(card: Card) {
    if (!card) {
      return
    }
    const { _id, listId, boardId, rank, content, description } = card
    this.id = _id?.toString() || null
    this.boardId = boardId?.toString() || null
    this.listId = listId?.toString() || null
    this.content = content || null
    description && (this.description = description)
    this.rank = rank || null
  }
}
