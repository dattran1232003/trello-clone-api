import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ReqUserProfile } from 'src/api/auth/decorators'
import { IUser } from 'src/api/user/interfaces'
import { TrackingHeaders } from 'src/common/decorators'
import { JwtAuthGuard } from 'src/common/guards'
import { ITrackingHeaders } from 'src/common/interfaces'
import {
  CardResponseDto,
  CreateCardRequestDto,
  DeleteCardParamRequestDto,
  DeleteCardResponseDto,
  UpdateCardParamRequestDto,
  UpdateCardRequestDto,
} from '../dtos'
import { CardService } from '../services'

@Controller('v1/cards')
@ApiTags('v1/cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({
    summary: 'create a card',
  })
  async createcard(
    @ReqUserProfile() user: IUser,
    @Body() body: CreateCardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    return this.cardService.createCard(user, body, trackingHeaders)
  }

  @Put(':cardId')
  @ApiOperation({
    summary: 'update a card',
  })
  @ApiCreatedResponse({
    status: 201,
    type: CardResponseDto,
  })
  async updatecard(
    @ReqUserProfile() user: IUser,
    @Param() param: UpdateCardParamRequestDto,
    @Body() body: UpdateCardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    return this.cardService.updateCard(user, param, body, trackingHeaders)
  }

  @Delete(':cardId')
  @ApiOperation({
    summary: 'delete a card',
  })
  @ApiOkResponse({
    status: 200,
    type: DeleteCardResponseDto,
  })
  async deletecard(
    @ReqUserProfile() user: IUser,
    @Param() param: DeleteCardParamRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<DeleteCardResponseDto> {
    return this.cardService.deleteCard(user, param, trackingHeaders)
  }
}
