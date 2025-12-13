'use strict';

/**
 * @description simple example
 * only for concept/education
 * collision heavy
 */
function example() {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this.charCodeAt(i);
  }
  return sum;
}

/**
 * @description polynomial rolling 
 * Horner's method without pow
 * pow - explicit polynomial
 * without pow - evaluated polynomial
 * usually uses a prime number as base 31 | 37 | 53 ... 
 */
function explicit() {
  const length = this.length;
  const pows = Array(length).fill(0);
  pows[0] = 1;
  for (let i = 1; i < length; i++) {
    pows[i] = pows[i - 1] * 31;
  }
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += (this[i].charCodeAt() * pows[length - 1 - i]);
  }
  return sum >>> 0;
}

function evaluated() {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum = sum * 31 + this.charCodeAt(i);
  }
  return sum >>> 0;
}

/**
 * @description FNV-style, Fowler–Noll–Vo
 * concept - bit mixing
 * start from a large constant (empirically chosen to mix bits well)
 * xor input
 * multiply by a prime (FNV prime)
 * 
 * produces good avalanche behavior
 * (avalanche - Flip one bit in input and ~50% of output bits change)
 * spread entropy evenly, avoid obvious cycles
 * work well with 32/64-bit overflow
 */

function fnv() {
  let sum = 0x811c9dc5;
  const multi = 0x01000193;
  for (let i = 0; i < this.length; i++) {
    sum ^= this.charCodeAt(i);
    sum = Math.imul(sum, multi);
  }
  return sum >>> 0;
}
/**
 * @description Daniel J. Bernstein
 * start from value (arbitrary nothing-up-my-sleeve constant)
 * (sum << 5 + sum) + numeric string value (works good for ASCII)
 * 
 * sum << 5 = sum * (pow(5, 2) or 32)
 * example: 
 * sum = 2
 * 2 << 5 = 2 * 32 = 64
 * 64 + 2 = 66, which is 2 * 33 = 66
 * formula: 
 * h * k = (k << n) + h, where k = pow(2, n) + 1
 */

function djb2() {
  let sum = 5381;
  for (let i = 0; i < this.length; i++) {
    sum = ((sum << 5) + sum) + this.charCodeAt(i);
  }
  return sum >>> 0;
}

/**
 * @description integer hash
 * uses reversed(pow(2, 32) / phi) 
 * phi (golden ration) ~= 1.618 
 * by multiplying high and low bits influence each other
 */
const int = (x) => Math.imul(x, 0x9e3779b1) >>> 0;

module.exports = {
  poly: {
    explicit,
    evaluated,
  },
  fnv,
  djb2,
  int,
};
