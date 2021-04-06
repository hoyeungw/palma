import { Zu } from '../..'
import { Ar } from 'veho'

export const randNumArr = Ar.ini(128, () => Zu.rand(0, 200))
