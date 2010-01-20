require("http").createServer(function (req, res) {
  res.sendHeader(200, {});
  res.sendBody("hi");
  res.finish();
}).listen(8000);

require("tcp").createServer(function (req, res) {
  
}).listen(8080);


require("sys").debug("got here");
