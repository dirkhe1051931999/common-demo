'use strict'
const path = require('path')
const packageConfig = require('../package.json')
module.exports = {
  resolve: function(dir) {
    return path.join(__dirname, '..', dir)
  },
  createNotifierCallback: function() {
    const notifier = require('node-notifier')
    return (severity, errors) => {
      if (severity !== 'error') return
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || ''
      })
    }
  }
}
