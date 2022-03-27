import { ApiProperty } from '@nestjs/swagger'
import { User } from '../schemas'

export class UserDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  email: string

  @ApiProperty()
  username: string

  @ApiProperty()
  fullName: string

  constructor(user: User) {
    if (!user) {
      return
    }
    const { _id, email, fullName, username } = user
    this.id = _id?.toString() || user.id || null
    this.email = email || ''
    this.username = username || ''
    this.fullName = fullName || ''
  }
}
