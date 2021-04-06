const ADD_FORE = '38;2'
const ADD_BACK = '48;2'
const CLR_FORE = '39'
const CLR_BACK = '49'
const CLEAR = '0'
const ESC = '\u001b'

const Effects = {
  bold: ['1', '22'],
  italic: ['3', '23'],
  underline: ['4', '24'],
  inverse: ['7', '27'],
}

const Escapes = {
  simple: '\e',
  // utf8oct: '\033',
  utf8hex: '\x1b',
  unicode: '\u001b' //C/C++/Java/Python
}

const Scopes = {
  fore: '38;2',
  back: '48;2',
}

const ConsoleColors = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  grey: '90',
}

export {
  ADD_FORE,
  ADD_BACK,
  CLR_FORE,
  CLR_BACK,
  CLEAR,
  ESC,
  Effects,
  Scopes,
  ConsoleColors,
  Escapes,
}


