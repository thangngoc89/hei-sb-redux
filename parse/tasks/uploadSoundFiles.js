var getSoundFileData = require('./getSoundFileData')
var randomstring = require("randomstring")
var Parse = require('parse/node')
var parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)
var WordObject = Parse.Object.extend('Word')

var query = new Parse.Query(WordObject)
// query.equalTo('soundFile', undefined)
query.limit(200) // We only have 120 words. 200 should be fine
query.find().then(
  function (res) {
    if (res.length > 0) {
      uploadFile(res)
    }
  },
  function (err) {
    console.log('Error while fetching word records')
    console.log(err)
  }
)

var uploadFile = function (res) {
  for (var i = 0; i < res.length; i++) {
    doUploadFile(res[i])
  }
}

var doUploadFile = function (object) {
  var word = object.get('word')
  console.log('Processing ' + word)
  var fileData = getSoundFileData(word)
  // Generate a random file name here
  var randomFilename = randomstring.generate(10) + '.mp3'
  var parseFile = new Parse.File(randomFilename, fileData)

  parseFile.save().then(function () {
    return parseFile
  }, function (err) {
    console.log('Error while save file' + word + 'to Parse')
    console.log(err)
  }).then(function (parseFile) {
    object.set('soundFile', parseFile)
    return object.save()
  }).then(function (res) {
    console.log('Object saved:' + word)
  }, function (error) {
    console.error('Error while saving object' + error)
  })
}
