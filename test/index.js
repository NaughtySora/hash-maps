'use strict';

const HashMap = require('../lib/hashMap/index.js');

const map = new HashMap(32);

map.set('12', 5);
console.log(map.has('12'), map.size);
console.log(map.delete('12'), map.size);
console.log(map.has('12'), map.size);
console.log(map.delete('12'), map.size);

