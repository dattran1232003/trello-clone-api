import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { CommonValidationPipe } from './common-validation.pipe'

@Injectable()
export class ValidationPipe extends CommonValidationPipe {
  constructor() {
    super()
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const errorMessage = this.extractErrors(errors)
      throw new BadRequestException(errorMessage, 'Validation property')
    }
    return value
  }
}
