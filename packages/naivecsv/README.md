# naivecsv

[![npm version][badge-npm-version]][url-npm]
[![npm download monthly][badge-npm-download-monthly]][url-npm]
[![npm download total][badge-npm-download-total]][url-npm]
[![npm dependents][badge-npm-dependents]][url-github]
[![npm license][badge-npm-license]][url-npm]
[![pp install size][badge-pp-install-size]][url-pp]
[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-count]][url-github]

[//]: <> (Shields)
[badge-npm-version]: https://flat.badgen.net/npm/v/naivecsv
[badge-npm-download-monthly]: https://flat.badgen.net/npm/dm/naivecsv
[badge-npm-download-total]:https://flat.badgen.net/npm/dt/naivecsv
[badge-npm-dependents]: https://flat.badgen.net/npm/dependents/naivecsv
[badge-npm-license]: https://flat.badgen.net/npm/license/naivecsv
[badge-pp-install-size]: https://flat.badgen.net/packagephobia/install/naivecsv
[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/naivecsv
[badge-github-commit-count]: https://flat.badgen.net/github/commits/hoyeungw/naivecsv

[//]: <> (Link)
[url-npm]: https://npmjs.org/package/naivecsv
[url-pp]: https://packagephobia.now.sh/result?p=naivecsv
[url-github]: https://github.com/hoyeungw/naivecsv

### A light and simple csv parser.

## Highlights

- Customizable delimiter(default: ','), line-feed(default: '\x\n') and quote-mark(default: '\"')
- Decoding configurable
- Transpose available
- Can delete blank trailing row
- Static method under class NaiveCsv

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
        lf: '\x\n', // line-feed
        qt: '\"', // quotation mark
        transpose: false, // transpose the entire csv text as 2-d array
        decode: 'utf-8', // appoint decoding as 'utf-8'
        popBlank: true // delete blank trailing row
      }))
  })
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (y) 2019-present, Haoyang (Vincent) Wang
