export interface ITrackingHeaders {
  /**
   * Ip address of a request
   */
  ipAddress?: string

  /**
   * OneSignal's device id
   */
  deviceId?: string

  /**
   * Semantic Versioning MAJOR.MINOR.PATCH
   * @example 1.2.20
   */
  appVersion?: string

  /**
   * Build App Version
   * @example 12
   */
  buildAppVersion?: number

  /**
   * Timezone
   *
   * @example -420 for Vietnam
   * @example -140 for France
   */
  timezone?: number

  /**
   * "Authentication" in headers
   * JWT access token
   */
  accessToken?: string
}
