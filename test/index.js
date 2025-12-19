'use strict';

const fs = require('node:fs');
const path = require('node:path');

for(const file of fs.readdirSync(__dirname)){
  require(path.resolve(__dirname, file));
}
