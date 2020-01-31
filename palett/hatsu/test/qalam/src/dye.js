/**
 *
 * \033是键盘左上角Esc键对应的ASCII码(8进制), \033 = \x1b = \e
 * 例如: echo -e "\x1b[31mRed Text\e[0m"也输出红色字体"Red Text"
 */
const codes = {
  bold: ['\x1B[1m', '\x1B[22m'],
  italic: ['\x1B[3m', '\x1B[23m'],
  underline: ['\x1B[4m', '\x1B[24m'],
  inverse: ['\x1B[7m', '\x1B[27m'],
  black: ['\x1B[30m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1B[39m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  magenta: ['\x1B[35m', '\x1B[39m'],
  cyan: ['\x1B[36m', '\x1B[39m'],
  white: ['\x1B[37m', '\x1B[39m'],
  grey: ['\x1B[90m', '\x1B[39m']
}

Object.keys(codes).forEach(function (style) {
  exports[style] = str => codes[style].join(str)
})

exports.stripColors = str => str.replace(/\x1B\[\d+m/g, '')
