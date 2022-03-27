import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateListParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  listId: string
}
export class UpdateListRequestDto {}

export class UpdateListRankRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  prevRank?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  nextRank?: string
}
