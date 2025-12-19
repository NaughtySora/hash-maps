'use strict';

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const HashMap = require('../lib/hashMap');

describe('HashMap', () => {
  describe('constructor', () => {
    it('implicit capacity', () => {
      const map = new HashMap();
      assert.equal(map.size, 0);
      assert.equal(map.capacity, 8);
    });

    it('explicit capacity', () => {
      const map = new HashMap(32);
      assert.equal(map.size, 0);
      assert.equal(map.capacity, 32);
    });

    it('invalid capacity', () => {
      const message = { message: /capacity has to be a positive integer/ };
      assert.throws(() => new HashMap(1n), message);
      assert.throws(() => new HashMap(-1), message);
      assert.throws(() => new HashMap(1.5), message);
      assert.throws(() => new HashMap(0), message);
      assert.throws(() => new HashMap('1'), message);
    });
  });

  it('set/get', () => {
    const map = new HashMap();
    const a = { a: 1 };
    map
      .set(1, 55)
      .set('abc', a)
      .set(true, 15n)
      .set(1n, 'cds');
    assert.equal(map.size, 4);
    const message = { message: /Unsupported key type/ };
    assert.throws(() => map.set({}, { a: 1 }), message);
    assert.throws(() => map.set([], { a: 1 }), message);
    assert.throws(() => map.set(class { }, { a: 1 }), message);
    assert.throws(() => map.set(() => { }, { a: 1 }), message);
    assert.throws(() => map.set(Symbol('testMe'), { a: 1 }), message);
    assert.equal(map.size, 4);
    assert.equal(map.get(1), 55);
    assert.deepEqual(map.get('abc'), a);
    map.set('abc', true);
    assert.equal(map.get('abc'), true);
    assert.equal(map.size, 4);
  });
});