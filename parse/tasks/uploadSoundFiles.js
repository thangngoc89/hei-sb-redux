var fs = require('fs')
var path = require('path')
var getSoundFileData = require('./getSoundFileData')
var Parse = require('parse/node')
Parse.initialize('wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX', 'UuxpC6qz6NeU8pauVnzZ7gp9mViPMR3UeUx9K4Fd')
var WordObject = Parse.Object.extend('Word')

var query = new Parse.Query(WordObject)
query.equalTo('soundFile', undefined)
// query.limit(1)
query.find().then(
  function(res){
    if (res.length > 0) {
      uploadFile (res)
    }
  },
  function(err){
    console.log("Error while fetching word records")
    console.log(err)
  }
)

var uploadFile = function (res) {
  for (var i = 0; i < res.length; i++) {
    doUploadFile (res[i])
  }
}

var doUploadFile = function (object) {
  var word = object.get('word')
  console.log('Processing ' + word)
  var fileData = getSoundFileData(word)

  var parseFile = new Parse.File(word + '.mp3', fileData)

  parseFile.save().then(function () {
    return parseFile
  }, function(err) {
    console.log('Error while save file' + word + 'to Parse')
    console.log(err)
  }).then(function (parseFile) {
    object.set("soundFile", parseFile)
    return object.save()
  }).then(function(res) {
    console.log('Object saved:' + word)
  }, function(error) {
    console.log('Error while saving object')
  });
}
