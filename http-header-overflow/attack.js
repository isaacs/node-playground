var conn = require("tcp").createConnection(8000), sys = require("sys");

sys.debug("waiting for connection...");
conn.forceClose();
conn.addListener("connect", function () {
  sys.debug("connecting...");
  conn.send("GET /lulz HTTP/1.1\r\n");
  var i = 0;
  while (true) {
    conn.send("all-your-base: are belong to us.\r\n");
    i++;
    if (!(i%1000000)) sys.puts(i +" bases pwned")
  }
});
conn.connect(8000);