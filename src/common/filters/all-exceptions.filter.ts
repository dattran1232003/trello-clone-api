import { ArgumentsHost, Catch, Logger } from '@nestjs/common'
import { MongoError } from 'mongodb'
import { CustomException, SendData } from './custom-exception'

@Catch()
export class AllExceptionFilter extends CustomException<MongoError> {
  private readonly logger = new Logger(this.constructor.name)

  catch(exception: any, host: ArgumentsHost) {
    this.logger.warn(`[AllExceptionFilter]: ${exception}`)
    const statusCode =
      exception && exception.getStatus ? exception.getStatus() : 500

    const errmsg = exception?.message
    const isExists = errmsg && errmsg?.statusCode
    const message = isExists ? errmsg?.message : errmsg
    const errorCode = isExists ? errmsg.statusCode : statusCode
    if (exception.constructor.name !== 'HttpException') {
      // this.logger.error('AllExceptionFilter', exception)
    }
    const data = {
      statusCode: isExists ? errmsg?.statusCode : statusCode,
      errorCode,
      message,
    } as SendData<any>
    this.send(exception, host, data)
  }
}
