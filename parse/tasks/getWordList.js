var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('task:getWordList')
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)

var file = fs.createWriteStream(path.join(__dirname, 'data/wordId.txt'))
file.on('error', function (err) {
  debug('Error while read file')
  debug(err)
})

var query = new Parse.Query('Word')
query.ascending('word')
query.limit(120)
query.find()
.then(function (results) {
  _.map(results, function (word) {
    var line = word.id + ',' + word.get('word') + '\n'
    file.write(line)
  })
})
.then(function () {
  file.end()
  debug('done')
})
