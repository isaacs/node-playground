
var sys = require("sys");

var s = require("http").createServer(function (req, res) {
  res.sendHeader(200, {"content-type":"text/plain"});
  res.sendBody("hello\n", "binary");
  res.sendBody(JSON.stringify(req, null, 2), "binary");
  res.finish();
});

// [
//   "url", "path", "fragment", "queryString", "headerField",
//   "headerValue", "headerComplete", "body", "messageComplete"
// ].forEach(function (bit) {
//   s.addListener(bit, function (data) { sys.debug(bit+": "+JSON.stringify(data)) });
// });

sys.debug("server: "+JSON.stringify(s));

s.listen(8000);
