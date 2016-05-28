'use strict';
var level = require('../index').level;

level.readLevel('./world/level.dat')
  .then(data => {
    console.log(data);
    level.writeLevel('world/level.dat', data).catch(err => console.log(err.stack));
  });
