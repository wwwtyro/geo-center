'use strict'

/* global requestAnimationFrame*/

var mat4 = require('gl-mat4')
var Geometry = require('gl-geometry')
var glShader = require('gl-shader')
var glslify = require('glslify')
var dragon = require('stanford-dragon/3')
var Trackball = require('trackball-controller')
var normals = require('normals')

var center = require('../index')

window.onload = function () {
  var canvas = document.getElementById('render-canvas')

  var gl = canvas.getContext('webgl')
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.cullFace(gl.BACK)
  gl.clearColor(0, 0, 0, 0)

  dragon.positions = center(dragon.positions)

  var geometry = Geometry(gl)
    .attr('aPosition', dragon.positions)
    .attr('aNormal', normals.vertexNormals(
      dragon.cells,
      dragon.positions
    ))
    .faces(dragon.cells)

  var view = mat4.create()
  var projection = mat4.create()

  var program = glShader(gl, glslify('./example.vert'), glslify('./example.frag'))

  function render () {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    gl.viewport(0, 0, canvas.width, canvas.height)
    mat4.lookAt(view, [0, 0, 72], [0, 0, 0], [0, 1, 0])
    mat4.perspective(projection, Math.PI / 2, canvas.width / canvas.height, 0.1, 1000.0)

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

    program.bind()
    geometry.bind(program)
    program.uniforms.uModel = trackball.rotation
    program.uniforms.uView = view
    program.uniforms.uProjection = projection
    geometry.draw(gl.TRIANGLES)
    requestAnimationFrame(render)
  }

  var trackball = new Trackball(canvas)

  render()
}
