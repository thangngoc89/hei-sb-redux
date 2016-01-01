require('babel-register')

const config = require('../config')
const debug = require('debug')('app:bin:compile')
const fs = require('fs-extra')
const paths = config.utils_paths

debug('Create webpack compiler.')

const compiler = require('webpack')(require('../build/webpack'))

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString(config.compiler_stats))

  // Write stats.json to file for analyse
  if (config.compiler_save_stats) {
    const saveTo = paths.base('stats.json')

    fs.writeFile(saveTo, JSON.stringify(jsonStats), () => {
      debug('Written Webpack compile status to stats.json')
    })
  }

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')

    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  } else {
    debug('No errors / warnings encountered.')
  }

  debug('Copy index.html to 200.html')
  fs.copySync(paths.dist('index.html'), paths.dist('200.html'))
})
