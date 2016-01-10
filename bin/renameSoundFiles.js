require('babel-register')

const fs = require('fs-extra')
const readline = require('readline')
const config = require('../config')
const paths = config.utils_paths
const debug = require('debug')('app:bin:renameSoundFiles')

module.exports = (function () {
  debug('Copy audio files to dist')
  fs.copySync(paths.base('parse/tasks/data/sound'), paths.dist('sound'))

  debug('Rename audio files')
  const rl = readline.createInterface({
    input: fs.createReadStream(paths.base('parse/tasks/data/wordId.txt'))
  })

  rl.on('line', function (line) {
    const name = line.split(',')
    const oldPath = paths.dist(`sound/${name[1]}.mp3`)
    const newPath = paths.dist(`sound/${name[0]}.mp3`)
    fs.rename(oldPath, newPath, (err) => {
      if (err) debug(err)
    })
  }).on('close', function () {
    debug('Rename audio files complete')
  })
})()
