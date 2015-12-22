var helpers = require('cloud/helpers')

module.exports = function (req, res) {
  // TODO: Check for valid token
  // increment statistic
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
}
