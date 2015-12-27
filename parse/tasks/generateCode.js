var Parse = require('parse/node')
var randomstring = require("randomstring")

Parse.initialize('wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX', 'UuxpC6qz6NeU8pauVnzZ7gp9mViPMR3UeUx9K4Fd')

var CodeObject = Parse.Object.extend('Code')

var codeList = []
for (var i = 0; i < 100; i++) {
  var code = new CodeObject()
  var newRandomCode = randomstring.generate({
    length: 10,
    readable: true,
    charset: 'QWERTYUPASDFGHJKZXCVBNMqwertyupasdfghjkzxcvbnm23456789'
  })
  code.set('code', newRandomCode)
  code.set('isValid', true)
  code.set('isDone', false)
  codeList.push(code)
  console.log('Generated ' + (i + 1) + ' code(s)')
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
