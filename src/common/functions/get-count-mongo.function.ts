import { ICountMongo } from '../interfaces'

export function getCountMongoResult(countMongo: ICountMongo[]): number {
  return countMongo.length ? countMongo.shift().count : 0
}
