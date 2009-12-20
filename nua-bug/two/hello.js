exports.hello = function () {
  require("sys").debug("hello from two!");
}

require("sys").debug("in two/hello.js, module = "+JSON.stringify(module));
