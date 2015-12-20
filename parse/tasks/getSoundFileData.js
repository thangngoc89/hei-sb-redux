var _path = require('path')
var fs = require('fs')

// Get sould file path from word
// basically start of file name
var getSoundFilePath = function (word) {
  var regex = new RegExp('^(' + word + ')')

  var path = _path.join(__dirname, 'data/sound')
  var files = fs.readdirSync(path)

  for (var i = 0; i < files.length; i++) {
    if (regex.test(files[i])) {
      var path = _path.join(__dirname, 'data/sound', files[i])
      return path
    }
  }

  return false
}

// return an object that can be consumed by Parse.File
var getSoundFileData = function (word) {
  var path = getSoundFilePath(word)

  if ( !path ) {
    throw 'Can not find sound file for :' + word
    return
  }

  var fileData = fs.readFileSync(path)
  fileData = Array.prototype.slice.call(new Buffer(fileData), 0)

  return fileData
}

module.exports = getSoundFileData
