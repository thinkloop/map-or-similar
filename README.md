# Map Or Similar
Returns a JavaScript Map() or a Similar() object if Map is not available.
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

```
set(key, val): Sets a value to a key. Key can be a complex object, array, etc.
get(key)     : Returns the value of a key.
has(key)     : Returns true if the key exists, otherwise false.
delete(key)  : Deletes a key and its value.
size         : Returns a count of keys-value pairs.
```

```javascript
var MapOrSimilar = require('map-or-similar');
var mapOrSimilar = new MapOrSimilar();

mapOrSimilar.set({ prop: 'a complex object as key '}, 'a value');
mapOrSimilar.get({ prop: 'a complex object as key '}); // returns 'a value'
mapOrSimilar.has({ prop: 'a complex object as key '}); // returns true
mapOrSimilar.size // returns 1
mapOrSimilar.delete({ prop: 'a complex object as key '}); // deletes item
```

Does not support any other Map() methods or properties.

## Test
```javascript
npm run test
```