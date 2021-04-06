export class Staff {
  constructor (id, name, pos) {
    this.id = id
    this.name = name
    this.pos = pos
  }

  static fromJson ({ id, name, pos }) {
    return new Staff(id, name, pos)
  }

  get dogTag () {
    return {
      id: this.id,
      name: this.name,
      pos: this.pos
    }
  }

  promote () {
    this.pos++
  }

  demote () {
    this.pos--
  }

  toString () {
    return `[id]:${this.id}, [name]:${this.name}, [pos]:${this.pos}`
  }
}

Staff.staffCopyright = 'MIT'
