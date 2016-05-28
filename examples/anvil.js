'use strict';
var Anvil = require('../index').Anvil;
var Vec3 = require('vec3');

const anvil = new Anvil('./world/db');
anvil
  .load(2, 4, 0x30)
  .then(chunk => {
    console.log(chunk.dump());
    return chunk;
  })
  .then(chunk => {
    chunk.setBlock(new Vec3(1,1,1), {type: 2, light: 15, skyLight: 15});
    return anvil.save(2, 4, 0x30, chunk);
  })
  .then(() => anvil.load(2,4,0x30))
  .then(chunk => {
    console.log(chunk.dump());
    anvil.close();
  });
