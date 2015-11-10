process.env.NODE_ENV = 'test'

var path = require('path')

var webpack = require('webpack')

var isCi = process.env.CONTINUOUS_INTEGRATION === 'true'
var runCoverage = process.env.COVERAGE === 'true' || isCi

var loaders = [
  {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
]

var reporters = ['dots']

if (runCoverage) {
  loaders.push({test: /\.js$/, include: path.resolve('src/'), loader: 'isparta'})
  reporters.push('coverage')
}

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['tap'],
    reporters: reporters,
    coverageReporter: {
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: '.'}
      ]
    },
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/*-test.js'
    ],
    preprocessors: {
      'test/*-test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      node: {
        fs: 'empty'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      resolve: {
        alias: {
          'src': path.resolve(__dirname, 'src')
        }
      },
      module: {
        loaders: loaders
      }
    },
    webpackServer: {
      noInfo: true
    },
    singleRun: isCi
  })
}
