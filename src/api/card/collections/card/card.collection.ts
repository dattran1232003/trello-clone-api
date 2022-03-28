import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME, DEFAULT_CONSTANT } from 'src/common/constants'
import { ICountMongo } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { Card } from '../../schemas'

@Injectable()
export class CardCollection {
  constructor(
    @InjectModel(COLLECTION_NAME.CARD_MODEL)
    private readonly cardModel: Model<Card>,
    private readonly errorService: ErrorService,
  ) {}

  async create(card: Card): Promise<Card> {
    return this.cardModel.create(card)
  }

  async getCardById(
    cardId: string | ObjectId,
    nullable = false,
  ): Promise<Card> {
    if (!ObjectId.isValid(cardId)) {
      await this.errorService.throwErrorCardNotFound(cardId)
    }

    const card = await this.cardModel.findOne({
      _id: new ObjectId(cardId),
      deleted: false,
    })

    if (!nullable && !card) {
      await this.errorService.throwErrorCardNotFound(cardId)
    }

    return card
  }

  async getLastCardInlist(listId: ObjectId): Promise<Card | null> {
    return this.cardModel
      .findOne({
        listId,
        deleted: false,
      })
      .sort({
        rank: -1,
      })
  }

  async getFirstCardInlist(listId: ObjectId): Promise<Card | null> {
    return this.cardModel
      .findOne({
        listId,
        deleted: false,
      })
      .sort({
        rank: 1,
      })
  }

  async getCardNeighboursByListIdAndReplacedCardId(
    listId: ObjectId,
    destinationCardId: ObjectId,
  ): Promise<[Card, Card]> {
    const afterCard = await this.cardModel.findOne({
      _id: destinationCardId,
      listId,
      deleted: false,
    })

    if (!afterCard) {
      await this.errorService.throwErrorRankNotFoundInList()
    }

    const [prevCard] = await this.cardModel.aggregate<Card>([
      {
        $sort: {
          rank: -1,
        },
      },
      {
        $match: {
          listId,
          deleted: false,
          rank: {
            $lt: afterCard.rank,
          },
        },
      },
    ])

    return [prevCard, afterCard]
  }

  async getCardInAListsPageLoadQuery<T extends ICountMongo | Card>(
    listId: ObjectId,
    skip = 0,
    limit = DEFAULT_CONSTANT.DEFAULT_LIMIT_GET_CARDS_PAGE_LOAD,
    isCount = false,
  ): Promise<T[]> {
    return this.cardModel.aggregate<T>([
      {
        $match: {
          listId,
          deleted: false,
        },
      },
      ...(isCount
        ? [
            {
              $count: 'count',
            },
          ]
        : [
            {
              $sort: {
                rank: 1 as 1,
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ]),
    ])
  }

  async updateCardById(cardId: ObjectId, updatecardBody: Card): Promise<Card> {
    return this.cardModel.findOneAndUpdate(
      {
        _id: cardId,
        deleted: false,
      },
      {
        $set: updatecardBody,
      },
      {
        new: true,
      },
    )
  }

  async updateCardlistId(cardId: ObjectId, listId: ObjectId): Promise<void> {
    await this.cardModel.updateOne(
      {
        _id: cardId,
      },
      {
        $set: {
          listId,
        },
      },
    )
  }

  async deleteCardById(cardId: ObjectId): Promise<void> {
    await this.cardModel.updateOne(
      {
        _id: cardId,
      },
      {
        $set: {
          deleted: true,
        },
      },
    )
  }
}
