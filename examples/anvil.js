'use strict';
var Anvil = require('../index').Anvil;

const anvil = new Anvil('../world/db');
anvil.loadRaw(2, 4, 0x30).then(data => {
  console.log(data);
  anvil.close();
});
