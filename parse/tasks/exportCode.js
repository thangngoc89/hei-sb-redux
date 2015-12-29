var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)

var printResult = function (result) {
  console.log('Print result')
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
query.limit(500)
query.find()
.then(printResult)
.then(null, function (error) {
  console.error('Oops!')
  console.error(error)
})
