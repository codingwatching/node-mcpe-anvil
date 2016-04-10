'use strict';
var Anvil = require('../index').Anvil;

const anvil = new Anvil('../world/db');
anvil.loadRaw(12, 4, 0x30).then(data => console.log(data));
anvil.close();
