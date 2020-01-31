import dye from '../src'

var cols = ['white', 'black', 'grey', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow']
cols.forEach(function (col) {
  var colored = dye[col](col)
  console.log(colored)
  console.log(dye.bold(colored))
})
