function A(){}; process.inherits(A, process.tcp.Server); (new A()).listen(80, 'localhost');