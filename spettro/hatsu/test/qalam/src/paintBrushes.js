import { DFORE } from '../util/defaultColor.config'

const fore = ([r, g, b]) => `[38;2;${r};${g};${b}m`  //选择RGB前景色
const back = ([r, g, b]) => `[48;2;${r};${g};${b}m`  //选择RGB背景色
class Qal {
  static rgb (arr, { bold, } = {}) {
    return str => fore(arr) + str + DFORE
  }
}

const funcs = {
  rgb: true,
  hex: true,
  hsl: true,
}

const lightness={

}




