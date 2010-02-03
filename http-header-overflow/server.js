var sys = require("sys");
require("http").createServer(function (_,res) {
  sys.debug("connect");
  res.sendHeader(200, {});
  res.sendBody("hi");
  res.finish();
}).listen(8000);