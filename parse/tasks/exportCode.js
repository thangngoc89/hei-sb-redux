var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)

var processIt = function (result) {
  console.log('Print result')
  if (result.length === 0) {
    return
  }

  for (var i = 0; i < result.length; i++) {
    result[i].set('isPrinted', true)
    console.log(result[i].get('code'))
  }

  /* Batch Update isPrinted status */
  Parse.Object.saveAll(result)
  .then(function () {
    console.log('success')
  })
  .then(null, function (err) {
    console.log('error')
    console.log(err)
  })
}

var query = new Parse.Query('Code')
query.equalTo('isValid', true)
query.doesNotExist('isPrinted')
query.limit(150)
query.find()
.then(processIt)
.then(null, function (error) {
  console.error('Oops!')
  console.error(error)
})
