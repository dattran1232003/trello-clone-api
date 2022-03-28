import { DEFAULT_CONSTANT } from 'src/common/constants'
import {
  CommonPageLoadQueryRequestDto,
  CommonPageLoadResponseDto,
} from 'src/common/dtos'
import { CardResponseDto } from './card-response.dto'

export class GetCardsPageLoadQueryRequestDto extends CommonPageLoadQueryRequestDto {
  constructor(query: GetCardsPageLoadQueryRequestDto) {
    super(query)

    if (!query) {
      return
    }

    this.limit =
      this.limit || DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_CARDS_PAGE_LOAD
  }
}
export class GetCardsPageLoadResponseDto extends CommonPageLoadResponseDto(
  CardResponseDto,
) {}
