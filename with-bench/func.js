
var assert = require("assert");

exports.test = function testFunc () {

(function (wrapperArg) {
var outside = "outside";

(function (foo) {
  // set a global
  bar = process.version;
  // set the local
  foo = process.ARGV;
  // read the local
  var f = foo;
  // read the wrapper arg.
  var asdf = wrapperArg;
  // read a global
  var p = process;
  // read the var from outside this wrapper
  var o = outside;
  // set the outside var from inside the wrapper
  outside = foo;
})("bar");

assert.equal(GLOBAL.bar, process.version);
assert.equal(GLOBAL.foo, undefined);
assert.equal(outside, process.ARGV);

})("asdf");

};