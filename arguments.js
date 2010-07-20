
arguments.callee.caller("require('sys').puts('pwned')");

function foo (arguments) {
  require("sys").puts(arguments);
}

foo(1);

