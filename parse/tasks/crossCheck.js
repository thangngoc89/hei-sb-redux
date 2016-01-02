'use strict'

var path = require('path')
var fs = require('fs-extra')
var Parse = require('parse/node')
var parseKey = require('../config')
var _ = require('lodash')

/* Read codes in code.txt */
var code1 = []
var rl = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'data/code.txt'))
})

rl.on('line', function (line) {
  code1.push(line)
}).on('close', function () {
  readCode2()
})

/* Read codes in code-2.txt */
var code2 = []
var readCode2 = function () {
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname, 'data/code-2.txt'))
  })

  rl.on('line', function (line) {
    code2.push(line)
  }).on('close', function () {
    crossCheck()
  })
}

/* Merge 2 array */
var crossCheck = function () {
  var codes = code1.concat(code2)
  // Make a unique array from codes
  var check = _.uniq(codes)
  // Make sure codes and check array length are equal
  console.log('After ' + check.length)
  console.log('Before ' + codes.length)
}
