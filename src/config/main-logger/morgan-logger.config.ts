import * as morgan from 'morgan'
import * as path from 'path'
import * as winston from 'winston'
import { COLORIZED_LOGGER_FORMAT, LOGGER_LEVELS } from './main-logger.config'

const Logger = winston.createLogger({
  levels: LOGGER_LEVELS,
  format: COLORIZED_LOGGER_FORMAT,
  transports: [
    new winston.transports.Console({
      level: 'http',
      silent: false,
    }),

    // All logs into 1 file
    new winston.transports.File({
      dirname: path.join(__dirname, '../../../../logs'),
      filename: 'all.log',
      level: 'http',
      maxFiles: 2,
      maxsize: 25 * 1024 * 1024, // 25MB
    }),
    ,
  ],
})

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: morgan.StreamOptions = {
  // Use the http severity
  write: message => Logger.http(message),
}

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  // const env = process.env.NODE_ENV || 'development'
  // return env !== 'development'
  return false
}

// Build the morgan middleware
export const MORGAN_MIDDLEWARE_CONFIG = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':method :url :status :res[content-length] - :response-time ms',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip },
)
