var bench = require("./bench");

function foo () {
  return o
};

var o = {"foo":1};

function fooCall () {
  return foo.call(o,1,2,3);
};

function fooApply () {
  return foo.apply(o,[1,2,3]);
};

function fooDirect () {
  return foo(o,1,2,3);
};

bench.show(bench.compare(fooApply, fooDirect), "apply", "direct");
