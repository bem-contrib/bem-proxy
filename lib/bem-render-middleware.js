exports.pages = function (path) {
"use strict";

    var bemRenderContentType = 'application/x-bemjson';
    var isBemRenderResponse = function (res) {
        return res.statusCode === 200 && res._headers['content-type'] === bemRenderContentType;
    };

    // todo: precache blocks here

    return function (req, res, next) {

        if ('GET' !== req.method.toUpperCase()) {
            return next();
        }

        // FIXME: drop dat hack ;-(
        var res_writeHead = res.writeHead.bind(res);
        var res_write = res.write.bind(res);
        var res_end = res.end.bind(res);
        var res_error500 = function (title, data) {
            if (!res._headerSent) {
                res.setHeader('Content-Type', 'text/html');
                res_writeHead(500);
            }
            res_write('<h1>500 Internal error</h1><h2>'+title+'</h2><pre>');
            res_write(data);
            res_end();
        };
        res.writeHead = function (code, reason, headers) {
            if (!isBemRenderResponse(res)) {
                // restore default handlers
                res.write = res_write;
                res.writeHead = res_writeHead;
                res.end = res_end;
                return res.writeHead(code, reason, headers);
            }
            // store original status code
            res.statusCode = code;
        };
        // main logic
        var data = [];
        res.write = function (chunk, enc) {
            // collect chunks (can we patch them separately?)
            data.push(chunk.toString());
        };
        res.end = function (a, b, c) {
            var bemjson = data.join('');
            // return res_error500('Invalid bemjson', bemjson);

            if (!res._headerSent) {
                // patch header. it's so dirty ;-(
                res.setHeader('Content-Type', 'text/html');
                res_writeHead(res.statusCode);
            }

            var BEMHTML = require('bem-examples/www/pages/example/example.bemhtml.js');

            res_write(BEMHTML.apply(bemjson));
            res_end(a, b, c);
        };

        next();
    };
};
