import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { UserCollection } from 'src/api/user/collections/user'
import { User } from 'src/api/user/schemas'
import { UserService } from 'src/api/user/services/user.service'
import { ErrorService } from 'src/common/services'
import {
  UserAuthenticationResponseDto,
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '../dtos'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class UserAuthenticationService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,

    private readonly userCollection: UserCollection,
  ) {}

  async userSignUpWithEmail(
    body: UserSignUpRequestDto,
  ): Promise<UserAuthenticationResponseDto> {
    const { username, email, fullName } = body
    let { password } = body

    await this.userService.checkEmailOrUsernameExists(username, email)

    const userInfo = {
      username,
      email,
      password,
      fullName,
    } as User

    const newUser = await this.userCollection.create(userInfo)

    const signInResponse = await this.authenticationService.signIn(newUser)
    signInResponse.user = newUser

    return signInResponse
  }

  async userSignInWithEmail(
    body: UserSignInRequestDto,
  ): Promise<UserAuthenticationResponseDto> {
    const { usernameOrEmail, password } = body

    const user = await this.userCollection.getUserByUsernameOrEmail(
      usernameOrEmail,
      usernameOrEmail,
    )

    if (!user) {
      await this.errorService.throwErrorWrongUsernameOrEmail()
    }

    const isPasswordMatch = await argon2.verify(user.password, password)

    if (!isPasswordMatch) {
      await this.errorService.throwErrorWrongPassword()
    }

    const signInResponse = await this.authenticationService.signIn(user)
    return signInResponse
  }
}
