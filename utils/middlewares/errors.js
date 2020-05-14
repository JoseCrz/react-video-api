const boom = require('@hapi/boom')

const config = require('../../config')

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack }
  }

  return error

}

const errorLogger = (error, req, res, next) => {
  console.log(error)
  next(error)
}

const errorWrapper = (error, req, res, next) => {
  if (!error.isBoom) {
    next(boom.badImplementation(error))
  }

  next()
}

const errorHandler  = (error, req, res, next) => { //eslint-disable-line
  const { output: { statusCode, payload }} = error
  res.status(statusCode)
  res.json(withErrorStack(payload, error.stack))
}

module.exports = { 
  errorLogger,
  errorWrapper,
  errorHandler
}