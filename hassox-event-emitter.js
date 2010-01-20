"use strict";

var sys = require("sys");
 
function App (name, fn) {
  if (! (this instanceof arguments.callee))
    return new App(name, fn);
  
  // process.EventEmitter.apply(this, arguments);
  
  var self = this;
  this.name = name;
 
  sys.debug("adding request handler... " + self.name)
 
  this.addListener("request", function(req, res){
    sys.debug ("Calling request on " + self.name)
    fn.call(self, req, res);
  })
};
 
process.inherits(App, process.EventEmitter)
 
var First = new App("first", function(req, res){
  sys.debug("In First")
  Second.emit("request", req, res);
});
 
var Second = new App("second", function(req, res){
  sys.debug("In Second")
  Third.emit("request", req, res);
});
 
var Third = new App("third", function(req, res){
  sys.debug("In Third")
  res.sendHeader({"Content-Type" : "text/plain"});
  res.sendBody("Hi From Third")
  res.finish();
});

http = require('http');
http.createServer(function(req, res) {
  sys.debug("about to emit \"request\" on First");
  First.emit("request", req, res);
  sys.debug("First.name ="+First.name);
  sys.debug("Second.name ="+Second.name);
  sys.debug("Third.name ="+Third.name);
}).listen(8000)
sys.debug("Server started on port 8000");