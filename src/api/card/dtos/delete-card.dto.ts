import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'
import { Card } from '../schemas'

export class DeleteCardParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardId: string
}

export class DeleteCardResponseDto {
  @ApiProperty()
  id: ObjectId

  constructor(card: Card) {
    if (!card) {
      return
    }

    this.id = card._id
  }
}
