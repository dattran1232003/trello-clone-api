import { Injectable } from '@nestjs/common'
import { LexoRank } from 'lexorank'
import { UserInBoardCollection } from 'src/api/board/collections'
import { CardCollection } from 'src/api/card/collections'
import {
  CardResponseDto,
  GetCardsPageLoadQueryRequestDto,
  GetCardsPageLoadResponseDto,
} from 'src/api/card/dtos'
import { Card } from 'src/api/card/schemas'
import { CardSharedService } from 'src/api/card/services'
import { IUser } from 'src/api/user/interfaces'
import { ITrackingHeaders } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { ListCollection } from '../collections'
import {
  ListCardParamRequestDto,
  MoveCardParamRequestDto,
  MoveCardRequestDto,
} from '../dtos'

@Injectable()
export class ListCardService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly cardSharedService: CardSharedService,

    private readonly listCollection: ListCollection,
    private readonly cardCollection: CardCollection,
    private readonly userInBoardCollection: UserInBoardCollection,
  ) {}

  async getCardsInList(
    user: IUser,
    param: ListCardParamRequestDto,
    query: GetCardsPageLoadQueryRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<GetCardsPageLoadResponseDto> {
    const { skip, limit } = query

    const list = await this.listCollection.getListById(param.listId)
    await this.userInBoardCollection.checkUserInBoard(user._id, list.boardId)

    const [cards, totalItems] = await Promise.all([
      this.cardSharedService.getCardsInListPageLoad(list._id, skip, limit),
      this.cardSharedService.countTotalCardsInList(list._id),
    ])

    const cardsResponse = await Promise.all(
      cards.map(async card => {
        return this.cardSharedService.getCardResponse(card)
      }),
    )

    return {
      items: cardsResponse,
      totalItems,
    } as GetCardsPageLoadResponseDto
  }

  async moveCard(
    user: IUser,
    param: MoveCardParamRequestDto,
    body: MoveCardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    const { listId, cardId } = param
    const { destinationCardId } = body

    const [destinationList, currentCard, destinationCard] = await Promise.all([
      this.listCollection.getListById(listId),
      this.cardCollection.getCardById(cardId),
      destinationCardId && this.cardCollection.getCardById(destinationCardId),
    ])

    if (
      destinationCard &&
      !destinationList.boardId?.equals(destinationCard.boardId)
    ) {
      await this.errorService.throwErrorListCanOnlyMoveInTheCurrentBoard()
    }

    await Promise.all([
      this.userInBoardCollection.checkUserInBoard(
        user._id,
        currentCard.boardId,
      ),
    ])

    let newRank: string
    if (destinationCard) {
      const [prevCard, afterCard] =
        await this.cardCollection.getCardNeighboursByListIdAndReplacedCardId(
          destinationList._id,
          destinationCard._id,
        )
      const prevCardRank = prevCard && LexoRank.parse(prevCard.rank)
      const afterCardRank = afterCard && LexoRank.parse(afterCard.rank)

      if (prevCard && afterCard) {
        newRank = prevCardRank.between(afterCardRank).toString()
      } else if (!prevCard && afterCard) {
        // move to very top
        const firstList = await this.cardCollection.getFirstCardInlist(
          destinationList._id,
        )
        newRank = firstList
          ? LexoRank.parse(firstList.rank).genPrev().toString()
          : LexoRank.middle().toString()
      } else {
        // gen new rank because board has no list
        newRank = LexoRank.middle().toString()
      }
    } else {
      // user want to move list to bottom by set rank property = empty
      const lastList = await this.cardCollection.getLastCardInlist(
        destinationList._id,
      )
      newRank = lastList
        ? LexoRank.parse(lastList.rank).genNext().toString()
        : LexoRank.middle().toString()
    }

    const updatedCard = await this.cardCollection.updateCardById(
      currentCard._id,
      {
        listId: destinationList._id,
        rank: newRank,
      } as Card,
    )

    return this.cardSharedService.getCardResponse(updatedCard)
  }
}
