import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCardRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  listId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  description?: string
}
