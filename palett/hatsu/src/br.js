import { ESC } from '../assets/codes'

export const br = config => `${ESC}[${config.join(';')}m`
