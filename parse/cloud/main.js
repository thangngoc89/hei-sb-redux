var wordList = require('cloud/functions/wordList')
var checkCode = require('cloud/functions/checkCode')
var sendAnswers = require('cloud/functions/sendAnswers')
var beforeSaveCode = require('cloud/hooks/beforeSaveCode')

Parse.Cloud.useMasterKey()

Parse.Cloud.define('checkCode', checkCode)
Parse.Cloud.define('wordList', wordList)
Parse.Cloud.define('sendAnswers', sendAnswers)

// Check for duplicate code before save
Parse.Cloud.beforeSave('Code', beforeSaveCode)

// Parse.Cloud.afterSave('Result', function(req) {
//   if (req.object.get('score') !== undefined) {
//     return
//   }
//
//   var answers = req.object.get('answers')
//   var score = 0
//   var words = {}
//   var query = new Parse.Query('Word')
//   query.limit(200)
//   query.find()
//   // Generate word list
//   .then(function (result) {
//     if (result.length > 0) {
//       for (var i = 0; i < result.length; i++) {
//         var temp = result[i]
//         words[temp.id] = temp.get('word')
//       }
//     }
//   })
//   .then(function () {
//     for (var key in answers) {
//       if (answers.hasOwnProperty(key)) {
//         var answer = answers[key].trim().toLowerCase()
//         if (answer === words[key]) {
//           score++
//         }
//       }
//     }
//   })
//   .then(function () {
//     req.object.set('score', score)
//     return req.object.save()
//   })
//   .then(null, function (error) {
//     console.error('There was an error happen while saving score')
//     console.error(error)
//   })
// })
