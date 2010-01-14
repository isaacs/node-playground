var sys = require("sys");

function chain (i) {
  var C = {items:[]};
  function CHAIN () {
    var link = Array.prototype.slice.call(arguments,0);
    C.items.push(link);
    return CHAIN;
  };
  CHAIN.isChain = true;
  CHAIN.getItems = function () { return C.items.slice(0) };
  var args = arguments;
  CHAIN.toString = function (trim, l) {
    l = l || 1;
    var s = "";
    if (!trim) {
      s = "\n"
      for (var i = 0; i < l; i ++) {
        s += "  ";
      }
    }
    return "chain"+s+"(" +
    this.getItems().map(function (link) { return link.map(function (link) {
      if (link.isChain) return link.toString(trim, l + 1);
      return JSON.stringify(link);
    })}).join(")"+s+"(") + ")" };
  return CHAIN.apply(this, arguments);
};

function walk (chain, cb) {
  // not using forEach, because we need early abort.
  var go = true;
  w(chain, cb);
  if (go) cb(null);
  function w (chain, cb) {
    if (!go) return;
    var items = chain.getItems();
    for (var i = 0, l = items.length; go && i < l; i ++) {
      var item = items[i];
      if (item.length === 0) {
        go = false;
        return cb(null);
      }
      if (
        item.length === 1
        && typeof(item[0]) === "function"
        && item[0].name === "CHAIN"
      ) w(item[0], cb);
      else cb(item);
    }
  };
}

var m = chain(1)(2)(3)(4)(5)()(9)(),
  n = chain(1,2)(chain("a","b")("c"))(chain("d")("e","f"))(5,6);

sys.puts("\nPretty:\n"+m);
sys.puts("\nSmall:\n"+m.toString(true));
sys.puts("\nPretty:\n"+n);
sys.puts("\nSmall:\n"+n.toString(true));
sys.puts("\nwalking m");
walk(m, sys.puts);
sys.puts("\nwalking n");
walk(n, sys.puts);
