'use strict';

var leveldb = require('leveldb-mcpe');

function generateNetherKey(x, z, type) {
  var buf = new Buffer(13);
  buf.writeUInt32LE(x, 0);
  buf.writeUInt32LE(z, 4);
  buf.writeUInt32LE(1, 8)
  buf.writeInt8(type, 12);
  return buf;
}

function generateKey(x, z, type) {
  var buf = new Buffer(9);
  buf.writeUInt32LE(x, 0);
  buf.writeUInt32LE(z, 4);
  buf.writeInt8(type, 8);
  return buf;
}

class Anvil {
  constructor(path) {
    this.path = path;
    leveldb.open(this.path);
  }

  loadRaw(x, z, type) {
    return Promise.resolve(new Buffer(leveldb.get(generateKey(x, z, type).toString()),"ascii"));
  }

  saveRaw(x, z, type, data) {
    leveldb.put(generateKey(x, z, type).toString(), data);
    return Promise.resolve();
  }

  loadNetherRaw(x, z, type) {
    return Promise.resolve(new Buffer(leveldb.get(generateNetherKey(x, z, type).toString()),"ascii"));
  }

  saveNetherRaw(x, z, type, data) {
    leveldb.put(generateNetherKey(x, z, type).toString(), data);
    return Promise.resolve();
  }

  close() {
    leveldb.close();
  }
}

module.exports = Anvil;
