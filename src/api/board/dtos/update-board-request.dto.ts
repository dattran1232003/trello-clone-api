import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateBoardParamRequestDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  boardId: string
}

export class UpdateBoardRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isClosed: boolean
}
