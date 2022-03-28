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
  CreateListRequestDto,
  DeleteListParamRequestDto,
  DeleteListResponseDto,
  ListResponseDto,
  UpdateListParamRequestDto,
  UpdateListRequestDto,
} from '../dtos'
import { ListService } from '../services'

@Controller('v1/lists')
@ApiTags('v1/lists')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiOperation({
    summary: 'create a list',
  })
  async createList(
    @ReqUserProfile() user: IUser,
    @Body() body: CreateListRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    return this.listService.createList(user, body, trackingHeaders)
  }

  @Put(':listId')
  @ApiOperation({
    summary: 'update a list',
  })
  @ApiCreatedResponse({
    status: 201,
    type: ListResponseDto,
  })
  async updateList(
    @ReqUserProfile() user: IUser,
    @Param() param: UpdateListParamRequestDto,
    @Body() body: UpdateListRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<ListResponseDto> {
    return this.listService.updateList(user, param, body, trackingHeaders)
  }

  @Delete(':listId')
  @ApiOperation({
    summary: 'delete a list',
  })
  @ApiOkResponse({
    status: 200,
    type: DeleteListResponseDto,
  })
  async deleteList(
    @ReqUserProfile() user: IUser,
    @Param() param: DeleteListParamRequestDto,
    @TrackingHeaders() trackingHeaders: ITrackingHeaders,
  ): Promise<DeleteListResponseDto> {
    return this.listService.deleteList(user, param, trackingHeaders)
  }
}
