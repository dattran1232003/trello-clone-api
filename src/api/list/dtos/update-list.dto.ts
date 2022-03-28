import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'

export class UpdateListParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  listId: string
}

export class UpdateListRequestDto {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiProperty()
  boardId?: ObjectId

  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string

  constructor() {}
}
