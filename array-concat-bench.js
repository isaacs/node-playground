#!/usr/bin/env node-bench
var list = [
  "foo",
  "bar",
  "baz",
  "quux",
  "asdf",
  "qwerty",
  "bonk",
  "whack",
  "zoom",
  "zap"
];

exports.compare = {
  join : function () {
    var str = list.join("");
  },
  concat : function () {
    var str = String.prototype.concat.apply("", list);
  },
  strplus : function () {
    var str = "";
    for (var i = 0, l = list.length; i < l; i ++) str += list[i];
  }
}
