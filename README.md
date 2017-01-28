# bem-proxy

Pure proxy server to render bemjson with bemhtml onto plain html and so on (BEM).

[![Build Status](https://travis-ci.org/zxqfox/bem-proxy.png?branch=master)](https://travis-ci.org/zxqfox/bem-proxy)

## Installation

```sh
npm install
npm test
```

## Usage

```js
const http = require('http');

const BemProxy = require('bem-proxy');

const app = BemProxy({
    templates: require('./common.bemhtml.js'),
    target: 'http://127.0.0.1:8087',
    listen: '3333'
});

app.on('listen', address => {
    console.log('Proxy server listening on ' + (address.port ? 'port ' + address.port : address));
```

## License

MIT
