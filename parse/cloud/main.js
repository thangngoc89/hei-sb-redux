var wordList = require('cloud/functions/wordList')
var checkCode = require('cloud/functions/checkCode')

Parse.Cloud.useMasterKey()

Parse.Cloud.define('checkCode', checkCode)
Parse.Cloud.define('wordList', wordList)
