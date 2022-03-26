import { WinstonModule } from 'nest-winston'
import * as path from 'path'
import * as winston from 'winston'

export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

export const COLORIZED_LOGGER_FORMAT = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),

  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),

  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(info => {
    if (info?.context) {
      return `${info.timestamp} [${info?.context}] ${info.level}: ${info.message}`
    } else {
      return `${info.timestamp} ${info.level}: ${info.message}`
    }
  }),
  // nestWinstonModuleUtilities.format.nestLike(
  // 	`ENV-${process.env.NODE_ENV?.toUpperCase()}`,
  // 	{
  // 		prettyPrint: true,
  // 	},
  // ),
)
export const JSON_LOGGER_FORMAT = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),

  winston.format.ms(),

  // JSON
  winston.format.json(),
)

export const LOGGER_TRANSPORTS = [
  new winston.transports.Console({
    level: 'info',
    silent: true,
  }),
  new winston.transports.Console({
    level: 'error',
    silent: false,
  }),
  new winston.transports.Console({
    level: 'warn',
    silent: false,
  }),
  new winston.transports.Console({
    level: 'log',
    silent: false,
  }),
  // new winston.transports.Console({
  // 	level: 'http',
  // 	silent: false,
  // }),
  // new winston.transports.File({
  // 	dirname: path.join(__dirname, '../../../../logs/warn/'), //path to where save loggin result
  // 	filename: 'warn.log', //name of file where will be saved logging result
  // 	level: 'warn',
  // 	maxFiles: 2,
  // 	maxsize: 25 * 1024 * 1024, // 25MB
  // }),
  // new winston.transports.File({
  // 	dirname: path.join(__dirname, '../../../../logs/log/'), //path to where save loggin result
  // 	filename: 'log.log', //name of file where will be saved logging result
  // 	level: 'log',
  // 	maxFiles: 2,
  // 	maxsize: 25 * 1024 * 1024, // 25MB
  // }),

  // Colorized loggers
  // new winston.transports.File({
  // 	dirname: path.join(__dirname, '../../../../logs/error'),
  // 	filename: 'error.log',
  // 	level: 'error',
  // 	maxFiles: 2,
  // 	maxsize: 25 * 1024 * 1024, // 25MB
  // }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all.log',
    level: 'error',
    maxFiles: 2,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all.log',
    level: 'log',
    maxFiles: 2,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all.log',
    level: 'warn',
    maxFiles: 2,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),

  // JSON loggers
  // new winston.transports.File({
  // 	dirname: path.join(__dirname, '../../../../logs/error'),
  // 	filename: 'error-json.log',
  // 	level: 'error',
  // 	maxFiles: 2,
  // 	format: JSON_LOGGER_FORMAT,
  // 	maxsize: 25 * 1024 * 1024, // 25MB
  // }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all-json.log',
    level: 'error',
    maxFiles: 2,
    format: JSON_LOGGER_FORMAT,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all-json.log',
    level: 'log',
    maxFiles: 2,
    format: JSON_LOGGER_FORMAT,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs'),
    filename: 'all-json.log',
    level: 'warn',
    maxFiles: 2,
    format: JSON_LOGGER_FORMAT,
    maxsize: 25 * 1024 * 1024, // 25MB
  }),
]

export const MAIN_LOGGER_CONFIGS = WinstonModule.createLogger({
  format: COLORIZED_LOGGER_FORMAT,
  transports: LOGGER_TRANSPORTS,
})
