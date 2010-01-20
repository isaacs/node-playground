var uri = require("uri"),
  url = require("url"),
  assert = require("assert"),
  w = function (m) {
    process.stdio.writeError(m+"\n");
  },
  avg = function (nums) {
    var sum = 0;
    nums.forEach(function (n) { sum+=n });
    return sum/nums.length;
  },
  SPEED_TEST_COUNT = 5,
  SPEED_TEST_TIMEOUT = 1000;

var parseTests = {
  "http://www.narwhaljs.org/blog/categories?id=news" : {
    "href": "http://www.narwhaljs.org/blog/categories?id=news",
    "protocol": "http:",
    "host": "www.narwhaljs.org",
    "hostname": "www.narwhaljs.org",
    "search": "?id=news",
    "query": "id=news",
    "pathname": "/blog/categories"
  },
  "http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=" : {
    "href": "http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=",
    "protocol": "http:",
    "host": "mt0.google.com",
    "hostname": "mt0.google.com",
    "pathname": "/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s="
  },
  "http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=" : {
    "href": "http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=",
    "protocol": "http:",
    "host": "mt0.google.com",
    "hostname": "mt0.google.com",
    "search": "???&hl=en&src=api&x=2&y=2&z=3&s=",
    "query": "??&hl=en&src=api&x=2&y=2&z=3&s=",
    "pathname": "/vt/lyrs=m@114"
  },
  "http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=" : {
    "href": "http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=",
    "protocol": "http:",
    "host": "user:pass@mt0.google.com",
    "auth": "user:pass",
    "hostname": "mt0.google.com",
    "search": "???&hl=en&src=api&x=2&y=2&z=3&s=",
    "query": "??&hl=en&src=api&x=2&y=2&z=3&s=",
    "pathname": "/vt/lyrs=m@114"
  },
  "file:///etc/passwd" : {
    "href": "file:///etc/passwd",
    "protocol": "file:",
    "host": "",
    "hostname": "",
    "pathname": "/etc/passwd"
  },
  "file:///etc/node/" : {
    "href": "file:///etc/node/",
    "protocol": "file:",
    "host": "",
    "hostname": "",
    "pathname": "/etc/node/"
  },
  "http:/baz/../foo/bar" : {
   "href": "http:/baz/../foo/bar",
   "protocol": "http:",
   "pathname": "/baz/../foo/bar"
  },
  "http://user:pass@example.com:8000/foo/bar?baz=quux#frag" : {
   "href": "http://user:pass@example.com:8000/foo/bar?baz=quux#frag",
   "protocol": "http:",
   "host": "user:pass@example.com:8000",
   "auth": "user:pass",
   "port": "8000",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?baz=quux",
   "query": "baz=quux",
   "pathname": "/foo/bar"
  },
  "//user:pass@example.com:8000/foo/bar?baz=quux#frag" : {
   "href": "//user:pass@example.com:8000/foo/bar?baz=quux#frag",
   "host": "user:pass@example.com:8000",
   "auth": "user:pass",
   "port": "8000",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?baz=quux",
   "query": "baz=quux",
   "pathname": "/foo/bar"
  },
  "http://example.com?foo=bar#frag" : {
   "href": "http://example.com?foo=bar#frag",
   "protocol": "http:",
   "host": "example.com",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?foo=bar",
   "query": "foo=bar"
  },
  "http://example.com?foo=@bar#frag" : {
   "href": "http://example.com?foo=@bar#frag",
   "protocol": "http:",
   "host": "example.com",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?foo=@bar",
   "query": "foo=@bar"
  },
  "http://example.com?foo=/bar/#frag" : {
   "href": "http://example.com?foo=/bar/#frag",
   "protocol": "http:",
   "host": "example.com",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?foo=/bar/",
   "query": "foo=/bar/"
  },
  "http://example.com?foo=?bar/#frag" : {
   "href": "http://example.com?foo=?bar/#frag",
   "protocol": "http:",
   "host": "example.com",
   "hostname": "example.com",
   "hash": "#frag",
   "search": "?foo=?bar/",
   "query": "foo=?bar/"
  },
  "http://example.com#frag=?bar/#frag" : {
   "href": "http://example.com#frag=?bar/#frag",
   "protocol": "http:",
   "host": "example.com",
   "hostname": "example.com",
   "hash": "#frag=?bar/#frag"
  },
  "/foo/bar?baz=quux#frag" : {
   "href": "/foo/bar?baz=quux#frag",
   "hash": "#frag",
   "search": "?baz=quux",
   "query": "baz=quux",
   "pathname": "/foo/bar"
  },
  "http:/foo/bar?baz=quux#frag" : {
   "href": "http:/foo/bar?baz=quux#frag",
   "protocol": "http:",
   "hash": "#frag",
   "search": "?baz=quux",
   "query": "baz=quux",
   "pathname": "/foo/bar"
  },
  "mailto:foo@bar.com?subject=hello" : {
   "href": "mailto:foo@bar.com?subject=hello",
   "protocol": "mailto:",
   "pathname": "foo@bar.com",
   "search": "?subject=hello",
   "query": "subject=hello"
  },
  "javascript:alert('hello');" : {
   "href": "javascript:alert('hello');",
   "protocol": "javascript:",
   "pathname": "alert('hello');"
  },
  "xmpp://isaacschlueter@jabber.org" : {
   "href": "xmpp://isaacschlueter@jabber.org",
   "protocol": "xmpp:",
   "host": "isaacschlueter@jabber.org",
   "auth": "isaacschlueter",
   "hostname": "jabber.org"
  }
};

