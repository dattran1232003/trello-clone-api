import { Prop, Schema as SchemaNestJS } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

@SchemaNestJS()
export class BaseSchemaNestJS extends Document {
  _id: ObjectId

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date

  @Prop({
    type: Date,
    required: false,
  })
  deletedAt: Date

  @Prop({
    type: ObjectId,
    required: false,
  })
  deletedBy: ObjectId

  @Prop({
    type: Boolean,
    default: false,
  })
  deleted: boolean
}

@SchemaNestJS()
export class EmbeddedSchemaNestJS extends Document {
  @Prop({
    type: ObjectId,
    required: false,
  })
  _id: ObjectId

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date

  @Prop({
    type: Boolean,
    default: false,
  })
  deleted: boolean

  @Prop({
    type: Date,
    default: Date.now,
  })
  embeddedAt: Date

  @Prop({
    type: Number,
    default: 0,
  })
  vK: number
}
