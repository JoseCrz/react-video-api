const config = require('../config')

const cacheResponse = (res, time) => {
  if(!config.dev) {
    res.set('Cache-Control', `public, max-age=${time}`)
  }
}

module.exports = cacheResponse