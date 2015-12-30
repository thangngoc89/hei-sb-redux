var wordList = require('cloud/functions/wordList')
var checkCode = require('cloud/functions/checkCode')
var sendAnswers = require('cloud/functions/sendAnswers')
var beforeSaveCode = require('cloud/hooks/beforeSaveCode')
var afterSaveResult = require('cloud/hooks/afterSaveResult')
var updateLeaderboard = require('cloud/jobs/updateLeaderboard')
Parse.Cloud.useMasterKey()

Parse.Cloud.define('checkCode', checkCode)
Parse.Cloud.define('wordList', wordList)
Parse.Cloud.define('sendAnswers', sendAnswers)

// Check for duplicate code before save
Parse.Cloud.beforeSave('Code', beforeSaveCode)
Parse.Cloud.afterSave('Result', afterSaveResult)

Parse.Cloud.job('updateLeaderboard', updateLeaderboard)
