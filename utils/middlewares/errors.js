const config = require('../../config')

const withErrorStack = ({ message, stack }) => {
  if (config.dev) {
    return { message, stack }
  }

  return message

}

const errorLogger = (error, req, res, next) => {
  console.log(error)
  next(error)
}

const errorHandler  = (error, req, res, next) => { //eslint-disable-line
  res.status(error.status || 500)
  res.json(withErrorStack(error))
}

module.exports = { errorLogger, errorHandler}