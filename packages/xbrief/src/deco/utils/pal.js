import { Hatsu } from 'hatsu'
import { Greys, Palett } from 'palett'

const { hex } = Hatsu

/**
 *
 * @type {{str: function, brc: function, udf: function, num: function, brk: function, idx: function}}
 */
export const Pal = {
  idx: hex(Greys.brown.lighten_4),
  str: hex(Palett.lightGreen.accent_2),
  num: hex(Palett.deepOrange.accent_2),
  udf: hex(Palett.deepPurple.accent_2),
  brk: hex(Palett.blue.accent_2),
  brc: hex(Palett.amber.base),
  fnc: hex(Palett.green.accent_4),
}

const
  brkL = Pal.brk('[ '), brkR = Pal.brk(' ]'),
  brcL = Pal.brc('{ '), brcR = Pal.brc(' }')

export const bracket = content => brkL + content + brkR
export const brace = content => brcL + content + brcR