var resolveTests = [
  // [from, path, expected]
  ["/foo/bar/baz", "quux", "/foo/bar/quux"],
  ["/foo/bar/baz", "quux/asdf", "/foo/bar/quux/asdf"],
  ["/foo/bar/baz", "quux/baz", "/foo/bar/quux/baz"],
  ["/foo/bar/baz", "../quux/baz", "/foo/quux/baz"],
  ["/foo/bar/baz", "/bar", "/bar"],
  ["/foo/bar/baz/", "quux", "/foo/bar/baz/quux"],
  ["/foo/bar/baz/", "quux/baz", "/foo/bar/baz/quux/baz"],
  ["/foo/bar/baz", "../../../../../../../../quux/baz", "/quux/baz"],
  ["/foo/bar/baz", "../../../../../../../quux/baz", "/quux/baz"],
  ["foo/bar", "../../../baz", "../../baz"],
  ["foo/bar/", "../../../baz", "../baz"],
  ["http://u:p@h.com/p/a/t/h?s#hash", "https:#hash2", "https://u:p@h.com/p/a/t/h?s#hash2" ],
  ["http://u:p@h.com/p/a/t/h?s#hash", "https:/p/a/t/h?s#hash2", "https://u:p@h.com/p/a/t/h?s#hash2" ],
  ["http://u:p@h.com/p/a/t/h?s#hash", "https://u:p@h.com/p/a/t/h?s#hash2", "https://u:p@h.com/p/a/t/h?s#hash2" ],
  ["http://u:p@h.com/p/a/t/h?s#hash", "https:/a/b/c/d", "https://u:p@h.com/a/b/c/d" ],
  ["/foo/bar/baz", "/../etc/passwd", "/etc/passwd"]
];
var uriFormatTests = {};
var urlFormatTests = {};

w("\n\n---- PARSE TESTS ----\n");
for (var i in parseTests) {
  var urlParsed = url.parse(i),
    uriParsed = uri.parse(i),
    u = {
      href : uriParsed.url,
      protocol : (uriParsed.protocol ? uriParsed.protocol + ":" : undefined),
      host : uriParsed.authority,
      hostname : uriParsed.domain,
      port : uriParsed.port,
      auth : uriParsed.userInfo,
      search : uriParsed.query ? "?" + uriParsed.query : undefined,
      query : uriParsed.query,
      hash : uriParsed.anchor ? "#" + uriParsed.anchor : undefined,
      pathname : uriParsed.path
    },
    uTest = {};
  for (var j in parseTests[i]) uTest[j] = u[j];
  // save for the formatting speed tests.
  urlFormatTests[i] = urlParsed;
  uriFormatTests[i] = uriParsed;
    
  try {
    assert.deepEqual(parseTests[i], urlParsed);
  } catch (ex) {
    w("\033[41;1;30murl fail\033[0m "+i);
  }
  
  try {
    assert.deepEqual(parseTests[i], uTest);
  } catch (ex) {
    w("\033[40;1;31muri fail\033[0m "+i);
    w("expected: \n"+JSON.stringify(parseTests[i]));
    w("actual: \n"+JSON.stringify(uTest));
  }
}


w("\n\n---- RESOLVE TESTS ----\n");
// construct the test harness for each to use resolveObject on the speed test,
// since we are testing parsing speed separately.
var uriResolveTests = [],
  urlResolveTests = [];
resolveTests.forEach(function (test) {
  var from = test[0],
    to = test[1],
    expect = test[2],
    // speed doesn't matter in the correctness test.
    uriActual = uri.resolve(from, to),
    urlActual = url.resolve(from, to);
  
  uriResolveTests.push([uri.parse(from), uri.parse(to)]);
  urlResolveTests.push([url.parse(from), url.parse(to)]);

  try {
    assert.equal(expect, uriActual);
  } catch (ex) {
    w("\033[40;1;31muri fail\033[0m " + from + " + " + to);
    w("expected: "+expect);
    w("actual:   "+uriActual);
  }
  try {
    assert.equal(expect, urlActual);
  } catch (ex) {
    w("\033[41;1;30murl fail\033[0m "+from+" + "+to);
    w("expected: "+expect);
    w("actual:   "+urlActual);
  }
});

