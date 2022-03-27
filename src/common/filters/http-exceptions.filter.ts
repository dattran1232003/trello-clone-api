import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common'
import { IError } from '../interfaces'
import { CustomException, SendData } from './custom-exception'

@Catch(HttpException)
export class HttpExceptionFilter extends CustomException<HttpException> {
  private readonly logger = new Logger(this.constructor.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const errorCode = exception.getStatus()
    const response = exception.getResponse() as IError<any>

    const message = response?.message || ''
    const statusCode = response.statusCode || 500
    const data = response.data

    this.logger.warn(
      `[HTTP-EXCEPTION]: \n errorCode: ${errorCode} \n statusCode: ${statusCode} \n message: ${message}`,
    )
    this.send(exception, host, {
      statusCode,
      errorCode: statusCode,
      message,
      data,
    } as SendData<any>)
  }
}
