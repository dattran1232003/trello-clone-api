import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqUserProfile } from 'src/api/auth/decorators'
import {
  CardResponseDto,
  GetCardsPageLoadQueryRequestDto,
  GetCardsPageLoadResponseDto,
} from 'src/api/card/dtos'
import { IUser } from 'src/api/user/interfaces'
import { DEFAULT_CONSTANT } from 'src/common/constants'
import { TrackingHeaders } from 'src/common/decorators'
import { JwtAuthGuard } from 'src/common/guards'
import { ITrackingHeaders } from 'src/common/interfaces'
import {
  ListCardParamRequestDto,
  MoveCardParamRequestDto,
  MoveCardRequestDto,
} from '../dtos'
import { ListCardService } from '../services'

@Controller('v1/lists')
@ApiTags('v1/lists')
@UseGuards(JwtAuthGuard)
export class ListCardController {
  constructor(private readonly listCardService: ListCardService) {}

  @Get(':listId/cards')
  @ApiOperation({
    summary: `Get cards in a list, default limit: ${DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_CARDS_PAGE_LOAD}`,
  })
  @ApiOkResponse({
    type: GetCardsPageLoadResponseDto,
  })
  async getCardsInlist(
    @ReqUserProfile() user: IUser,
    @Param() param: ListCardParamRequestDto,
    @Query() query: GetCardsPageLoadQueryRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<GetCardsPageLoadResponseDto> {
    query = new GetCardsPageLoadQueryRequestDto(query)
    return this.listCardService.getCardsInList(
      user,
      param,
      query,
      trackingHeaders,
    )
  }

  @Put(':listId/cards/:cardId')
  @ApiOperation({
    summary: 'move card between lists in CURRENT board',
  })
  @ApiOkResponse({
    type: CardResponseDto,
  })
  async moveCardInAList(
    @ReqUserProfile() user: IUser,
    @Param() param: MoveCardParamRequestDto,
    @Body() body: MoveCardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    return this.listCardService.moveCard(user, param, body, trackingHeaders)
  }
}
