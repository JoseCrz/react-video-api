const validate = () => {
  return false
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema)

    if (error) {
      return next(new Error(error))
    }

    return next()
  }
}