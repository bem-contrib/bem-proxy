
var bemRender = require('lib/bem-render-middleware')
  , httpProxy = require('http-proxy');

httpProxy.createServer(
    bemRender.bundles('pages'),
    function (req, res, next) {
        res.setHeader('X-Powered-By', 'bem-proxy');
        next();
    },
    80, 'localhost'
).listen(process.env.NODE_PORT);
