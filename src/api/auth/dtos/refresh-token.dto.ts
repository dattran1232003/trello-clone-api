import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IAccessTokenAndRefreshToken } from '../interfaces/token.interface'

export class RefreshTokenDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly refreshToken?: string
}

export class RefreshTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string
}

export class RefreshTokenResponseDto implements IAccessTokenAndRefreshToken {
  @ApiProperty()
  refreshToken: string

  @ApiProperty()
  accessToken: string

  constructor(data: IAccessTokenAndRefreshToken) {
    if (!data) {
      return
    }
    const { accessToken, refreshToken } = data
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}
