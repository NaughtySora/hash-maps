'use strict';

const { int, fnv } = require("../hash/index.js");

/**
 * TODO
 * resizing when 0.7-0.75
 * 
 * load factor?
 * 
 * bucket strategies:
 * list,
 * tree,
 * array,
 * addressing and robin hood hashing
 * 
 * */

class HashMap {
  #capacity = 0;
  #isBitwise = false;
  #buckets = null;
  #size = 0;

  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new Error(
        'HashMap requires capacity to be positive integer'
      );
    }
    this.capacity = capacity;
    this.#init();
  }

  #init() {
    const capacity = this.#capacity;
    this.#buckets = Array(capacity).fill(null);
    const buckets = this.#buckets;
    for (let i = 0; i < this.#capacity; i++) {
      buckets[i] = [];
    }
  }

  #module(hash) {
    return hash % this.#capacity;
  }

  #bitwise(hash) {
    return hash & (this.#capacity - 1);
  }

  #bucket(hash) {
    return this.#isBitwise ?
      this.#bitwise(hash) :
      this.#module(hash);
  }

  #string(value) {
    return fnv.call(value);
  }

  #numeric(value) {
    return int.call(value);
  }

  #bool(value) {
    return int.call(+value);
  }

  #hash(value) {
    let hash;
    const type = typeof value;
    if (type === "boolean") hash = this.#bool(value);
    if (type === "number") hash = this.#numeric(value);
    if (type === "string") hash = this.#string(value);
    if (type === "bigint") hash = this.#string(value.toString());
    if (hash === undefined) throw new Error('unsupported key type');
    return hash;
  }

  #index(value) {
    return this.#bucket(this.#hash(value));
  }

  #get(key) {
    for (const node of this.#buckets[this.#index(key)]) {
      if (node.key === key) return node;
    }
  }

  has(key) {
    if (this.size === 0) return false;
    for (const node of this.#buckets[this.#index(key)]) {
      if (node.key === key) return true;
    }
    return false;
  }

  set(key, value) {
    const node = this.#get(key);
    if (node) {
      node.value = value;
    } else {
      this.#buckets[this.#index(key)].push({ key, value });
      this.#size++;
    }
    return this;
  }

  get(key) {
    if (this.size === 0) return;
    const node = this.#get(key);
    if (node) return node.value;
  }

  delete(key) {
    if (this.size === 0) return false;
    const bucket = this.#buckets[this.#index(key)];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key == key) {
        bucket.splice(i, 1);
        this.#size--;
        return true;
      }
    }
    return false;
  }

  set capacity(value) {
    this.#capacity = value;
    this.#isBitwise = (value & (value - 1)) === 0;
  }

  get capacity() {
    return this.#capacity;
  }

  get size() {
    return this.#size;
  }
}

module.exports = HashMap;