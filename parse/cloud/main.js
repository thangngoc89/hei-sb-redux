var wordList = require('cloud/functions/wordList')
var checkCode = require('cloud/functions/checkCode')
var sendAnswers = require('cloud/functions/sendAnswers')

Parse.Cloud.useMasterKey()

Parse.Cloud.define('checkCode', checkCode)
Parse.Cloud.define('wordList', wordList)
Parse.Cloud.define('sendAnswers', sendAnswers)

// Check for duplicate code before save
Parse.Cloud.beforeSave('Code', function(req, res) {
  // If this is a update operator
  if (!req.object.isNew()) {
    res.success()
    return
  }

  if (req.object.get('code') === undefined) {
    res.error('Code cannot be undefined')
    return
  }

  if (req.object.get('code').length !== 10) {
    res.error('Code has to have 10 characters')
    return
  }

  var query = new Parse.Query('Code')
  query.equalTo('code', req.object.get('code'))
  query.find()
  .then(function (result) {
    if (result.length !== 0) {
      return Parse.Promise.error('Duplicate code')
    }
  })
  .then(function () {
    res.success()
  })
  .then(null, function () {
    res.error('Duplicate code')
  })
})
