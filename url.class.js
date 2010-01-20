exports.URL = URL;

var url = require("url");
function URL (href) {
  if (href) this.href = href;
  return this;
};
URL.prototype.__defineGetter__("fragment", function () {
  return this.hash && this.hash.substring(1) || undefined
});
URL.prototype.__defineSetter__("fragment", function (f) {
  if (f.charAt(0) !== "#") f = "#" + f;
  this.hash = f;
});
URL.prototype.__defineGetter__("query", function () {
  return this.search && this.search.substring(1) || undefined;
});
URL.prototype.__defineSetter__("query", function (q) {
  if (q.charAt(0) !== "?") q = "?" + q;
  this.search = q;
});
URL.prototype.__defineGetter__("path", function () { return this.pathname });
URL.prototype.__defineSetter__("path", function (p) { this.pathname = p });
URL.prototype.toString = function () { return url.format(this) };
URL.prototype.__defineSetter__("href", function (h) {
  var u = url.parse(h);
  for (var i in u) if (
    i !== "href"
    && i !== "host"
    && i !== "query"
  ) this[i] = u[i];
});
URL.prototype.__defineGetter__("href", function () { return this.toString() });
URL.prototype.__defineGetter__("host", function () { return this.hostname && (
  (this.hasOwnProperty("auth") && this.auth !== undefined && (this.auth + "@"))
  + (this.hostname)
  + (this.hasOwnProperty("port") && this.port !== undefined && (":" + this.port))
) || undefined });
URL.prototype.__defineSetter__("host", function (h) {
  var p = parseHost(h);
  ["auth", "port", "hostname"].forEach(function (part) {
    if (p[part]) this[part] = p[part];
    else delete(this[part]);
  });
});
URL.prototype.goto = function (u) {
  this.href = url.resolve(this.href, u);
  return this;
};

function parseHost (host) {
  var out = {};
  var at = host.indexOf("@");
  if (at !== -1) {
    out.auth = host.substr(0, at);
    host = host.substr(at+1); // drop the @
  }
  var port = /:[0-9]+$/.exec(host);
  if (port) {
    port = port[0];
    out.port = port.substr(1);
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}
