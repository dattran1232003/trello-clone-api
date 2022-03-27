import { User } from 'src/api/user/schemas'
import { Session } from '../session/schemas'

export interface IProfile {
  user: User
  session: Session
}
