# geo-center

Centers vertices around a point.

[Demo](http://wwwtyro.github.io/geo-center/)

## Install

```sh
npm install geo-center
```

## Example

```js
var dragon = require('stanford-dragon/3')
var center = require('geo-center')

dragon.positions = center(dragon.positions, {
  center: [0,0,0]
})

```

## API

```js
var center = require('geo-center')
```

#### `var centeredPositions = center(positions, opts)`

Returns a copy of `positions` centered around `opts.center`.

`positions` is the vertex array for your mesh. It can be any of:

* Flat array `[1,2,3,4,5,6]`
* Array of arrays `[[1,2,3], [4,5,6]]`
* TypedArray `new Float32Array([1,2,3,4,5,6])`
* Array of TypedArrays `[new Float32Array([1,2,3]), new Float32Array([4,5,6])]`
* [ndarray](https://www.npmjs.com/package/ndarray) `ndarray(new Float32Array([1,2,3,4,5,6]))`

`opts` is an object that can have the following properties:
* `center` is the point you want your mesh centered upon. Defaults to `[0,0,0]`.
