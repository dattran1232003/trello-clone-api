import { Injectable } from '@nestjs/common'
import { LexoRank } from 'lexorank'
import { UserInBoardCollection } from 'src/api/board/collections'
import { ListCollection } from 'src/api/list/collections'
import { IUser } from 'src/api/user/interfaces'
import { isNotNullAndNotUndefined } from 'src/common/functions'
import { ITrackingHeaders } from 'src/common/interfaces'
import { ErrorService } from 'src/common/services'
import { CardCollection } from '../collections'
import {
  CardResponseDto,
  CreateCardRequestDto,
  DeleteCardParamRequestDto,
  DeleteCardResponseDto,
  UpdateCardParamRequestDto,
  UpdateCardRequestDto,
} from '../dtos'
import { Card } from '../schemas'
import { CardSharedService } from './card-shared.service'
import { CardUtilsService } from './card-utils.service'

@Injectable()
export class CardService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly cardUtilsService: CardUtilsService,
    private readonly cardSharedService: CardSharedService,

    private readonly cardCollection: CardCollection,
    private readonly listCollection: ListCollection,
    private readonly userInBoardCollection: UserInBoardCollection, // private readonly userInlistCollection: UserInlistCollection,
  ) {}

  async createCard(
    user: IUser,
    body: CreateCardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    const { listId, content, description } = body

    const list = await this.listCollection.getListById(listId)
    await this.userInBoardCollection.checkUserInBoard(user._id, list.boardId)
    const lastCardInlist = await this.cardCollection.getLastCardInlist(list._id)

    let rank: string
    if (lastCardInlist) {
      rank = LexoRank.parse(lastCardInlist.rank).genNext().toString()
    } else {
      // 1st Card in list
      rank = LexoRank.middle().toString()
    }

    const CardBody = {
      listId: list._id,
      boardId: list.boardId,
      content,
      description,
      rank,
    } as Card
    const card = await this.cardCollection.create(CardBody)

    return this.cardSharedService.getCardResponse(card)
  }
  async updateCard(
    user: IUser,
    param: UpdateCardParamRequestDto,
    body: UpdateCardRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<CardResponseDto> {
    const { cardId } = param
    const { content, description } = body

    const card = await this.cardCollection.getCardById(cardId)
    const list = await this.listCollection.getListById(card.listId)
    await this.userInBoardCollection.checkUserInBoard(user._id, list.boardId)

    const updateCardBody = {} as Card

    if (isNotNullAndNotUndefined(content)) {
      updateCardBody.content = content
    }

    if (isNotNullAndNotUndefined(description)) {
      updateCardBody.description = description
    }

    const updatedCard = await this.cardCollection.updateCardById(
      card._id,
      updateCardBody,
    )

    return this.cardSharedService.getCardResponse(updatedCard)
  }

  async deleteCard(
    user: IUser,
    param: DeleteCardParamRequestDto,
    trackingHeaders: ITrackingHeaders,
  ): Promise<DeleteCardResponseDto> {
    const { cardId } = param
    const card = await this.cardCollection.getCardById(cardId)
    await this.userInBoardCollection.checkUserInBoard(user._id, card.boardId)
    await this.cardCollection.deleteCardById(card._id)
    return new DeleteCardResponseDto(card)
  }
}
