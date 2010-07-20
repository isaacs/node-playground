var sys = require("sys");
require("http").createServer(function (req,res) {
  sys.debug("from http server: connect");
  res.sendHeader(200, {});
  res.sendBody("hi");
  for (var i in req.headers) {
    res.sendBody("\nHEADER "+i+": "+req.headers[i]+"\n");
  }
  res.finish();
}).listen(8000);