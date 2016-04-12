node-mcpe-anvil
===============

[![NPM version](https://img.shields.io/npm/v/mcpe-anvil.svg)](http://npmjs.com/package/mcpe-anvil)

LevelDB and NBT storage provider implementation in Node for MCPE

## Anvil API

### Anvil(path)
Build an anvil: provide loading and saving of chunks in all regions in `path`

### Anvil.saveRaw(x, z, type, data)
Takes an MCPE anvil chunk either terrain (`0x30`), tile entity (`0x31`) or entity data (`0x32`) and saves it to the overworld.

### Anvil.loadRaw(x,z, type)
Returns a promise containing the chunk data at x, z or null if that chunk isn't saved

### Anvil.saveNetherRaw(x, z, type)
Takes an MCPE anvil chunk either terrain (`0x30`), tile entity (`0x31`) or entity data (`0x32`) and saves it to the nether.

### Anvil.loadNetherRaw(x, z, type)
Returns a promise containing the chunk data at x, z or null if that chunk isn't saved in the nether

## Level API

### level.readLevel(path)

Writes to a little-endian encoded level.dat file containing the following values (these values are examples from our world, values may vary but names will stay the same):

```javascript
{ DayCycleStopTime: -1,
  GameType: 0,
  Generator: 1,
  LastPlayed: [ 0, 1460319360 ],
  LevelName: 'My World',
  LimitedWorldOriginX: 12,
  LimitedWorldOriginY: 128,
  LimitedWorldOriginZ: 4,
  NetworkVersion: 46,
  Platform: 2,
  RandomSeed: [ 0, 276131071 ],
  SpawnX: 12,
  SpawnY: 128,
  SpawnZ: 4,
  StorageVersion: 4,
  Time: [ 0, 63 ],
  currentTick: [ 0, 63 ],
  eduLevel: 0,
  hasBeenLoadedInCreative: 0,
  lightningLevel: 0,
  lightningTime: 95937,
  rainLevel: 0,
  rainTime: 47937,
  spawnMobs: 1,
  worldStartCount: [ 0, -2 ] }
```

### level.writeLevel(path, value)

Writes to a little-endian encoded level.dat file containing the same values as the example above

## Usage
We've got a couple of examples for you, check [these](https://github.com/mhsjlw/node-mcpe-anvil/tree/master/examples) out

Or check this out:
```javascript
'use strict';
var level = require('../index').level;

level.readLevel('../world/level.dat')
  .then(data => {
    console.log(data);
    level.writeLevel('world/level.dat', data).catch(err => console.log(err.stack));
  });
```
