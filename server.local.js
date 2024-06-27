
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if(fs.existsSync('./certificates/localhost.key') === false || fs.existsSync('./certificates/localhost.crt') === false) {
  console.error('Please create a certificate in the certificates folder with the name localhost.key and localhost.crt.');
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(443, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:443');
  });
});