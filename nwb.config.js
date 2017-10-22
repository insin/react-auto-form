module.exports = {
  type: 'react-component',
  build: {
    umd: true,
    global: 'AutoForm',
    externals: {
      react: 'React'
    }
  }
}
