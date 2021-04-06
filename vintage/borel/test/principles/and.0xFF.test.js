import { Xr } from 'xbrief'

const numbers = [
  -1, 0, 99, 99.5, 100, 254.99, 255, 255.5, 256
]

for (let number of numbers) {
  Xr(number, number & 0xFF).say |> console.log
}

for (let number of numbers) {
  Xr(number, number & 100).say |> console.log
}
