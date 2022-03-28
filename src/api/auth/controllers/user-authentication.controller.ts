import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  UserAuthenticationResponseDto,
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '../dtos'
import { UserAuthenticationService } from '../services/user-authentication.service'

@Controller('v1/auth/users')
@ApiTags('v1/auth/users')
export class UserAuthenticationController {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService,
  ) {}

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign-up with email',
  })
  @ApiCreatedResponse({
    status: 201,
    type: UserAuthenticationResponseDto,
  })
  async signUp(@Body() body: UserSignUpRequestDto) {
    return this.userAuthenticationService.userSignUpWithEmail(body)
  }

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign-in with email',
  })
  @ApiCreatedResponse({
    status: 201,
    type: UserAuthenticationResponseDto,
  })
  async signIn(@Body() body: UserSignInRequestDto) {
    return this.userAuthenticationService.userSignInWithEmail(body)
  }
}
