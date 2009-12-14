function Foo () {};

var c3 = exports = module.exports = new Foo();

c3.c2 = require("./circ-2");
