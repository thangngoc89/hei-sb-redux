var _ = require('underscore')
const INVALID_DATA_STRUCTURE = 'INVALID_DATA_STRUCTURE'
const NOT_ENOUGH_PARAMETERS = 'NOT_ENOUGH_PARAMETERS'
const PARAMETER_MUST_NOT_BE_NULL = 'PARAMETER_MUST_NOT_BE_NULL'

const fields = ['code', 'contestantId']

var resultObject = new Parse.Object.extend('Result')
var contestantQuery = new Parse.Query('Contestant')
var codeQuery = new Parse.Query('Code')

var code, contestant

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

  var data = body.data

  codeQuery.get(data.code)
  .then(setCodeAndQueryContestant)
  .then(setContestant)
  .then(saveResult)
  .then(function () {
    // Catch all success
    res.success('success')
  }).then(null, function(err) {
    // Catch all error
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
  return result.save()
}
