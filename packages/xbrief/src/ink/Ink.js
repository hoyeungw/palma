import { Callable } from 'kalorie'
import { br, deNaTab, pr, totx } from '../../utils/str'
import { render } from './render'

const inkPreset = (label, ...items) => {
  let stream = [], indent, len
  if (
    (label = String(label)) &&
    (len = label.length) &&
    (indent = label |> deNaTab) < len
  ) {
    stream.push(label.slice(indent) |> br)
  }
  if (items.length) {
    stream.push(items.map(totx).join(',') |> pr)
  }
  return { indent, stream }
}

export class Ink extends Callable {
  /** @type {number} */ indent
  /** @type {string[]} */ stream

  constructor (label, ...items) {
    super(tx => render(tx, this))
    const { indent, stream } = inkPreset(label, ...items)
    this.indent = indent
    this.stream = stream
    return new Proxy(this, {
      /** @returns {Ink|function(...string):Ink} */
      get (target, p, receiver) {
        if (p in target) return target[p]
        target.stream.push(String(p) |> br)
        return (...tx) => {
          target.stream.push(tx.map(totx).join(',') |> pr)
          return receiver
        }
      },
    })
  }

  [Symbol.toPrimitive] (h) {
    switch (h) {
      case 'string':
      case 'default':
        return render(null, this)
      case 'number':
        return this.indent
      default:
        throw new Error('ink Symbol.toPrimitive error')
    }
  }

  asc () {
    this.indent++
    return this
  }

  desc () {
    this.indent--
    return this
  }

  br (...items) {
    this.stream.push(items.map(pr).join(','))
    return this
  }

  p (...items) {
    this.stream.push(...items)
    return this
  }
}






