import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'

export class UpdateCardParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardId: string
}

export class UpdateCardRequestDto {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiProperty()
  listId?: ObjectId

  @IsOptional()
  @IsString()
  @ApiProperty()
  content?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: `If you wish to delete description, pass empty string`,
  })
  description?: string

  constructor() {}
}
