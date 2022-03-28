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
  GetListsPageLoadQueryRequestDto,
  GetListsPageLoadResponseDto,
  ListResponseDto,
} from 'src/api/list/dtos'
import { IUser } from 'src/api/user/interfaces'
import { DEFAULT_CONSTANT } from 'src/common/constants'
import { TrackingHeaders } from 'src/common/decorators'
import { JwtAuthGuard } from 'src/common/guards'
import { ITrackingHeaders } from 'src/common/interfaces'
import {
  BoardListParamRequestDto,
  MoveListInBoardParamRequestDto,
  MoveListInBoardRequestDto,
} from '../dtos'
import { BoardListService } from '../services'

@Controller('v1/boards')
@ApiTags('v1/boards')
@UseGuards(JwtAuthGuard)
export class BoardListController {
  constructor(private readonly boardListService: BoardListService) {}

  @Get(':boardId/lists')
  @ApiOperation({
    summary: `Get lists in a board, default limit: ${DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_LISTS_PAGE_LOAD}`,
  })
  @ApiOkResponse({
    type: GetListsPageLoadResponseDto,
  })
  async getListsInBoard(
    @ReqUserProfile() user: IUser,
    @Param() param: BoardListParamRequestDto,
    @Query() query: GetListsPageLoadQueryRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<GetListsPageLoadResponseDto> {
    query = new GetListsPageLoadQueryRequestDto(query)
    return this.boardListService.getListsInBoard(
      user,
      param,
      query,
      trackingHeaders,
    )
  }

  @Put(':boardId/lists/:listId')
  @ApiOperation({
    summary: 'move a list in CURRENT board',
  })
  @ApiOkResponse({
    type: ListResponseDto,
  })
  async moveListInABoard(
    @ReqUserProfile() user: IUser,
    @Param() param: MoveListInBoardParamRequestDto,
    @Body() body: MoveListInBoardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    return this.boardListService.moveListInBoard(
      user,
      param,
      body,
      trackingHeaders,
    )
  }
}
