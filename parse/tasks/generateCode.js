var _ = require('lodash')
var randomstring = require("randomstring")
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)
var CodeObject = Parse.Object.extend('Code')

// Generate a unique array of code
var codes = []
while (codes.length < 1000) {
  var newRamdomCode = randomstring.generate({
    length: 10,
    readable: true,
    charset: 'QWERTYUPASDFGHJKZXCVBNMqwertyupasdfghjkzxcvbnm23456789'
  })
  codes.push(newRamdomCode)
  codes = _.uniq(codes)
}
console.log('Generated codes')

// Iterate through the array and push it to Parse
var codeList = []
for (var i = 0; i < codes.length; i++) {
  var code = new CodeObject()
  code.set('code', codes[i])
  code.set('isValid', true)
  code.set('isDone', false)
  codeList.push(code)
}

console.log('Saving codes to Parse Cloud')

Parse.Object.saveAll(codeList, {
  success: function () {
    console.log('done')
  },
  error: function (objs) {
    console.error(objs)
  }
})
