module.exports = {
  type: 'react-component',
  babel: {
    loose: 'all'
  },
  build: {
    umd: true,
    global: 'AutoForm',
    externals: {
      react: 'React'
    },
    jsNext: true
  }
}
