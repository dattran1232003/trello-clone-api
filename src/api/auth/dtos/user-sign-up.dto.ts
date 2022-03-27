import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserSignUpRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string

  constructor() {}
}
