import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserSignInRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  usernameOrEmail: string

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  constructor() {}
}
