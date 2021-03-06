
exports.COUNT = 1000; // how many runs per iteration
exports.TIME = 1000; // how many ms to run tests for.
exports.COMPARE_COUNT = 8; // default number of runs for comparisons.
exports.run = run;
exports.compare = compare;
exports.show = show;



function run (fn, count, time) {
  count = count || exports.COUNT;
  time = time || exports.TIME;
  var runCount = 0,
    go = true,
    start = new Date().getTime(),
    now = start,
    p = new process.Promise();
  
  setTimeout(function () { go = false }, time);
  (function () {
    for (var n = count; n > 0; n --) fn();
    runCount ++;
    if (go) setTimeout(arguments.callee);
    else p.emitSuccess((runCount * count) / ((new Date().getTime()) - start));
  })();
  return p;
};

// danger! necessarily synchronous.  benchmarking, after all.
function compare (fn1, fn2, compareCount, count, time) {
  compareCount = compareCount || exports.COMPARE_COUNT;
  count = count || exports.COUNT;
  time = time || exports.TIME;
  
  if (!!(compareCount % 2)) compareCount ++; // should be even.
  
  // flip a coin to see who goes first.
  var first = (Math.floor(Math.random() * 2)) ? fn1 : fn2,
    second = (first === fn1) ? fn2 : fn1,
    results = [[],[]];
  // if (first === fn1) print("normal order");
  // else print("swapped order");
  for (var i = 0; i < compareCount; i ++) {
    // print(".", false);
    var score = run(i % 2 ? second : first, count, time).wait();
    // print(i+" "+(i%2) + " " +((i%2 ? first : second).name) + " "+score);
    results[ i % 2 ].push( score );
  }
  print("");
  // make sure the results are in the right order.
  if (first !== fn1) results.unshift(results.pop());
  return results;
};

function print (m,cr) { process.stdio.writeError(m+(cr===false?"":"\n")); return print };

function show (results, m1, m2) {
  var averages = [avg(results[0]), avg(results[1])];
  (print)
    ("Scores: (bigger is better)\n")
    (m1)
    (results[0].join("\n"))
    ("Average (mean) "+averages[0])
    ("\n")
    (m2)
    (results[1].join("\n"))
    ("Average (mean) "+averages[1])
    ("\n")
    ("Winner: " + (averages[0] > averages[1] ? m1 : m2 ))
    (pct(averages)+"% faster")
    (times(averages)+" times as fast")
    (oom(averages)+" order(s) of magnitude faster");
};
function pct (nums) {
  return Math.round((1-(Math.min.apply(Math, nums)/Math.max.apply(Math,nums))) * 10000) / 100;
}
function times (nums) {
  return Math.round((Math.max.apply(Math, nums)/Math.min.apply(Math,nums)) * 100) / 100;
}
function oom (nums) {
  var ratio = Math.max.apply(Math, nums)/Math.min.apply(Math,nums), oom = 0;
  while ( (ratio/=10) > 1 ) oom++;
  return oom;
}
function avg (nums) {
  var sum = 0;
  nums.forEach(function (n) { sum+=n });
  return sum/nums.length;
};