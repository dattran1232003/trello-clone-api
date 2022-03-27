import { applyDecorators } from '@nestjs/common'
import { Schema } from '@nestjs/mongoose'
import { IMongoSchemaConfig } from '../interfaces'

export function MongoSchema(mongoSchemaConfig: IMongoSchemaConfig) {
  const { modelName } = mongoSchemaConfig
  const decorators = [] as Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  >
  decorators.push(
    Schema({
      collection: modelName,
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
      versionKey: 'vK',
    }),
  )
  return applyDecorators(...decorators)
}
