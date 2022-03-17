// console.log('HELLO World');
// console.log(this);
var fs =require('fs');
var data =fs.readFileSync('abc.txt');
console.log(data);
console.log('toString'+data.toString());