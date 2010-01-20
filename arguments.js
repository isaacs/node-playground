
arguments.callee.caller("require('sys').puts('pwned')");

function foo (arguments) {
  require("sys").p(arguments);
}

foo(1);

