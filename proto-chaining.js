
var f = function () {};
f.__proto__ = {"foo":"bar"}
require("sys").debug(f.foo);

