## naivecsv
### A light and simple csv parser.

<p align="center">
  <a href="https://npmcharts.com/compare/naivecsv?minimal=true"><img src="https://img.shields.io/npm/dm/naivecsv.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/naivecsv"><img src="https://img.shields.io/npm/v/naivecsv.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/naivecsv"><img src="https://img.shields.io/npm/l/naivecsv.svg" alt="License"></a>
</p>

## Highlights

- ES6 syntax, static method under class NaiveCsv
- Customizable delimiter(default: ','), line-feed(default: '\r\n') and quote-mark(default: '\"')
- Decoding configurable
- Transpose available
- Can delete blank trailing row

## Install

```console
$ npm install naivecsv
```

## Usage

```js
import { NaiveCsv } from 'naivecsv'
import { promises as fsPromise } from 'fs'

const file='[your csv file directory]'

// simple usage
fsPromise
  .readFile(file, 'utf-8')
  .then(text => {
    console.log(NaiveCsv.toRows(text, { popBlank: true }))
  })

// more features
fsPromise
  .readFile(file)
  .then(text => {
    console.log(
      NaiveCsv.toRows(text, {
        de: ',', // delimiter
        lf: '\r\n', // line-feed
        qt: '\"', // quotation mark
        transpose: false, // transpose the entire csv text as 2-d array
        decode: 'utf-8', // appoint decoding as 'utf-8'
        popBlank: true // delete blank trailing row
      }))
  })
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Haoyang (Vincent) Wang
