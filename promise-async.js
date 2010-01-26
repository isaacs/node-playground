
var Promise = require("events").Promise,
  sys = require("sys");

Promise.prototype.test = function (fn) {
  return this.addCallback(function () { process.nextTick(fn) });
};

function foo () {
  var p = new Promise();
  process.nextTick(function () { p.emitSuccess() });
  return p;
};

sys.debug("start");
foo().test(function () {
  sys.debug("cb 1");
});
sys.debug("after attach 1");
foo().test(function () {
  sys.debug("cb 2");
});
sys.debug("after attach 2");

// expect start, after attach 1, after attach 2, cb 1, cb 2
