import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { ValidationError } from 'class-validator'

@Injectable()
export class CommonValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    return value
  }

  extractErrors(errors: ValidationError[]): string {
    let firstError = errors.shift()
    const properties = [] as string[]
    if (firstError.children?.length) {
      while (firstError.children?.length) {
        properties.unshift(firstError.property)
        firstError = firstError.children.shift()
      }
    }
    const constraints = firstError.constraints
    const message = Object.keys(constraints).map(key => constraints[key])
    const postfix = properties?.length
      ? ' in property ' + properties.join(' in property ')
      : ''
    return message?.length > 0 && message[0] + postfix
  }

  toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
