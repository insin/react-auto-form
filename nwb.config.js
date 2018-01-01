module.exports = {
  type: 'react-component',
  npm: {
    umd: {
      externals: {
        react: 'React'
      },
      global: 'AutoForm',
    }
  }
}
