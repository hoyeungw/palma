'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 *
 * @param {number} x
 * @returns {number}
 */
const intExponent = x => ~~Math.log10(x);
/**
 *
 * @param {number} x
 * @returns {number}
 */

const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;
const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon;
const almostInt = (x, epsilon) => {
  // let rounded = Math.round(x)
  // return rounded - epsilon < x && rounded + epsilon > x
  return Math.abs(x - round(x)) < epsilon;
};

exports.almostEquals = almostEquals;
exports.almostInt = almostInt;
exports.intExponent = intExponent;
exports.round = round;
