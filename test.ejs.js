(function parsed_test_ejs (print) {



;print("<h1>hello</h1>\n\n\"can't get no satisfaction\"\n\n");print("world");

;print("\n\n");print( new Error("testing").stack );

;print("\n\n"); for (var i = 0; i < 5; i ++) {
	
	
	
	
	
;print("\n\t");print( +(new Error("iterating").stack.split("\n")[1].split(":")[1]) === 15 );
;print("\n\t"); // new Error("iterating").stack.split("\n")[1]
	
;print("\n\t");print( +(new Error("iterating").stack.split("\n")[1].split(":")[1]) === 18 );
;print("\n"); } 

;print("\n\n");
if (Math.floor(Math.random() * 2) === 1) {
	print("hello")
} else {
	print("goodbye");
}
})