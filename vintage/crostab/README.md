## CrosTab

[![npm version][badge-npm-version]][url-npm]
[![npm download monthly][badge-npm-download-monthly]][url-npm]
[![npm download total][badge-npm-download-total]][url-npm]
[![npm dependents][badge-npm-dependents]][url-github]
[![npm license][badge-npm-license]][url-npm]
[![pp install size][badge-pp-install-size]][url-pp]
[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-count]][url-github]

[//]: <> (Shields)
[badge-npm-version]: https://flat.badgen.net/npm/v/crostab
[badge-npm-download-monthly]: https://flat.badgen.net/npm/dm/crostab
[badge-npm-download-total]:https://flat.badgen.net/npm/dt/crostab
[badge-npm-dependents]: https://flat.badgen.net/npm/dependents/crostab
[badge-npm-license]: https://flat.badgen.net/npm/license/crostab
[badge-pp-install-size]: https://flat.badgen.net/packagephobia/install/crostab
[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/crostab
[badge-github-commit-count]: https://flat.badgen.net/github/commits/hoyeungw/crostab

[//]: <> (Link)
[url-npm]: https://npmjs.org/package/crostab
[url-pp]: https://packagephobia.now.sh/result?p=crostab
[url-github]: https://github.com/hoyeungw/crostab

### A light, simple and easy-to-use commonjs library of a class "Cax" to handle 2d-table with side and banner.

### Install
```shell script
npm install crostab
```

### Usage
```ecmascript 6
import { CrosTab } from 'crostab'
const crosTab = CrosTab.from({
  side: ['Winter','Fall','Summer','Spring'],
  banner: ['A','B','C'],
  matrix: [
    [ 1, 10,95],
    [ 8, 64, 1],
    [25, 32, 1],
    [74,  0, 1]
  ] 
})
```

### Meta

[LICENSE (MIT)](/LICENSE)

Copyright (y) 2019-present, Haoyang (Vincent) Wang
