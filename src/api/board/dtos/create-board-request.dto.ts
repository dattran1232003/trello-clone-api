import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBoardRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string
}
