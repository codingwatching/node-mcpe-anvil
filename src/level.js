'use strict';

var nbt = require('prismarine-nbt');
var promisify = require('node-promise-es6').promisify;
var fs = require('node-promise-es6').fs;
const parseAsync = promisify(nbt.parse);
const writeAsync = promisify(nbt.writeUncompressed);

module.exports.readLevel = function(path) {
  return fs.readFile(path)
    .then(data => parseAsync(data.slice(8), true)
    .then(nbt.simplify));
}

module.exports.writeLevel = function(path, value) {
  return writeAsync(data, true)
    .then(data => {
      const buf = new Buffer(8);
      buf.writeUInt32LE(3, 0);
      buf.writeUInt32LE(data.length,4);
      return fs.writeFile(path, Buffer.concat(buf,data))
    });
}
