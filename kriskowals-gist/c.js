
var sys = require("sys");
function d (m, o) {
  sys.debug("\n----\n"+m + ": " + JSON.stringify(o, null, 2)+"\n----\n");
}
// d("before",module);

module.setExports("this is ok");


require("./b");
// d("after",module);
try {
  module.setExports("but this isn't");
} catch (ex) {
  sys.debug("got an error trying to setExport: "+ex.message);
}

// d("done",module);
