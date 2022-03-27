import {
  CommonPageLoadQueryRequestDto,
  CommonPageLoadResponseDto,
} from 'src/common/dtos'
import { BoardResponseDto } from './board-response.dto'

export class GetBoardsPageLoadQueryRequestDto extends CommonPageLoadQueryRequestDto {
  constructor(query: GetBoardsPageLoadQueryRequestDto) {
    super(query)
  }
}

export class GetMyBoardsPageLoadResponseDto extends CommonPageLoadResponseDto(
  BoardResponseDto,
) {}
