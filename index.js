const fs = require('fs');
const http = require('http');
const url = require('url');





/////////////////////////////////
// SERVER
const home = fs.readFileSync(
  `${__dirname}/pages/home.html`,
  'utf-8'
);

const contact = fs.readFileSync(
  `${__dirname}/pages/contact.html`,
  'utf-8'
);

const about = fs.readFileSync(
  `${__dirname}/pages/about.html`,
  'utf-8'
);




const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // home page
  if (pathname === '/' || pathname === '/home') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    
    res.end(home);

    //about page
  } else if (pathname === '/about') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(about);

    
  } else if (pathname === '/contact') {
    //contact page
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(contact);

   
  }
  else if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
  //load css style sheet, when requested by browser

      fs.readFile(__dirname + '/public/w3.css', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });

    }
  else {
    //for any other state routes
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Page Not Found'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
