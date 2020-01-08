import { Ar, Mx } from 'veho'
import { JoinT } from './JoinT'
import { Comparer } from 'borel'
import { Xr } from 'xbrief'

const { spliceCols, size } = Mx
const { select, ini: ar } = Ar

const locInd = (mx, ys, vs, hi) =>
  mx.findIndex(row => {
    for (let i = 0; i < hi; i++) if (row[ys[i]] !== vs[i]) return false
    return true
  })

/**
 *
 * @param joinT
 * @returns {
 * (function({mx: *[][], ys: number[]}, {mx: *[][], ys: number[]}): *[][])
 * |(function({mx: *[][], ys: number[]}, {mx: *[][], ys: number[]}, *=): *[][])
 * }
 */
export const joiner = (joinT) => {
  switch (joinT) {
    case JoinT.union:
      return MxJoin.joinUnion
    case JoinT.left:
      return MxJoin.joinLeft
    case JoinT.right:
      return MxJoin.joinRight
    case JoinT.intersect:
    default:
      return MxJoin.joinIntersect
  }
}

class MxJoin {
  static joinUnion = ({ mx: mxL, ys: ysL }, { mx: mxR, ys: ysR }, fillEmpty) => {
    const
      hL = mxL.length, hR = mxR.length, hi = ysR.length,
      mx = Array(hL),
      mxL2 = spliceCols(Mx.copy(mxL), ysL.slice().sort(Comparer.numberAscending)), [, wL] = size(mxL2),
      mxR2 = spliceCols(Mx.copy(mxR), ysR.slice().sort(Comparer.numberAscending)), [, wR] = size(mxR2),
      idxRiLs = new Set()
    for (let i = 0, x, vsL; i < hL; i++) {
      vsL = select(mxL[i], ysL, hi)
      x = locInd(mxR, ysR, vsL, hi)
      if (x < 0) {
        mx[i] = vsL.concat(mxL2[i], ar(wR, fillEmpty))
      } else {
        mx[i] = vsL.concat(mxL2[i], mxR2[x])
        idxRiLs.add(x)
      }
    }
    for (let i = 0, x, vsR; i < hR; i++) {
      if (idxRiLs.has(i)) {
        continue
      }
      vsR = select(mxR[i], ysR, hi)
      x = locInd(mxL, ysL, vsR, hi)
      if (x < 0) vsR.concat(ar(wL, fillEmpty), mxR2[i]) |> mx.push
    }
    return mx
  }

  static joinLeft = ({ mx: mxL, ys: ysL }, { mx: mxR, ys: ysR }, fillEmpty) => {
    const
      hL = mxL.length, hi = ysL.length,
      mx = Array(hL),
      mxL2 = spliceCols(Mx.copy(mxL), ysL.slice().sort(Comparer.numberAscending)),
      mxR2 = spliceCols(Mx.copy(mxR), ysR.slice().sort(Comparer.numberAscending)), [, wR] = size(mxR2)
    for (let i = 0, x, vsL; i < hL; i++) {
      vsL = select(mxL[i], ysL, hi)
      x = locInd(mxR, ysR, vsL, hi)
      mx[i] = x < 0
        ? vsL.concat(mxL2[i], ar(wR, fillEmpty))
        : vsL.concat(mxL2[i], mxR2[x])
    }
    return mx
  }

  static joinRight = ({ mx: mxL, ys: ysL }, { mx: mxR, ys: ysR }, fillEmpty) => {
    const
      hR = mxR.length, hi = ysR.length,
      mx = Array(hR),
      mxL2 = spliceCols(Mx.copy(mxL), ysL.slice().sort(Comparer.numberAscending)), [, wL] = size(mxL2),
      mxR2 = spliceCols(Mx.copy(mxR), ysR.slice().sort(Comparer.numberAscending))
    for (let i = 0, x, vsR; i < hR; i++) {
      vsR = select(mxR[i], ysR, hi)
      x = locInd(mxL, ysL, vsR, hi)
      mx[i] = x < 0
        ? vsR.concat(ar(wL, fillEmpty), mxR2[i])
        : vsR.concat(mxL2[x], mxR2[i])
    }
    return mx
  }

  static joinIntersect = ({ mx: mxL, ys: ysL }, { mx: mxR, ys: ysR }) => {
    const
      hL = mxL.length, hi = ysL.length,
      mx = [],
      mxL2 = spliceCols(Mx.copy(mxL), ysL.slice().sort(Comparer.numberAscending)),
      mxR2 = spliceCols(Mx.copy(mxR), ysR.slice().sort(Comparer.numberAscending))
    for (let i = 0, x, vsL; i < hL; i++) {
      vsL = select(mxL[i], ysL, hi)
      x = locInd(mxR, ysR, vsL, hi)
      if (x < 0) continue
      mx.push(vsL.concat(mxL2[i], mxR2[x]))
    }
    return mx
  }
}


