
var bemRender = require('lib/bem-render-middleware')
  , httpProxy = require('http-proxy');

exports.createServer = function (path, port, host) {
    port = port || 80;
    host = host || 'localhost';
    return httpProxy.createServer(
        bemRender.bundles(path),
        function (req, res, next) {
            res.setHeader('X-Powered-By', 'bem-proxy');
            next();
        },
        port, host
    );
};
