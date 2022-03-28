import { DEFAULT_CONSTANT } from 'src/common/constants'
import {
  CommonPageLoadQueryRequestDto,
  CommonPageLoadResponseDto,
} from 'src/common/dtos'
import { ListResponseDto } from './list-response.dto'

export class GetListsPageLoadQueryRequestDto extends CommonPageLoadQueryRequestDto {
  constructor(query: GetListsPageLoadQueryRequestDto) {
    super(query)

    if (!query) {
      return
    }

    this.limit =
      this.limit || DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_LISTS_PAGE_LOAD
  }
}
export class GetListsPageLoadResponseDto extends CommonPageLoadResponseDto(
  ListResponseDto,
) {}
