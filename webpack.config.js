var path = require('path')

var webpack = require('webpack')

var pkg = require('./package.json')

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.BannerPlugin(
    pkg.name + ' ' + pkg.version + ' - ' + pkg.homepage + '\n' +
    pkg.license + ' Licensed'
  )
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
    ]
  },
  output: {
    filename: pkg.name + (process.env.NODE_ENV === 'production' ? '.min.js' : '.js'),
    library: pkg.standalone,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router'
    }
  }],

  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
}
