var testWith = require("./with").test,
  testFunc = require("./func").test,
  bench = require("../bench");

bench.show(bench.compare(testWith, testFunc), "with(){}", "function(){}");
