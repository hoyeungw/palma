import { Zu } from '../..'
import { Ar } from 'veho'

export const randNumArrLarge = Ar.ini(1024, () => Zu.rand(0, 65535))
