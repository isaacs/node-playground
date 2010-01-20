exports.foo = "bar";

var p = new process.Promise;
p.addCallback(function () { process.stdio.writeError("OK")})
  .addErrback(function () { process.stdio.writeError("NOT OK")})

process.createChildProcess("ls", ["-laF"])
  .addListener("error", function (chunk) {
    if (chunk) process.stdio.writeError(chunk);
  })
  .addListener("output", function (chunk) {
    if (chunk) process.stdio.write(chunk);
  })
  .addListener("exit", function (code) {
    p[code ? "emitError" : "emitSuccess"]();
  });

