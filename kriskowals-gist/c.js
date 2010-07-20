
var sys = require("sys");
function d (m, o) {
  sys.debug(m);
  return;
  sys.debug("\n----\n"+m + ": " + sys.inspect(o)+"\n----\n");
}
// d("before",module);

module.exports = ("this is ok");


require("./b");
d("after",module);
try {
  module.exports = ("but this isn't");
} catch (ex) {
  sys.debug("got an error trying to setExport: "+ex.message);
}

d("done",module);
