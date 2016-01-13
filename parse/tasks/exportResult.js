'use strict'
require('babel-register')
/**
 * Export result from Parse
 * including Result and Contestant class
 */
const debug = require('debug')('parse:task:exportResult')
const _ = require('lodash')

/**
 * Helper functions
 */
const isNil = (v) => {
  return (v === undefined) || (v === null)
}
const convertMS = (ms) => {
 if (isNil(ms)) return ms
 let m, s
 s = Math.floor(ms / 1000)
 m = Math.floor(s / 60)
 s = s % 60
 s = (s < 10) ? `0${s}` : s
 return `${m}:${s}`
}

/**
 * I/O stuff
 */
const fs = require('fs-extra')
const path = __dirname + '/../../dist/result.csv'
fs.removeSync(path)
const file = fs.createWriteStream(path)
file.on('error', (err) => debug(err))

const saveToDisk = (data) => {
  file.write('id,name,university,dateOfBirth,email,phone,score,time\n')
  _.map(data, (row) => {
    let arr = [
      row.id,
      row.get('contestant').get('name'),
      row.get('contestant').get('university'),
      row.get('contestant').get('dateOfBirth'),
      row.get('contestant').get('email'),
      row.get('contestant').get('phone'),
      row.get('score'),
      convertMS(row.get('time'))
    ]
    arr = _.map(arr, (l) => {
      return `"${l}"`
    })
    file.write(arr.join(',') + '\n')
  })
}

/**
 * Parse stuff
 */
const Parse = require('parse/node')
const parseKey = require('../config')
Parse.initialize(parseKey.applicationId, parseKey.jsKey)

const query = new Parse.Query('Result')

query.limit(500)
query.include('contestant')
query.descending('score')
query.addAscending('time')
query.find()
.then(saveToDisk)
.then(() => {
  file.end()
})
.then(() => {
  debug('Finish')
})
.then(null, (err) => debug(err))
