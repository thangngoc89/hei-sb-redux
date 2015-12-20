var Parse = require('parse/node')

Parse.initialize('wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX', 'UuxpC6qz6NeU8pauVnzZ7gp9mViPMR3UeUx9K4Fd')

var CodeObject = Parse.Object.extend('Code')

var codeList = []
for(var i = 0; i < 1000; i++) {
  var code = new CodeObject()
  codeList.push(code)
  console.log('Generated ' + (i+1) + ' code(s)')
}

console.log('Saving codes to Parse Cloud')

Parse.Object.saveAll(codeList, {
  success: function() {
    console.log('done')
  },
  error: function(objs) {
    console.error(objs)
  }
})
