import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    // './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/**/*.js`,
      watched: false,
      served: true,
      included: true
    },
    {
      pattern: `./${config.dir_test}/stubs/sounds/*.mp3`,
      watched: false,
      served: true,
      included: false,
      nocache: false
    }
  ],
  proxies: {
    '/sounds/': '/base/tests/stubs/sounds/'
  },
  hostname: '0.0.0.0',
  singleRun: !argv.watch,
  frameworks: ['mocha', 'chai-sinon', 'chai-as-promised', 'chai-immutable', 'chai'],
  preprocessors: {
    [`${config.dir_test}/**/*.js`]: ['webpack']
  },
  reporters: ['mocha', 'notify'],
  mochaReporter: {
    ignoreSkipped: true,
    colors: {
      success: 'green',
      info: 'white',
      warning: 'yellow',
      error: 'bgCyan'
    }
  },
  browsers: ['Chrome', 'Firefox'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins
      .filter(plugin => !plugin.__KARMA_IGNORE__),
    module: {
      loaders: webpackConfig.module.loaders
    },
    sassLoader: webpackConfig.sassLoader,
    toolbox: webpackConfig.toolbox,
    node: {
      fs: 'empty'
    }
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta'
  }]
}

export default (cfg) => cfg.set(karmaConfig)
