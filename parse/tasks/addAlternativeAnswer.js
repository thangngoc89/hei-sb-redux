var _ = require('lodash')
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)

var words = ['judgement', 'sterilize', 'immunize']
var alters = ['judgment', 'sterilise', 'immunise']

console.log('??')
var query = new Parse.Query('Word')
query.containedIn('word', words)
query.find()
.then(function (results) {
  var promises = []
  _.each(results, function(result) {
    var pos = words.indexOf(result.get('word'))
    result.set('alternative', alters[pos])
    promises.push(result.save())

    return Parse.Promise.when(promises)
  })
})
.then(function () {
  console.log('done')
})
.then(null, function (err) {
  console.error(err)
})
