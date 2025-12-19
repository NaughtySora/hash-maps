'use strict';

const { int, fnv } = require("../hash/index.js");

class HashMap {
  #isBitwise = false;
  #buckets = null;
  #capacity = 0;
  #size = 0;

  constructor(capacity = 8) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new Error('capacity has to be a positive integer');
    }
    this.#resize(capacity);
  }

  get #grow() {
    return (this.#size / this.#capacity) >= 0.75;
  }

  #resize(value) {
    const capacity = value ?? ((this.#capacity << 1) || 1);
    this.#capacity = capacity;
    this.#isBitwise = (capacity & (capacity - 1)) === 0;
    if (this.#buckets === null) {
      this.#buckets = Array(capacity).fill([]);
    }
    else {
      const buckets = Array(capacity).fill([]);
      for (const bucket of this.#buckets) {
        if (bucket.length === 0) continue;
        for (let i = 0; i < bucket.length; i++) {
          const value = bucket[i];
          buckets[this.#index(value.key)].push(value);
        }
      }
      this.#buckets = buckets;
    }
  }

  #modulo(hash) {
    return hash % this.#capacity;
  }

  #bitwise(hash) {
    return hash & (this.#capacity - 1);
  }

  #bucket(hash) {
    return this.#isBitwise ?
      this.#bitwise(hash) :
      this.#modulo(hash);
  }

  #hash(value) {
    let hash;
    const type = typeof value;
    if (type === "string") hash = fnv(value);
    if (type === "number") hash = int(value);
    if (type === "boolean") hash = int(+value);
    if (type === "bigint") hash = fnv(value.toString());
    if (hash === undefined) throw new Error('Unsupported key type');
    return hash;
  }

  #index(value) {
    return this.#bucket(this.#hash(value));
  }

  #get(key) {
    if (this.size === 0) return;
    for (const node of this.#buckets[this.#index(key)]) {
      if (node.key === key) return node;
    }
  }

  has(key) {
    if (this.size === 0) return false;
    return this.get(key) !== undefined;
  }

  set(key, value) {
    const node = this.#get(key);
    if (node) {
      node.value = value;
    } else {
      if (this.#grow) this.#resize();
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
    if (bucket.length === 1 && bucket[0].key === key) {
      return (bucket.pop(), true);
    }
    const last = bucket[bucket.length - 1];
    if (last.key === key) return (bucket.pop(), true);
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i] = last;
        bucket.pop();
        return true;
      }
    }
    return false;
  }

  get capacity() {
    return this.#capacity;
  }

  get size() {
    return this.#size;
  }
}


module.exports = HashMap;