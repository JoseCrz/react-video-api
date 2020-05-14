const boom = require('@hapi/boom')

const validate = () => {
  return false
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema)

    if (error) {
      return next(boom.badRequest(error))
    }

    return next()
  }
}

module.exports = validationHandler