import { User } from '../schemas'

export class UserDto {
  email: string
  username: string
  fullName: string

  constructor(user: User) {
    if (!user) {
      return
    }
    const { email, fullName, username } = user
    this.email = email || ''
    this.username = username || ''
    this.fullName = fullName || ''
  }
}
