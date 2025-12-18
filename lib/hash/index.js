'use strict';

/**
 * @description polynomial rolling 
 * Horner's method
 * usually uses a prime number as base 31 | 37 | 53 ... 
 */

const polynomial = (value) => {
  const base = 0x1f;
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum = sum * base + value.charCodeAt(i);
  }
  return sum >>> 0;
}

/**
 * @description FNV-style, Fowler–Noll–Vo
 * 
 * Concept: Bit mixing, xor + multi
 * 
 * - good avalanche
 * - spread entropy evenly
 * - work well with 32/64-bit overflow
 */

const fnv = (value) => {
  let sum = 0x811c9dc5;
  const multi = 0x01000193;
  for (let i = 0; i < value.length; i++) {
    sum ^= value.charCodeAt(i);
    sum = Math.imul(sum, multi);
  }
  return sum >>> 0;
}
/**
 * @description Daniel J. Bernstein
 *
 * sum << 5 = sum * (pow(5, 2) or 32)
 * example: 
 * sum = 2
 * 
 * uses formula: 
 * h * k = (k << n) + h, where k = pow(2, n) + 1, n = 5
 * 
 * 2 << 5 = 2 * 32 = 64, 64 + 2 = 66, which is 2 * 33 = 66
 */

const djb2 = (value) => {
  let sum = 0x1505;
  for (let i = 0; i < value.length; i++) {
    sum = ((sum << 5) + sum) + value.charCodeAt(i);
  }
  return sum >>> 0;
}

/**
 * @description integer hash
 * 
 * uses reversed(pow(2, 32) / phi) 
 * phi (golden ration) ~= 1.618 
 * 
 * by multiplying high and low bits influence each other
 */
const int = (value) => Math.imul(value, 0x9e3779b1) >>> 0;

module.exports = {
  polynomial,
  fnv,
  djb2,
  int,
};
