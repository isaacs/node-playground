var c2 = require("./circ-2");

c2.foo = "bar";

var c3 = require("./circ-3");

require("sys").debug( c2.foo === c3.c2.foo );
require("sys").debug( c2 === c3.c2 );