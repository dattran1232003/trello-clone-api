import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BoardListParamRequestDto } from './board-list.dto'

export class MoveListInBoardParamRequestDto extends BoardListParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  listId: string
}

export class MoveListInBoardRequestDto {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiProperty()
  replacedListId?: string
}
