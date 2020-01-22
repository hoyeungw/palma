let size = Symbol('size')

class Collection {
  constructor (tag) {
    // ...
    this.tag = tag
    this[size] = 0
  }

  static build () {
    let collection = new Collection('wayne')
    collection.add('foo')
    collection.add('bar')
    return collection
  }

  add (item) {
    this[this[size]] = item
    this[size]++
  }

  static sizeOf (instance) {
    return instance[size]
  }
}

Collection.prototype.toString = function () {
  // ...
}

'Reflect: Collection' |> console.log
Object.keys(Collection) |> console.log
// ["toString"]
Reflect.ownKeys(Collection) |> console.log
// ["constructor","toString"]
'' |> console.log

'Reflect: Collection.prototype' |> console.log
Object.keys(Collection.prototype) |> console.log
// ["toString"]
Reflect.ownKeys(Collection.prototype) |> console.log
// ["constructor","toString"]
'' |> console.log

'Reflect: collection' |> console.log
const collection = Collection.build()
Object.keys(collection) |> console.log // ['0']
Reflect.ownKeys(collection) |> console.log
