process.addListener("uncaughtException", function (e) {
  require("sys").debug("got an error"+e.stack);
});

throw new Error("yo");