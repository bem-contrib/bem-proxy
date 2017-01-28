const http = require('http');
const EventEmitter = require('events');

const httpProxy = require('http-proxy');
const httpProxyMitm = require('http-proxy-mitm');

/**
 * Creates a server that proxies requests and applies templates to bemjson if need
 *
 * @param {Object} opts
 * @returns {EventEmitter}
 */
module.exports = function(opts) {
    const ee = new EventEmitter;
    const templates = opts.templates;

    // Create a proxy server with custom application logic
    const proxy = httpProxy.createProxyServer(Object.assign({
        headers: { 'X-Proxied-By': 'bem-proxy' }
    }, opts));

    // Apply templates on `x-content-type: x-bemjson`
    proxy.on('proxyRes', httpProxyMitm({
        condition: (pRes) => (pRes.statusCode === 200 && pRes.headers['x-content-type'] === 'application/x-bemjson'),
        bodyTransform: function(body) {
            try {
                return templates.apply(JSON.parse(body));
            } catch (e) {
                ee.emit('error', e);
                return e.stack + '<br>' + body;
            }
        }
    }));

    // Create your custom server and just call `proxy.web()` to proxy
    // a web request to the target passed in the options
    // also you can use `proxy.ws()` to proxy a websockets request
    const server = http.createServer(function(req, res) {
        ee.emit('data', { req, res });
        proxy.web(req, res, {}, e => {
            ee.emit('error', e);
        });
    });

    opts.listen && server.listen(opts.listen, () => {
        ee.emit('listen', server.address());
    });

    ee.emit('data', { proxy, server });

    return ee;
};
