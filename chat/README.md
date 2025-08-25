# Portfolio/chat

## Introduction

Low level chat application.

### Setup

1. `npm i` to install packages
2. `cp .env.development .env` to create your local environment file
3. `npm run dev` to run the application

### Configs

* `AUTH_REFRESH` string - refresh token key
* `AUTH_TOKEN` string - auth token key
* `SERVER_API_DEV` (0 | 1) - 0=disallows API requests outside the domain name, 1=allows API requests outside the domain name
* `SERVER_HOST` string - mocked domain name to run the application
* `SERVER_PORT` int - mocked port to run the application
* `SERVER_TIMEOUT` string - maximum timeout in seconds for responses, ex "5s" = 5 seconds

## Using Mock-API

### Basics

1. launch the application via `npm run dev`
2. access the domain in your browser
3. select either *React* or *Solid* based application
4. login as a mocked user to the chat
5. select the different chat channels on the left

### File structure

* `public` directory are static CSS and images
* `script` directory allows to build the application via ViteJS

* `src/common` are common files used by both React and Solid
* `src/react` are files used only by the React version
* `src/server` are files used only by the server (API endpoints)
* `src/solid` are files used only by the Solid version

* `.env` allows configuring the test environment (copied from *.env.development*)
* `server.rest` allows to test API endpoints (copied from *server.dev.rest*)
