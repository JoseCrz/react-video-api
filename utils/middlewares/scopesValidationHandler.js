const boom = require('@hapi/boom')

const scopesValidationHandler = allowedScopes => {
  return (req, res, next) => {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing Scopes'))
    }

    const hasAccess = allowedScopes.map(allowedScope => req.user.scopes.includes(allowedScope)).find(allowed => Boolean(allowed))
    
    if (hasAccess) {
      next()
    } else {
      next(boom.unauthorized('Insufficient Scopes'))
    }
  }
}

module.exports = scopesValidationHandler