import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { LexoRank } from 'lexorank'

export function IsLexoRankString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLexorankString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} must be and LexoRank string`,
      },
      validator: {
        validate(value: string, _: ValidationArguments): boolean {
          try {
            const lexoRankString = LexoRank.parse(value)
            return lexoRankString ? true : false
          } catch (_) {
            return false
          }
        },
      },
    })
  }
}
