import { Fm } from './GP'

const { Time } = Fm
const format = Time.format.bind(Time)

export class ETA {
  constructor () {
    this.t = new Date()
  }

  ini (msg = '') {
    return `[${format(this.t)}] [Ini 0ms] ${msg}`
  }

  split () {
    const cur = new Date(), df = cur - this.t
    this.t = cur
    return df
  }

  lap (msg = '') {
    return `[${format(this.t)}] [Lap ${this.split()}ms] ${msg}`
  }

  end (msg = '') {
    return `[${format(this.t)}] [End ${this.split()}ms] ${msg}`
  }
}

// split: another approach
// ([this.f, this.t] = [new Date(), this.f])
// return this.f - this.t
