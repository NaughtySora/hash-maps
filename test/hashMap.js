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

  it('has/delete', () => {
    const map = new HashMap();
    map.set(1, 55);
    assert.ok(map.has(1));
    map.set(1, '55');
    assert.ok(map.has(1));
    assert.equal(map.size, 1);
    const deleted = map.delete(1, 55);
    assert.ok(deleted);
    assert.equal(map.delete('smth', 55), false);
    assert.equal(map.size, 0);
    assert.equal(map.has(1), false);
  });

  it('resize', () => {
    const map = new HashMap(2);
    map.set(1, 1).set(2, 2).set(3, 3);
    assert.equal(map.size, 3);
    assert.equal(map.capacity, 4);
    map.set(4, 4);
    assert.equal(map.size, 4);
    assert.equal(map.capacity, 8);
  });

  it('modulo indexing', () => {
    const map = new HashMap(3);
    map.set(1, 1);
    assert.equal(map.size, 1);
    assert.equal(map.capacity, 3);
    map.set(2, 2).set(3, 3).set(4, 4);
    assert.equal(map.size, 4);
    assert.equal(map.capacity, 6);
  });

  it('iterator', () => {
    const expected = [1, 2, 3, 4, 5].map(i => [i, i]);
    const map = new HashMap();
    expected.forEach(i => map.set(...i));
    assert.deepEqual([...map], expected);
  });

  it('entries', () => {
    const expected = [1, 2, 3, 4, 5].map(i => [i, i]);
    const map = new HashMap();
    expected.forEach(i => map.set(...i));
    assert.deepEqual([...map.entries()], expected);
  });

  it('entries', () => {
    const expected = [1, 2, 3, 4, 5].map(i => [i, i]);
    const map = new HashMap();
    expected.forEach(i => map.set(...i));
    assert.deepEqual([...map.entries()], expected);
  });

  it('values', () => {
    const expected = [1, 2, 3, 4, 5];
    const map = new HashMap();
    expected.forEach(i => map.set(i, i));
    assert.deepEqual([...map.values()], expected);
  });

  it('keys', () => {
    const expected = [1, 2, 3, 4, 5];
    const map = new HashMap();
    expected.forEach(i => map.set(i, i));
    assert.deepEqual([...map.keys()], expected);
  });

  it('forEach', () => {
    const expected = [1, 2, 3, 4, 5].map(i => [i, i]);
    const map = new HashMap();
    expected.forEach(i => map.set(i[0] + 1, i[1] + 2));
    const actual = [];
    map.forEach((el) => {
      actual.push([el[0] - 1, el[1] - 2]);
    });
    assert.deepEqual(actual, expected);
  });

  it('clear', () => {
    const expected = [1, 2, 3, 4, 5].map(i => [i, i]);
    const map = new HashMap(32);
    expected.forEach(i => map.set(...i));
    assert.equal(map.capacity, 32);
    assert.equal(map.size, 5);
    map.clear();
    assert.equal(map.capacity, 8);
    assert.equal(map.size, 0);
  });

  it('toStringTag', () => {
    assert.equal(Object.prototype
      .toString
      .call(new HashMap()), '[object HashMap]');
  });
});