import webpack from 'webpack'
import cssnano from 'cssnano'
import pxtorem from 'postcss-pxtorem'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../../config'
import _debug from 'debug'
const paths = config.utils_paths
const debug = _debug('app:webpack:_base')

debug('Create configuration.')
const CSS_LOADER = !config.compiler_css_modules
  ? 'css-loader?sourceMap'
  : [
    'css-loader?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=' + config.compiler_css_hash,
  ].join('&')

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      paths.base(config.dir_client) + '/app.js'
    ],
    vendor: config.compiler_vendor
  },
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    // http://stackoverflow.com/a/25426019
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.js', '.jsx', 'scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: '_cache/babel',
          plugins: ['transform-runtime', 'add-module-exports'],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  // omit HMR plugin by default and _only_ load in hot mode
                  transforms: [{
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            }
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          CSS_LOADER,
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        // TODO: Fix this (Monkey patching to not apply localIdent to vendor css)
        test: /global\.loader$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          CSS_LOADER,
          'postcss-loader'
        ]
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" },
      { test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' },
      /* eslint-enable */
      { test: /\.md$/, loader: "html!markdown?gfm=false" }
    ]
  },
  sassLoader: {
    includePaths: [
      paths.client('styles'),
      paths.base('node_modules'),
      paths.base('src')
    ]
  },
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      }
    }),
    pxtorem()
  ],
  eslint: {
    configFile: `${paths.base()}/.eslintrc`
  }
}

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor']
})
commonChunkPlugin.__KARMA_IGNORE__ = true

webpackConfig.plugins.push(commonChunkPlugin)

export default webpackConfig
