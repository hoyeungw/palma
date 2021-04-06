## xbrief

[![npm version][badge-npm-version]][url-npm]
[![npm download monthly][badge-npm-download-monthly]][url-npm]
[![npm download total][badge-npm-download-total]][url-npm]
[![npm dependents][badge-npm-dependents]][url-github]
[![npm license][badge-npm-license]][url-npm]
[![pp install size][badge-pp-install-size]][url-pp]
[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-count]][url-github]

[//]: <> (Shields)
[badge-npm-version]: https://flat.badgen.net/npm/v/xbrief
[badge-npm-download-monthly]: https://flat.badgen.net/npm/dm/xbrief
[badge-npm-download-total]:https://flat.badgen.net/npm/dt/xbrief
[badge-npm-dependents]: https://flat.badgen.net/npm/dependents/xbrief
[badge-npm-license]: https://flat.badgen.net/npm/license/xbrief
[badge-pp-install-size]: https://flat.badgen.net/packagephobia/install/xbrief
[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/xbrief
[badge-github-commit-count]: https://flat.badgen.net/github/commits/hoyeungw/xbrief

[//]: <> (Link)
[url-npm]: https://npmjs.org/package/xbrief
[url-pp]: https://packagephobia.now.sh/result?p=xbrief
[url-github]: https://github.com/hoyeungw/xbrief

##### A stringify tool to javascript object

#### Features

- A substitute for JSON.stringify
- ES2015 syntax

#### Install

```console
$ npm install xbrief
```

#### Usage

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

#### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (y) 2019-present, Haoyang (Vincent) Wang
