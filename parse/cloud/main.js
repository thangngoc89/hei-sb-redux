var helpers = require('cloud/helpers')

Parse.Cloud.define('hello', function (request, response) {
  response.success('Hello world!')
})

Parse.Cloud.define('wordList', function (req, res) {
  var indexes = helpers.getRandomNumbers(30, 1, 120)

  var query = new Parse.Query('Word')
  query.containedIn('index', indexes)
  query.find({ useMasterKey: true })
      .then(function (result) {
        var wordList = result.map(function (word) {
          return {
            word: word.get('word'),
            id: word.id,
            soundFile: word.get('soundFile').url()
          }
        })

        res.success(wordList)
      }, function (error) {
        res.error({
          message: 'Get random word list failed',
          error: error
        })
      })
})

// Set Code isValid and isDone value
Parse.Cloud.beforeSave('Code', function (request, response) {
  if (!request.object.get('isValid')) {
    request.object.set('isValid', true)
  }

  if (!request.object.get('isDone')) {
    request.object.set('isDone', false)
  }

  response.success()
})
