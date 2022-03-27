import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common'
import * as RequestIp from '@supercharge/request-ip'
import { ITrackingHeaders } from '../interfaces'

const logger = new Logger('TrackingHeaders.createParamDecorator')

export const TrackingHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    let ipAddress: string = RequestIp.getClientIp(req)
    if (ipAddress?.indexOf('::ffff:') >= 0) {
      try {
        ipAddress = ipAddress.split('::ffff:')[1]
      } catch (e) {
        logger.error(`TrackingHeaders Parser`, e?.message || e)
      }
    }

    return {
      ipAddress,
      deviceId: req.headers['device-id'],
      appVersion: req.headers['app-version'],
      accessToken: req.headers['authorization'],
      buildAppVersion: Number(req.headers['build-app-version']) || 0,
      timezone: req.headers['timezone'],
    } as ITrackingHeaders
  },
)
