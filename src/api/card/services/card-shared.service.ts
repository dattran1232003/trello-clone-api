import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { getCountMongoResult } from 'src/common/functions'
import { ICountMongo } from 'src/common/interfaces'
import { CardCollection } from '../collections'
import { CardResponseDto } from '../dtos'
import { Card } from '../schemas'

@Injectable()
export class CardSharedService {
  constructor(private readonly cardCollection: CardCollection) {}

  async getCardResponse(card: Card): Promise<CardResponseDto> {
    return new CardResponseDto(card)
  }

  async getCardsInListPageLoad(
    listId: ObjectId,
    skip?: number,
    limit?: number,
  ): Promise<Card[]> {
    return this.cardCollection.getCardInAListsPageLoadQuery<Card>(
      listId,
      skip,
      limit,
      false,
    )
  }

  async countTotalCardsInList(listId: ObjectId): Promise<number> {
    const countMongoResult =
      await this.cardCollection.getCardInAListsPageLoadQuery<ICountMongo>(
        listId,
        undefined,
        undefined,
        true,
      )

    return getCountMongoResult(countMongoResult)
  }
}
