(function parsed_test_ejs (result, require, __filename, module) {function print () {result.push.apply(result, arguments)};print('<h1>hello</h1>\n\
\n\
"can\'t get no satisfaction"\n\
\n\
',"world",'\n\
\n\
', new Error("testing").stack ,'\n\
\n\
'); for (var i = 0; i < 5; i ++) { 
;print('\n\
 ', +(new Error("iterating").stack.split("\n")[1].split(":")[1]) === 10 ,'\n\
 '); // new Error("iterating").stack.split("\n")[1] 
;print('\n\
 ', +(new Error("iterating").stack.split("\n")[1].split(":")[1]) === 12 ,'\n\
'); } /*FOOMP*/
;print('\n');
if (Math.floor(Math.random() * 2) === 1) {
 print("hello")
} else {
 print("goodbye");
}
/*FOOMP*/
;print('\n<h2>let\'s see if it worked, neh?</h2>');
return result;})