## xbrief
A stringify tool to javascript object

[![npm version][npm-image]][npm-url]
[![npm quality][quality-image]][quality-url]
[![npm download][download-image]][npm-url]
[![npm total-download][total-download-image]][npm-url]
[![github commit activity][commit-image]][github-url]
[![npm license][license-image]][npm-url]

[//]: <> (Shields)
[npm-image]: https://img.shields.io/npm/v/xbrief.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/xbrief.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/xbrief.svg?style=flat-square
[total-download-image]:https://img.shields.io/npm/dt/xbrief.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/xbrief.svg?style=flat-square
[commit-image]: https://img.shields.io/github/commit-activity/y/hoyeungw/xbrief?style=flat-square

[//]: <> (Link)
[npm-url]: https://npmjs.org/package/xbrief
[quality-url]: http://packagequality.com/#?package=xbrief
[github-url]: https://github.com/hoyeungw/xbrief

## Features

- A substitute for JSON.stringify
- ES2015 syntax

## Install

```console
$ npm install xbrief
```

## Usage

```js
import { deco } from 'xbrief'

const objects = {
  boolean: true,
  string: 'Shakespeare',
  number: 128,
  null: null,
  undefined: undefined,
  one_row_matrix: [ [1, 1, 2, 3, 5, 8, 13, 21] ],
  simple_set: new Set([1, 1, 1, 2, 2, 3, 3, 3]),
  simple_matrix: Array.from({ length: 3 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) => x + y + 1)),
  simple_map: new Map([['Lagos', 861], ['Dhaka', 8906], ['Lima', 9174], ['Ankara', 5271], ['Nagpur', 2405]]),
  simple_lambda: (x) => `${x}`,
}

console.log(deco(objects))
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Haoyang (Vincent) Wang