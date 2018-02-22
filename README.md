# The HTTP Router

Router for [the-http](https://github.com/zhaoyao91/the-http).

## Install

```
npm install --save the-http-router
```

## Usage

```
const {listen} = require(
const route = require('the-http-router')

const hanlder = route([
  ['GET', '/hello' () => Response.withTextBody('hello world')],
  [['GET', POST'], '/hi/:name', (request) => Response.withTextBody(`hi ${request.params.name}`),
])

listen(3000)(handler)
```

## API

### route(routes, options?)

- `{Array} routes` - item is [method, path, handler]
  - `handler` is THHandler
  - `request.params` is added to hold route params
  - see [find-my-way](https://github.com/delvedor/find-my-way) to learn more about `method` and `path`
- `{Object} [options]`
  - `{function} [options.defaultHandler]`



## License MIT