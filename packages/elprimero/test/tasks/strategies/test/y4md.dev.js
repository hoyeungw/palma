// y -3000 to + 3000
// m 0 to 12
// d 0 to 30

export class Y4mdDev {
  static subtract (ymd, q) {
    // y -3000 to + 3000
    // m 0 to 12
    // d 0 to 30
    const [y, m, d] = ymd.split('-')
    const dt = (y << 9) + (m << 5) + d
  }
}
