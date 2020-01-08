## dequote
### A light and simple debug tool.

<p align="center">
  <a href="https://npmcharts.com/compare/dequote?minimal=true"><img src="https://img.shields.io/npm/dm/dequote.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/dequote"><img src="https://img.shields.io/npm/v/dequote.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/dequote"><img src="https://img.shields.io/npm/l/dequote.svg" alt="License"></a>
</p>

## Highlights

- A debug tool.

## Install

```console
$ npm install dequote
```

## Usage

### Simple
```js
import { Dequote } from 'dequote'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.red.base,
  server: palette.purple.base,
  stranger: greys.grey.base
}

const debug = Dequote.build(castList)

debug.says('client', '\'Shakespeare\'')
debug.says('server', '\'Dickens\'')
```

### Factorial with pipeline operator
```js
import { Dequote } from 'dequote'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.red.base,
  server: palette.purple.base,
  stranger: greys.grey.base
}

const debug = Dequote.build(castList)
const says = {
  client: debug.credit('chef'),
  server: debug.credit('aboyeur')
}
'Shakespeare' |> says.client
'Dickens' |> says.server
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Haoyang (Vincent) Wang
