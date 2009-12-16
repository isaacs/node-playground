var sys = require('sys'), 
  http = require('http'),
  posix = require("posix"),
  docroot = process.cwd(),
  err = {
    404 : function (res) { return function () {
      res.sendHeader(404, {'Content-Type' : 'text/plain'});
      res.sendBody("404 Not Found: "+file);
      res.finish();
    }},
    400 : function (res) { return function () {
      
    }}
  };
  
http.createServer(function (req, res) {
  sys.debug("requesting: "+docroot+req.uri.path);
  
  
  var file = docroot+req.uri.path;
  posix.stat(file)
    .addCallback(function (stat) {
      // file exists.
      posix.open(file, process.O_RDONLY, 0666)
        .addErrback(err[404](res))
        .addCallback(function (fd) {
          res.sendHeader(200, {
            // would be nice to guess at the content-type from filename or something
            "content-length" : stat.size
          });
          readAndSend(fd);
          function readAndSend (fd) {
            posix.read(fd, 1024, null, "binary")
              .addCallback(function (data, bytesRead) {
                if (bytesRead === 0) res.finish();
                else {
                  res.sendBody(data, "binary");
                  readAndSend(fd);
                }
              });
          }
        });
    })
    .addErrback(err[404](res));
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');