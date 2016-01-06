var _ = require('underscore')
const INVALID_DATA_STRUCTURE = 'INVALID_DATA_STRUCTURE'
const NOT_ENOUGH_PARAMETERS = 'NOT_ENOUGH_PARAMETERS'
const PARAMETER_MUST_NOT_BE_NULL = 'PARAMETER_MUST_NOT_BE_NULL'

const fields = ['code', 'contestantId']

var resultObject = new Parse.Object.extend('Result')
var contestantQuery = new Parse.Query('Contestant')
var codeQuery = new Parse.Query('Code')

var code, contestant, data
var score = 0

module.exports = function (req, res) {
  var body = JSON.parse(req.body)

  if (!body.data) {
    res.error({
      message: 'This is mostly because you are sending data directly. Please use our application instead',
      type: INVALID_DATA_STRUCTURE
    })
    return
  }

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i]

    if (!_.has(body.data, field)) {
      res.error({
        message: 'Payload must have ' + field + ' field',
        type: NOT_ENOUGH_PARAMETERS
      })
      return
    }

    if (body.data[field] === null || body.data[field] === '') {
      res.error({
        message: field + ' field must not be null',
        type: PARAMETER_MUST_NOT_BE_NULL
      })
      return
    }
  }

  data = body.data

  codeQuery.get(data.code)
  .then(setCodeAndQueryContestant)
  .then(setContestant)
  .then(calculateScore)
  .then(saveResult)
  .then(function () {
    // Catch all success
    res.success({score: score})
  }).then(null, function(err) {
    // Catch all error
    if (typeof err === 'string') {
      res.error('Error: ' + err)
      return
    }
    console.error(err)
    res.error('error')
  })
}

var setCodeAndQueryContestant = function (result) {
  code = result
  // TODO: Check if code is match
  return contestantQuery.get(data.contestantId)
}

var setContestant = function (result) {
  contestant = result
}

var saveResult = function () {
  var result = new resultObject
  result.set('code', code)
  result.set('contestant', contestant)
  result.set('answers', data.answers)
  result.set('score', score)
  return result.save()
}

var calculateScore = function () {
  var answers = data.answers
  var words = {}
  var query = new Parse.Query('Word')
  query.limit(200)
  return query.find()
  // Generate word list
  .then(function (result) {
    if (result.length > 0) {
      for (var i = 0; i < result.length; i++) {
        var temp = result[i]
        if (typeof temp.get('alternative') === 'string') {
          words[temp.id] = [temp.get('word'), temp.get('alternative')]
        } else {
          words[temp.id] = temp.get('word')
        }
      }
    }
  })
  // Match answers against words list
  .then(function () {
    for (var key in answers) {
      if (answers.hasOwnProperty(key)) {
        var answer = answers[key].trim().toLowerCase()
        // Check if this word have multiple right answers
        if (typeof words[key] === 'object') {
          var rightAnswers = words[key]
          // If this is a right answer then increase score
          if (rightAnswers.indexOf(answer) > -1) {
            score++
          }
        } else if (answer === words[key]) {
          score++
        }
      }
    }
    return score
  })
}
