import { Document } from 'mongodb'
import { User } from '../schemas'

export type IUser = Document & User
