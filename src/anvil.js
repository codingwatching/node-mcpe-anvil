'use strict';

var leveldb = require('leveldb-mcpe');

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
    return Promise.resolve(leveldb.get(generateKey(x, z, type).toString()));
  }

  saveRaw(x, z, type, data) {
    leveldb.put(generateKey(x, z, type).toString(), data);
    return Promise.resolve();
  }

  close() {
    leveldb.close();
  }
}

module.exports = Anvil;
