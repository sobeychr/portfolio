# Portfolio/widgets

## Introduction

Various methods to import front-end widgets to the DOM.

## Setup

1. `npm i` to install dependencies
2. create `.env` by duplicating `.env.development`
3. `npm run dev` to run localhost

**Important**
Make sure your virtual host is added for custom `SERVER_HOST`

* Windows: C:\Windows\System32\drivers\etc\hosts
* Mac: /private/etc/hosts
* Linux: /etc/hosts

```
127.0.0.1 localhost test-widgets.local my-custom-domain.env
```

## ENV Configs
* `SERVER_HOST: string` name of the test environment, ex `'localhost', 'test-mall.local', 'my-custom-domain.env'`
* `SERVER_PORT: int` port number of the test environment

## Common bugs

1. Localhost does not launch
   * make sure you have added your vitual host
   * if `SERVER_OPEN=0`, open the browser manually
   * double check typo errors `'localhsot:3000' vs 'localhost:3000'`
   * always read the console tab

### Pages

1. `http://test-widgets.local:3000/` home page, explains the basics
2. `http://test-widgets.local:3000/solidjs` base widget page, explains the core widget
3. `http://test-widgets.local:3000/subchild` sub-child page, a parent widget loading the base widget
4. `http://test-widgets.local:3000/backend` back-end page, widget is loaded by back-end and mounted by front-end
