import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { COLLECTION_NAME } from 'src/common/constants'
import { ErrorService } from 'src/common/services'
import { User } from '../../schemas'

@Injectable()
export class UserCollection {
  constructor(
    @InjectModel(COLLECTION_NAME.USER_MODEL)
    private readonly userModel: Model<User>,
    private readonly errorService: ErrorService,
  ) {}

  async create(user: User): Promise<User> {
    return this.userModel.create(user)
  }

  async getUserById(userId: ObjectId): Promise<User> {
    return this.userModel.findOne({
      _id: userId,
      deleted: false,
    })
  }

  async getUserByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<User> {
    return this.userModel.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
      deleted: {
        $ne: true,
      },
    })
  }
}
