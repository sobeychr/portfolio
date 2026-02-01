# Mock-Framework

## Introduction

This is a small exercise to run [Bun](https://bun.com/docs) as a server and to convert it into a framework.

* `blank/` holds a basic Bun server, very close to the example provided in the documentation.
* `mini/` holds a mini framework based on the Bun server. Define your routes, middleware handlers and then launch the server.

### Setup

1. `bun install` to install packages
2. `cp .env.development .env` to create your local environment file
3. `bun run blank` to run the blank server
4. `bun run mini` to run the mini framework

### Configs

* `SERVER_HOST` string - mocked domain name to run the application
* `SERVER_PORT` int - mocked port to run the application

### Testing the server

This requires [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to run on VSCode.
Postman and the web browser can also access the endpoints.

**Via REST Client**

1. Run the server
2. `copy server.dev.rest server.rest` to create your local REST configs
3. Access the different endpoints


## Mini Framework setup

This project was setup with Typescript to allow typehint for configs and handlers.

```javascript
import { CMiddleware, CRoute, CServer } from './framework';

const middleware = new CMiddlware({ // a new middleware instance
  methods: [], // array of METHODS (ALL, GET, POST, OPTIONS, ETC)
  pattern: '', // glob pattern for middleware
  handler, // function triggered when the middleware matches the request
});

const route = new CRoute({ // a new route instance
  methods: [], // array of METHODS (GET, POST, OPTIONS, ETC)
  pattern: '', // glob pattern for route
  handler, // function triggered when the route matches the request
});

const server = new CServer({
  hostname: '', // server hostname as string
  port: 0, // server port as number
  prefix: '', // server prefix allowing sub-paths

  middlewares: [], // array of CMiddlewares
  routes: [], // array of CRoutes

  onNotFound, // function triggered when no route matches the request
});

server.start(); // actually launches the server
```
