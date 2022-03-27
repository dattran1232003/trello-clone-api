import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { User } from 'src/api/user/schemas'
import { TrackingHeaders } from 'src/common/decorators'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { IProfile, ITrackingHeaders } from 'src/common/interfaces'
import { ReqProfile, ReqUserProfile } from '../decorators'
import { RefreshTokenDto, SignOutResponseDto } from '../dtos'
import { AuthenticationService } from '../services'

@Controller('v1/auth')
@ApiTags('v1/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-out')
  @ApiCreatedResponse({
    type: SignOutResponseDto,
    description: 'Sign out successfully.',
  })
  @UseGuards(JwtAuthGuard)
  async signOut(
    @ReqProfile() profile: IProfile,
    @ReqUserProfile() user: User,
    @Body() body: RefreshTokenDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<SignOutResponseDto> {
    return this.authenticationService.signOut(profile?.session?._id, user, body)
  }
}
