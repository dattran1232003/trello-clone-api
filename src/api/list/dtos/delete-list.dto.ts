import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'
import { List } from '../schemas'

export class DeleteListParamRequestDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  listId: string
}

export class DeleteListResponseDto {
  @ApiProperty()
  id: ObjectId

  constructor(list: List) {
    if (!list) {
      return
    }

    this.id = list._id
  }
}
