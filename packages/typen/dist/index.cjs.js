'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// let protoType = function (it) {
//   const raw = typeof it;
//   if (raw === "object") {
//     switch (true) {
//       case (it instanceof Array):
//         return "array";
//       case (it instanceof Map):
//         return "map";
//       case (it instanceof Set):
//         return "set";
//       case (it instanceof Function):
//         return "function";
//       default:
//         return raw;
//     }
//   } else {
//     return raw
//   }
// };
const oc = Object.prototype.toString;
/**
 * const rxObj = /^\[object (.*)]$/
 * Equivalent to: Object.prototype.stringify.call(o).match(rxObj)[1]
 * @param {*} o
 * @return {string}
 */

const otype = o => oc.call(o).slice(8, -1);

const UND = 'undefined';
const BOO = 'boolean';
const NUM = 'number';
const BIG = 'bigint';
const STR = 'string';
const OBJ = 'object';
const FUN = 'function';
const ARR = 'array';
const MAP = 'map';
const SET = 'set';

class Typ {
  static protoType(o) {
    return oc.call(o);
  }

  static initial(o) {
    return oc.call(o).slice(8, 11);
  }

  static infer(o) {
    const t = typeof o;
    return t !== OBJ ? t : otype(o).toLowerCase();
  }

}

/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */

const vdt = (x, y) => isNaN(x - y) ? NaN : y;

class Num {
  // Angular 4.3
  static isNumeric(x) {
    return !isNaN(x - parseFloat(x));
  }

  static numeric(x) {
    return vdt(x, parseFloat(x));
  }

  static inferData(x) {
    const t = typeof x;
    return t === STR ? isNaN(x - parseFloat(x)) ? STR : NUM : t === OBJ ? otype(x).toLowerCase() : t;
  }

}

const check$1 = x => !!x || x === 0;

class NumLoose {
  static isNumeric(x) {
    return check$1(+x);
  }

  static numeric(x) {
    x = +x;
    return check$1(x) ? x : NaN;
  }
  /**
   *
   * @param {*} x
   * @return {string}
   */


  static inferData(x) {
    const t = typeof x;
    return t === STR ? check$1(+x) ? NUM : STR : t === OBJ ? otype(x).toLowerCase() : t;
  }

}

/**
 *
 * @param x
 * @return {{
 * typeOf: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"),
 * protoType: *,
 * stringify: string
 * }}
 */

let check = x => ({
  value: x,
  typeOf: typeof x,
  protoType: oc.call(x),
  stringify: `${x}`
});

const T = {
  UND,
  BOO,
  NUM,
  BIG,
  STR,
  OBJ,
  FUN,
  ARR,
  MAP,
  SET
};

const UNDEFINED = 'undefined';
const BOOLEAN = 'boolean';
const NUMBER = 'number';
const BIGINT = 'bigint';
const STRING = 'string';
const OBJECT = 'object';
const FUNCTION = 'function';
const ARRAY = 'array';
const NULL = 'null';

exports.ARR = ARR;
exports.ARRAY = ARRAY;
exports.BIG = BIG;
exports.BIGINT = BIGINT;
exports.BOO = BOO;
exports.BOOLEAN = BOOLEAN;
exports.FUN = FUN;
exports.FUNCTION = FUNCTION;
exports.MAP = MAP;
exports.NULL = NULL;
exports.NUM = NUM;
exports.NUMBER = NUMBER;
exports.Num = Num;
exports.NumLoose = NumLoose;
exports.OBJ = OBJ;
exports.OBJECT = OBJECT;
exports.SET = SET;
exports.STR = STR;
exports.STRING = STRING;
exports.T = T;
exports.Typ = Typ;
exports.UND = UND;
exports.UNDEFINED = UNDEFINED;
exports.check = check;
