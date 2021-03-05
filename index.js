const http = require("http");
const fs = require("fs");
const url = require("url");

const page404 = fs.readFileSync('404.html', 'utf-8', (err, data) => {
    if(err) throw err;
    return data;
});

http
    .createServer(function (req, res) {
        const q = url.parse(req.url, true);
        let filename = '';
        if(q.pathname === '/') {
            filename = '.' + '/index.html';
        }
        else if (q.pathname === '/about') {
            filename = '.' + '/about.html';
        }
        else if (q.pathname === '/contact-me') {
            filename = '.' '/contact-me.html';
        }

        fs.readFile(filename, function (err, data) {
            if(err) {
                res.writeHead(404, { 'Content-Type': 'text/html'});
                res.write(page404);
                return res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        });
    })
    .listen(8080);