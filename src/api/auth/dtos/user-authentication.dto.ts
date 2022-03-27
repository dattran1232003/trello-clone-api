import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from 'src/api/user/dtos'
import { AuthenticationResponseDto } from './authentication.dto'

export class UserAuthenticationResponseDto extends AuthenticationResponseDto {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto
}
