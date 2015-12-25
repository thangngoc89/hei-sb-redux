var wordList = require('cloud/functions/wordList')
var checkCode = require('cloud/functions/checkCode')
var sendAnswers = require('cloud/functions/sendAnswers')

Parse.Cloud.useMasterKey()

Parse.Cloud.define('checkCode', checkCode)
Parse.Cloud.define('wordList', wordList)
Parse.Cloud.define('sendAnswers', sendAnswers)
