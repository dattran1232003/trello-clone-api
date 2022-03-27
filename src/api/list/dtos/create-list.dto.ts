import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateListRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  boardId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string
}
