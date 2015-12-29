var _path = require('path')
var fs = require('fs')
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)
// Get sould file path from word
// basically start of file name
var getSoundFilePath = function (word) {
  var regex = new RegExp('^(' + word + ')')

  var path = _path.join(__dirname, 'data/sound')
  var files = fs.readdirSync(path)

  for (var i = 0; i < files.length; i++) {
    if (regex.test(files[i])) {
      var returnPath = _path.join(__dirname, 'data/sound', files[i])
      return returnPath
    }
  }
  throw new Error('Cannot find ' + word + ' audio file')
}

var WordObject = Parse.Object.extend('Word')
var query = new Parse.Query(WordObject)
query.limit(200)
query.find().then(
  function (res) {
    if (res.length > 0) {
      renameFile(res)
    }
  },
  function (err) {
    console.error('Nah! Error while getting words')
    console.error(err)
  })

var renameFile = function (res) {
  for (var i = 0; i < res.length; i++) {
    doRenameFile(res[i])
  }
}

var doRenameFile = function (word) {
  word = word.get('word') // Remove parse object
  var oldPath = getSoundFilePath(word)
  if (typeof oldPath !== 'string') {
    return
  }

  var newPath = _path.join(__dirname, 'data/sound', word + '.mp3')
  fs.rename(oldPath, newPath, function () {
    console.log('Renamed :' + word + '.mp3')
  })
}
