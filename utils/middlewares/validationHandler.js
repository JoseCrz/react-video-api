const boom = require('@hapi/boom')
const joi = require('@hapi/joi')

const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data)
  return error
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