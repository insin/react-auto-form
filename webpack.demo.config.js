process.env.NODE_ENV = 'production'

var path = require('path')

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pkg = require('./package.json')

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'demo/src/app.js'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'demo/dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: pkg.name + ' ' + pkg.version + ' Demo'
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?-minimize')},
      {test: /\.(gif|jpe?g|png)$/, loader: 'file?name=[name].[ext]'},
      {test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: 'file?name=[name].[ext]'},
      {test: /\.json$/, loader: 'json'}
    ]
  }
}
