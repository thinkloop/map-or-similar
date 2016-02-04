# Map Or Similar
A JavaScript Map() or Similar() object polyfill if Map is not available.
Supports complex objects for keys.
Highly performant.
No dependencies.
Made for the browser and nodejs.

## Install
```javascript
npm install map-or-similar --save
```

## Use
Supports the following methods and properties identically to Map():

```Slim
set(key, val)     : Sets a value to a key. Key can be a complex object, array, etc.
get(key)          : Returns the value of a key.
has(key)          : Returns true if the key exists, otherwise false.
delete(key)       : Deletes a key and its value.
forEach(callback) : Invokes callback(val, key, object) once for each key-value pair in insertion order.
size              : Returns the number of keys-value pairs.
```

```javascript
var MapOrSimilar = require('map-or-similar');
var mapOrSimilar = new MapOrSimilar();
var complexKey = { prop: 'a complex object as key' };

mapOrSimilar.set(complexKey, 'my value'); // sets value of complex key { prop: 'a complex object as key' } to 'my value'
mapOrSimilar.get(complexKey); // returns 'my value'
mapOrSimilar.has(complexKey); // returns true
mapOrSimilar.size // returns 1
mapOrSimilar.forEach((val, key) => { /* iterates once in this case, val is 'my value', key is { prop: 'a complex object as key' }*/ });
mapOrSimilar.delete(complexKey); // deletes key/value
mapOrSimilar.size // returns 0
```

Does not support other Map methods or properties.

## Test
```javascript
npm run test
```

## License

Released under an MIT license.