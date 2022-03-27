import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  BoardResponseDto,
  CreateBoardRequestDto,
  GetBoardsPageLoadQueryRequestDto,
  GetMyBoardsPageLoadResponseDto,
  UpdateBoardParamRequestDto,
  UpdateBoardRequestDto,
} from '../dtos'
import { BoardService } from '../services'

@Controller('v1/boards')
@ApiTags('v1/boards')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({
    summary: 'get a list of boards that user has joined',
  })
  @ApiOkResponse({
    status: 200,
  })
  async getMyBoards(
    @ReqUserProfile() user: IUser,
    @Query() query: GetBoardsPageLoadQueryRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<GetMyBoardsPageLoadResponseDto> {
    query = new GetBoardsPageLoadQueryRequestDto(query)
    return this.boardService.getMyBoards(user, query, trackingHeaders)
  }

  @Post()
  @ApiOperation({
    summary: 'create new board',
  })
  @ApiCreatedResponse({
    type: BoardResponseDto,
  })
  async createBoard(
    @ReqUserProfile() user: IUser,
    @Body() body: CreateBoardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<BoardResponseDto> {
    return this.boardService.createABoard(user, body, trackingHeaders)
  }

  @Put(':boardId')
  @ApiOperation({
    summary: 'update a board',
  })
  @ApiOkResponse({
    type: BoardResponseDto,
  })
  async updateBoard(
    @ReqUserProfile() user: IUser,
    @Param() param: UpdateBoardParamRequestDto,
    @Body() body: UpdateBoardRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<BoardResponseDto> {
    return this.boardService.updateABoard(user, param, body, trackingHeaders)
  }
}
