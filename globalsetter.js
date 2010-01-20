
(function (param) {
  GLOBAL.__defineSetter__("foo", function (f) {
    require("sys").debug("setting foo!");
  });
  GLOBAL.__defineGetter__("foo", function (f) {
    require("sys").debug("getting foo!");
    return {a:1}
  })

  foo = "bar";

  var x = foo;
})(p);