require("url");

var Promise = require("events").Promise,
  sys = require("sys");

Promise.prototype.test = function (fn) {
  return this.addCallback(fn);
};

function foo () {
  require("url");
  var p = new Promise();
  process.nextTick(function () { p.emitSuccess() });
  return p;
};

sys.puts("1");
foo().addCallback(function () {
  sys.puts("callback 1")
});
sys.puts("2");
foo().addCallback(function () {
  sys.puts("callback 2")
});
sys.puts("3");
foo().addCallback(function () {
  sys.puts("callback 3")
});
sys.puts("4");
foo().addCallback(function () {
  sys.puts("callback 4")
});
sys.puts("5");
foo().addCallback(function () {
  sys.puts("callback 5")
});
sys.puts("6");
foo().addCallback(function () {
  sys.puts("callback 6")
});
