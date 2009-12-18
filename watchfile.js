
var argv = process.ARGV.slice(0),
  sys = require("sys"),
  a;
while (argv.shift() !== "node");
// now argv is everything AFTER node, so shift one more.
argv.shift();

// now argv is the new arguments to node.
var filename = argv[0];
if (!filename) throw new Error(
  "What should I watch?"
);

sys.debug("watching "+filename+" for changes");

var child;
function load () {
  try { child.kill(); }
  catch (ex) {}
  child = process.createChildProcess("node", argv, process.ENV);
  child
    .addListener("output", process.stdio.write)
    .addListener("error", process.stdio.writeError);
};

load();
process.watchFile(filename, load);