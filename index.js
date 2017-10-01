'use strict'

var defaults = require('lodash.defaultsdeep')
var boundingBox = require('vertices-bounding-box')
var mat4 = require('gl-mat4')
var tform = require('geo-3d-transform-mat4')
var geoconv = require('geo-convert-position-format')

module.exports = function center (positions, opts) {
  // Set some defaults.
  opts = opts || {}
  opts = defaults(opts, {
    center: [0, 0, 0]
  })

  positions = geoconv.convert(positions, geoconv.ARRAY_OF_ARRAYS)
  // Calculate the bounding box.
  var bb = boundingBox(positions)

  // Translate the geometry center to the origin.
  var _translate = [
    -0.5 * (bb[0][0] + bb[1][0]) + opts.center[0],
    -0.5 * (bb[0][1] + bb[1][1]) + opts.center[1],
    -0.5 * (bb[0][2] + bb[1][2]) + opts.center[2]
  ]
  var translate = mat4.create()
  mat4.translate(translate, translate, _translate)
  var centered = tform(positions, translate)

  return centered
}