w("\n\n---- FORMAT TESTS ----\n");
for (var i in parseTests) {
  var uriActual = uri.format(uri.parse(i)),
    urlActual = url.format(url.parse(i))
  try {
    assert.equal(i, uriActual);
  } catch (ex) {
    w("\033[40;1;31muri fail\033[0m " + i);
    w("expected: "+i);
    w("actual:   "+uriActual);
  }
  try {
    assert.equal(i, urlActual);
  } catch (ex) {
    w("\033[41;1;30murl fail\033[0m "+i);
    w("expected: "+i);
    w("actual:   "+urlActual);
  }
}


w("\n\n---- PARSE SPEED TESTS ----\n");
function parseSpeedTest (parser) {
  var count = 0,
    go = true,
    start = new Date().getTime(),
    now = start,
    p = new process.Promise();
  process.stdio.writeError(".");
  setTimeout(function () { go = false }, SPEED_TEST_TIMEOUT);
  (function () {
    for (var i in parseTests) {
      var u = parser.parse(i);
      count ++;
    }
    if (go) setTimeout(arguments.callee);
    else p.emitSuccess(count / ((new Date().getTime()) - start));
  })();
  return p;
};

var urlTests = [], uriTests = [];
for (var i = 0; i < SPEED_TEST_COUNT; i ++) {
  // alternate who goes first to average out machine entropy.
  if (i%2) {
    urlTests.push(parseSpeedTest(url).wait());
    uriTests.push(parseSpeedTest(uri).wait());
  } else {
    uriTests.push(parseSpeedTest(uri).wait());
    urlTests.push(parseSpeedTest(url).wait());
  }
}

w("\nScores: (higher is better)\n");
w("Narwhal URI Module (with big regex and many fields):\n"+uriTests.join("\n"));
w("MEAN: "+avg(uriTests)+"\n");
w("New URL Module (with minimal regexes and few fields): \n"+urlTests.join("\n"));
w("MEAN: "+avg(urlTests)+"\n");

w("\n\n---- RESOLVE SPEED TESTS ----\n");
function resolveSpeedTest (resolver, resolveTests) {
  var count = 0,
    go = true,
    start = new Date().getTime(),
    now = start,
    p = new process.Promise();
  process.stdio.writeError(".");
  setTimeout(function () { go = false }, SPEED_TEST_TIMEOUT);
  (function () {
    resolveTests.forEach(function (test) {
      var u = resolver.resolveObject(test[0], test[1]);
      count ++;
    });
    if (go) setTimeout(arguments.callee);
    else p.emitSuccess(count / ((new Date().getTime()) - start));
  })();
  return p;
};
var urlTests = [], uriTests = [];
for (var i = 0; i < SPEED_TEST_COUNT; i ++) {
  // alternate who goes first to average out machine entropy.
  if (i%2) {
    urlTests.push(resolveSpeedTest(url, urlResolveTests).wait());
    uriTests.push(resolveSpeedTest(uri, uriResolveTests).wait());
  } else {
    uriTests.push(resolveSpeedTest(uri, uriResolveTests).wait());
    urlTests.push(resolveSpeedTest(url, urlResolveTests).wait());
  }
}

w("\nScores: (higher is better)\n");
w("Narwhal URI Module (with big regex and many fields):\n"+uriTests.join("\n"));
w("MEAN: "+avg(uriTests)+"\n");
w("New URL Module (with minimal regexes and few fields): \n"+urlTests.join("\n"));
w("MEAN: "+avg(urlTests)+"\n");



w("\n\n---- FORMAT SPEED TESTS ----\n");
function formatSpeedTests (formatter, formatTests) {
  var count = 0,
    go = true,
    start = new Date().getTime(),
    now = start,
    p = new process.Promise();
  process.stdio.writeError(".");
  setTimeout(function () { go = false }, SPEED_TEST_TIMEOUT);
  (function () {
    for (var i in formatTests) {
      var u = formatter.format(formatTests[i]);
      // w(u);
      count ++;
    };
    if (go) setTimeout(arguments.callee);
    else p.emitSuccess(count / ((new Date().getTime()) - start));
  })();
  return p;
};
var urlTests = [], uriTests = [];
for (var i = 0; i < SPEED_TEST_COUNT; i ++) {
  // alternate who goes first to average out machine entropy.
  if (i%2) {
    urlTests.push(formatSpeedTests(url, urlFormatTests).wait());
    uriTests.push(formatSpeedTests(uri, uriFormatTests).wait());
  } else {
    uriTests.push(formatSpeedTests(uri, uriFormatTests).wait());
    urlTests.push(formatSpeedTests(url, uriFormatTests).wait());
  }
}

w("\nScores: (higher is better)\n");
w("Narwhal URI Module (with big regex and many fields):\n"+uriTests.join("\n"));
w("MEAN: "+avg(uriTests)+"\n");
w("New URL Module (with minimal regexes and few fields): \n"+urlTests.join("\n"));
w("MEAN: "+avg(urlTests)+"\n");

