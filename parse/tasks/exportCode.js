var Parse = require('parse/node')
Parse.initialize('wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX', 'UuxpC6qz6NeU8pauVnzZ7gp9mViPMR3UeUx9K4Fd')

var printResult = function (result) {
  console.log('Print result')
  console.log(result)
  if (result.length === 0) {
    return
  }

  for (var i = 0; i < result.length; i++) {
    var code = result[i]
    console.log(code.get('code'))
  }
}

var query = new Parse.Query('Code')
query.equalTo('isValid', true)
query.limit(100)
query.find()
.then(printResult)
.then(null, function (error) {
  console.error('Oops!')
  console.error(error)
})
