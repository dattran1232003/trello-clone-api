import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'
import { isNotNullAndNotUndefined } from '../functions'

export class CommonPageLoadQueryRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    required: false,
    default: 10,
  })
  limit?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty({
    required: false,
    default: 0,
  })
  skip?: number

  constructor(query: CommonPageLoadQueryRequestDto) {
    if (!query) {
      return
    }
    const { limit, skip } = query
    if (isNotNullAndNotUndefined(limit)) {
      this.limit = Number(limit)
    } else {
      this.limit = 10
    }
    if (isNotNullAndNotUndefined(skip)) {
      this.skip = Number(skip)
    } else {
      this.skip = 0
    }
  }
}

export interface ICommonPageLoadResponse<T> {
  new (...p: any[]): {
    items: T[]
    totalItems: number
  }
}

export function CommonPageLoadResponseDto<T>(itemType: {
  new (...p: any[]): T
}): ICommonPageLoadResponse<T> {
  class CommonPageLoadResponseClass {
    @ApiProperty({ type: [itemType] })
    items: T[]

    @ApiProperty()
    totalItems: number
  }

  return CommonPageLoadResponseClass
}
