module.exports = {
  type: 'react-component',
  babel: {
    loose: 'all'
  },
  karma: {
    tests: 'test/**/*-test.js',
    frameworks: [
      require('karma-tap')
    ]
  },
  umd: true,
  global: 'AutoForm',
  externals: {
    react: 'React'
  },
  jsNext: true
}
