exports.hello = function () {
  require('sys').debug("hello from one!");
}
require("sys").debug("in one/hello.js, module = "+JSON.stringify(module));

