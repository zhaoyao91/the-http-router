const createRouter = require('find-my-way')
const {Response} = require('the-http')

/**
 * @param {Array} routes - [method, path, handler]
 * @param {Object} [options]
 * @param {function} [options.defaultHandler]
 * @return routerHandler
 */
module.exports = function route (routes, options) {
  let matchedHandler = null
  let matchedParams = null

  const defaultHandler = getDefaultHandler(options)

  const router = createRouter({defaultRoute: emptyFunc})

  routes.forEach(([method, path, handler]) => router.on(method, path, (req, res, params) => {
    matchedHandler = handler
    matchedParams = params
  }))

  return function routerHandler (request) {
    router.lookup(request)

    request.params = matchedParams
    const handler = matchedHandler
    matchedParams = null
    matchedHandler = null

    if (handler !== null) return handler(request)
    else return defaultHandler(request)
  }
}

function emptyFunc () {}

function getDefaultHandler (options) {
  if (options && options.defaultHandler) return options.defaultHandler
  else return defaultHandler
}

function defaultHandler (request) {
  return Response.withStatusCode(404)
}
