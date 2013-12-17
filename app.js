
var http = require('http'),
  bemRender = require('lib/bem-render-middleware'),
  httpProxy = require('http-proxy');

httpProxy.createServer(
    bemRender.pages('pages'),
    function (req, res, next) {
        res.setHeader('X-Powered-By', 'bem-proxy');
        next();
    },
    9000, 'localhost'
).listen(8001);

http.createServer(function (req, res) {
    require('fs').readFile('bem-examples/www/pages/example/example.bemjson.js', function (err, data) {
        if (err) {
            res.writeHead(500);
            res.end('Something went wrong: ' + e.message);
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/x-bemjson' });
        res.write(data);
        res.end();
    });
}).listen(9000);

/*
http.createServer(function (req, res) {
    http.get("http://interactive-answers.yandex.ru/api/2.x/site/d89cda99-274e-47be-abe5-ac0ed339a083/search", function (gres) {
        res.writeHead(200, { 'Content-Type': 'application/x-bemjson' });
        res.write('request successfully proxied: ' + req.url +'\n');
        res.write(JSON.stringify(req.headers, true, 2));
        res.write(JSON.stringify(gres.headers, true, 2));
        gres.on('data', function (chunk) {
            res.write(chunk);
        });
        gres.on('end', function (chunk) {
            res.end();
        });
    }).on('error', function (e) {
        res.writeHead(500);
        res.end('Something went wrong: ' + e.message);
    });
}).listen(9000);
*/
