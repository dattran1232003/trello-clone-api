import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ListCardParamRequestDto } from './list-card.dto'

export class MoveCardParamRequestDto extends ListCardParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardId: string
}

export class MoveCardRequestDto {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiProperty({
    required: false,
    description: `
      - destination card must be in destination list
      - set to null if you wish to move card to bottom of list
    `,
  })
  destinationCardId?: string
}
