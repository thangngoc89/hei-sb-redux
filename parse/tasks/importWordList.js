var Parse = require('parse/node')
Parse.initialize('wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX', 'UuxpC6qz6NeU8pauVnzZ7gp9mViPMR3UeUx9K4Fd')
var WordObject = Parse.Object.extend('Word')

var path = require('path')
var rl = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'data/wordList.csv'))
})

// Index for random word generate
var index = 0

var processLine = function (line) {
  var parts = line.split(',')

  var word = parts[0]

  index++

  return {
    word: word,
    index: index
  }
}

// wordList array for pushing to Parse
var wordList = []

// Read file line by line and save to Parse
rl.on('line', function (line) {
  var word = processLine(line)
  var object = new WordObject(word)

  console.log('Processed ' + word.word)

  wordList.push(object)
}).on('close', function () {
  Parse.Object.saveAll(wordList, {
    success: function (objs) {
      console.log('done')
    },
    error: function (error) {
      console.log(error)
    }
  })
})
