'use strict';

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { polynomial, djb2, fnv, int } = require('../lib/hash');

describe('hash', () => {
  it('polynomial', () => {
    const j = 'j';
    const a = 'a';
    const long = 'abcdeD<<15';
    const longA = 'abcdeD<<16';
    assert.equal(polynomial(j), polynomial(j));
    assert.notEqual(polynomial(j), polynomial(a));
    assert.equal(polynomial(long), polynomial(long));
    assert.notEqual(polynomial(longA), polynomial(long));
  });

  it('djb2', () => {
    const j = 'j';
    const a = 'a';
    const long = 'abcdeD<<15';
    const longA = 'abcdeD<<16';
    assert.equal(djb2(j), djb2(j));
    assert.notEqual(djb2(j), djb2(a));
    assert.equal(djb2(long), djb2(long));
    assert.notEqual(djb2(longA), djb2(long));
  });

  it('fnv', () => {
    const j = 'j';
    const a = 'a';
    const long = 'abcdeD<<15';
    const longA = 'abcdeD<<16';
    assert.equal(fnv(j), fnv(j));
    assert.notEqual(fnv(j), fnv(a));
    assert.equal(fnv(long), fnv(long));
    assert.notEqual(fnv(longA), fnv(long));
  });

  it('int', () => {
    const j = 777;
    const a = 321;
    const long = 7712309571205123;
    const longA = 7712309581205123;
    assert.equal(int(j), int(j));
    assert.notEqual(int(j), int(a));
    assert.equal(int(long), int(long));
    assert.notEqual(int(longA), int(long));
  });
});