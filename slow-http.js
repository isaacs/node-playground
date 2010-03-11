function somethingSlow (cb) {
  // just using setTimeout as a simulation.
  // pretend this is hitting a database or something that
  // takes 1s
  setTimeout(function () {
    cb("hello");
  }, 1000);
}
require("http").createServer(function (req, res) {
  somethingSlow(function (data) {
    res.writeHead(200, {});
    res.write(data+" world");
    res.close();
  });
}).listen(8080);
