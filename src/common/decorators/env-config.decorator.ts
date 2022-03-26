import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

export function EnvConfig<T>(
  validator: ClassConstructor<T>,
  filePath: string,
): PropertyDecorator {
  return function (target, propertyKey): void {
    const config = dotenv.parse(fs.readFileSync(filePath))
    const validatedConfig = plainToInstance<T, any>(validator, config, {
      exposeDefaultValues: true,
      enableImplicitConversion: true,
    })

    const error = validateSync(validatedConfig as any, {
      skipMissingProperties: false,
    })

    if (error.length) {
      throw new Error(error.toString())
    }

    target[propertyKey] = validatedConfig
  }
}
