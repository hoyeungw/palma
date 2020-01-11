## quot
### A light and simple debug tool.

<p align="center">
  <a href="https://npmcharts.com/compare/quot?minimal=true"><img src="https://img.shields.io/npm/dm/quot.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/quot"><img src="https://img.shields.io/npm/v/quot.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/quot"><img src="https://img.shields.io/npm/l/quot.svg" alt="License"></a>
</p>

## Highlights

- A debug tool.

## Install

```console
$ npm install quot
```

## Usage

### Simple
```js
import { Quot } from 'quot'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.red.base,
  server: palette.purple.base,
  stranger: greys.grey.base
}

const debug = Quot.build(castList)

debug.says('client', '\'Shakespeare\'')
debug.says('server', '\'Dickens\'')
```

### Factorial with pipeline operator
```js
import { Quot } from 'quot'
import { greys, palette } from 'spettro'

const castList = {
  client: palette.red.base,
  server: palette.purple.base,
  stranger: greys.grey.base
}

const debug = Quot.build(castList)
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
