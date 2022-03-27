import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class CheckTokenResponseDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isValid: boolean
}
