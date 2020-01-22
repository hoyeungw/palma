const SeriesColors = {
  orange: [10, 59],
  yellowGreen: [60, 119],
  green: [120, 179],
  blue: [180, 239],
  purple: [240, 299],
  red: [[0, 9], [300, 359]]
}

const red = ['red', 'pink',]
const purple = ['purple', 'deepPurple',]
const blue = ['indigo', 'blue', 'lightBlue', 'cyan',]
const green = ['teal', 'green',]
const yellowGreen = ['lightGreen', 'lime', 'yellow',]
const orange = ['amber', 'orange', 'deepOrange',]
const grey = ['brown', 'blueGrey', 'grey']
const rainbow = [].concat(red, purple, blue, green, yellowGreen, orange)
const entire = rainbow.concat(grey)

export const ColorGroups = {
  red,
  purple,
  blue,
  green,
  yellowGreen,
  orange,
  grey,
  rainbow,
  entire
}

