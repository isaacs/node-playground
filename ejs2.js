
var posix = require("posix"),
  path = require("path");

// the goal:
// support <% code %> and <%=text%>
// without changing the line-number of the file.
exports.parse = function ejs_parse (filename) {
  var cacheKey = filename+"___",
    safeName = path.filename(filename).replace(/[^a-zA-Z0-9_]/g, '_');
  if (exports.useCache && exports.cache.hasOwnProperty(cacheKey)) {
    return exports.cache[cacheKey];
  }
  
  // todo: this wait() smells funny.  clean it up.
  var src = posix.cat(filename).wait();
  
  src = '(function parsed_'+safeName+' (result, require, __filename, module) {'+
    'function print () {result.push.apply(result, arguments)};'+
    'print(\'' +(
    src
      .replace(/[\r\t]/g, ' ')
      .split("<%").join("\t")
      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
      .replace(/\t=(.*?)%>/g, "',$1,'")
      .split("\t").join("');")
      .split("%>").join("\n;print('")
      .split("\r").join("\\'")
      .split("\n;print('\n\n").join("/*FOOMP*/\n;print('\\n")
    ) + "');\nreturn result;})";
  
  // now walk through and escape the in-string \n's, because JS is fucking obnoxious.
  var ESC = "\\",
    CR = "\n",
    STR = "'",
    STR2 = '"',
    escaped = false,
    state = null; // null = "not in a string"
  for (var i = src.indexOf(';print('), l = src.length; i < l; i ++) {
    var c = src[i];
    if (escaped) escaped = false;
    else if (c === ESC) escaped = true;
    else if (c === state && (state === STR || state === STR2)) state = null;
    else if (state === null && (c === STR || c === STR2)) state = c;
    else if (c === CR && (state === STR || state === STR2)) {
      // splice in the backslash in front of the \n, then step over the new char
      src = src.split("");
      src.splice(i, 0, ["\\n\\"]);
      src = src.join("");
      i += "\\n\\".length;
    }
  }
  // var fn = process.compile(src, filename);
  return src;
};

exports.useCache = true;
exports.cache = {};

var filename = require("path").join(__filename, "../test.ejs");
var src = exports.parse(filename);
process.stdio.writeError(src);
var fn = process.compile(src, filename);
var out = [];
fn(out, require, __filename, module);
process.stdio.write("\n\n\n" + out.join(""));