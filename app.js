const fs = require('fs');
const http = require('http');

const App = require('./');

const app = App({
    target: 'http://127.0.0.1:8087',
    listen: '3333'
});

app.on('listen', address => {
    console.log('Proxy server listening on ' + (address.port ? 'port ' + address.port : address));
    address.port || process.on('exit', function(e) {
        fs.unlinkSync(address);
    });
});
process.on('SIGINT', () => process.exit());



// -----------------------------------------------------------------------------
// Apache emulation below:

const server2 = http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
        case '/index.html':
            res.writeHead('200', { 'Content-Type': 'text/html' });
            res.write(`<html><body><h1>It's a title</h1><p>Pure HTML`);
            break;
        case '/bem.html':
            res.writeHead('200', { 'Content-Type': 'text/html', 'X-Content-Type': 'application/x-bemjson' });
            res.write(JSON.stringify([
                '<html><body>',
                { tag: 'h1', content: `It's a title` },
                { tag: 'p', content: 'BEMJSON' }
            ]));
            break;
        default:
            res.writeHead('404', { 'Content-Type': 'text/html' });
            res.write(`<html><body><h1>Not found</h1><p>Supported pages: /index.html, /bem.bemjson.js, /bem.html`);
    }
    res.end();
});

server2.listen(8087, () => console.log('Listening php-emulation server on ' + server2.address().port));
