import { ERROR_CODE } from '../constants'

export interface IError<T> {
  message: string
  statusCode: ERROR_CODE
  data?: T
}

export interface IBasicError {
  message: string
  statusCode: ERROR_CODE
}
