'use strict'

const ghpages = require('gh-pages')
const debug = require('debug')('app:bin:deploy')
const path = require('path')

debug('Start deployment process.')
ghpages.clean()
ghpages.publish(path.join(__dirname, '../dist'), {
  repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/thangngoc89/hei-sb-redux.git',
  silent: true
}, callback)

var callback = function (err) {
  if (err) {
    debug(err)
    return
  }
  debug('Finish')
}
