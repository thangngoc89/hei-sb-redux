'use strict'

var path = require('path')
var fs = require('fs-extra')
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)
var codeObject = Parse.Object.extend('Code')
/* Read codes in code.txt */
var codes = []

var rl = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'data/code.txt'))
})

rl.on('line', function (line) {
  codes.push(line)
}).on('close', function () {
  processing(codes)
})

/* Split codes into block of 50 */
var processing = function (codes) {
  for (let i = 0; i < 10; i++) {
    let codeBlock = codes.slice(i * 50, (i + 1 ) * 50)
    processCodeBlock(codeBlock)
  }
}

/* Process code block */
var processCodeBlock = function (codeBlock) {
  let query = new Parse.Query('Code')
  query.containedIn('code', codeBlock)
  query.find()
  .then(function (result) {
    // Change isPrinted status
    for (let j = 0; j < result.length; j++) {
      result[j].set('isPrinted', true)
    }
    // Batch save 'em all
    return Parse.Object.saveAll(result)
  })
  .then(function () {
    console.log('success')
  })
  .then(null, function (err) {
    console.log('error')
    console.log(err)
  })
}
