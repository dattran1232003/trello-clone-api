import { ApiProperty } from '@nestjs/swagger'
import { AUTHENTICATION_TYPE } from '../constants'

export class AuthenticationResponseDto {
  @ApiProperty()
  refreshToken: string

  @ApiProperty()
  accessToken: string

  @ApiProperty({
    enum: AUTHENTICATION_TYPE,
  })
  type: AUTHENTICATION_TYPE
}
