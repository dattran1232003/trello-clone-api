import { Injectable, Logger } from '@nestjs/common'
import { ErrorService } from 'src/common/services'
import { UserCollection } from '../collections/user'

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly errorService: ErrorService,
    private readonly userCollection: UserCollection,
  ) {}

  async checkEmailOrUsernameExists(
    username: string,
    email: string,
  ): Promise<void | never> {
    const existingUser = await this.userCollection.getUserByUsernameOrEmail(
      username,
      email,
    )

    if (existingUser) {
      const field = email === existingUser.email ? 'Email' : 'Username'
      const fieldValue = email === existingUser.email ? email : username

      await this.errorService.throwErrorUserExists(field, fieldValue)
    }
  }
}
