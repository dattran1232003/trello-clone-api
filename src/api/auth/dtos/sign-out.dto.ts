import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'
import { Session } from 'src/common/session/schemas'

export class SignOutResponseDto {
  @ApiProperty()
  accessToken?: string

  @ApiProperty({
    type: String,
  })
  userId: ObjectId

  @ApiProperty({
    type: String,
  })
  id: ObjectId

  @ApiProperty()
  restricted: boolean

  constructor(session: Session) {
    if (!session) {
      return
    }
    this.accessToken = session.accessToken
    this.userId = session.userId
    this.id = session._id?.toString() || session.id || null
    this.restricted = session.restricted
  }
}

export class RefreshTokenDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly refreshToken?: string
}
