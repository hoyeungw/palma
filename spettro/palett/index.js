import { red } from './src/colors/red'
import { pink } from './src/colors/pink'
import { purple } from './src/colors/purple'
import { deepPurple } from './src/colors/deepPurple'
import { indigo } from './src/colors/indigo'
import { blue } from './src/colors/blue'
import { lightBlue } from './src/colors/lightBlue'
import { cyan } from './src/colors/cyan'
import { teal } from './src/colors/teal'
import { green } from './src/colors/green'
import { lightGreen } from './src/colors/lightGreen'
import { lime } from './src/colors/lime'
import { yellow } from './src/colors/yellow'
import { amber } from './src/colors/amber'
import { orange } from './src/colors/orange'
import { deepOrange } from './src/colors/deepOrange'
import { brown } from './src/greys/brown'
import { blueGrey } from './src/greys/blueGrey'
import { grey } from './src/greys/grey'
import { addProps } from './src/addProps'

/**
 * @type {Object.<string,Object<string,Object>>}
 * @property {string[]} colors
 * @property {string[]} degrees
 */
const Palett = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey
} |> addProps

const Shades = {
  black: '#000000',
  white: '#FFFFFF',
}

const Greys = {
  brown,
  blueGrey,
  grey,
}

export {
  Palett,
  Shades,
  Greys
}

