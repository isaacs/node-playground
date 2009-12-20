exports.normalize = normalize;
function normalizeArray (parts) {
  var directories = [];
  for (var i = 0, l = parts.length; i < l; i++) {
    var directory = parts[i];
    if (directory == '.') {
    } else if (directory == '..') {
      if (directories.length && directories[directories.length - 1] != '..')
        directories.pop();
      else
        directories.push('..');
    } else {
      directories.push(directory);
    }
  }
  return directories;
};
function normalize (path) {
  return normalizeArray(path.split("/")).join("/");
}

var assert = require("assert");
assert.equal(normalize("../../foo/../bar/../baz"), "../../baz");
assert.equal(normalize("../../foo/../../bar/../baz"), "../../../baz");
assert.equal(normalize("../../foo/bar/../../bar/../baz"), "../../baz");
assert.equal(normalize("../../foo/bar/baz/../../bar/../baz"), "../../foo/baz");
assert.equal(normalize("foo/bar/baz/../../bar/../baz"), "foo/baz");
assert.equal(normalize("foo/bar/baz/../../bar/../baz"), "foo/baz");

require("sys").debug("ok");
