import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { NODE_ENV } from 'src/common/constants'

export class AppEnvironmentVariables {
  @IsEnum(NODE_ENV)
  @IsNotEmpty()
  NODE_ENV = process.env.NODE_ENV as NODE_ENV

  @IsNumber()
  @IsNotEmpty()
  @Transform(v => Number(v.value))
  PORT = Number(process.env.PORT)

  @IsString()
  @IsNotEmpty()
  MONGO_URI = process.env.MONGO_URI

  @IsString()
  @IsNotEmpty()
  API_DOCS_PATH = process.env.API_DOCS_PATH

  @IsString()
  @IsNotEmpty()
  PRIVATE_KEY = process.env.PRIVATE_KEY

  @IsString()
  @IsNotEmpty()
  PUBLIC_KEY = process.env.PUBLIC_KEY
}
