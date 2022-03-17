// exports.run = function(){ //expots為現有的物件，不可改變，只能增加屬性
//    console.log("I am module1 :>");
// }
module.exports = function(){
   // console.log("I am module1 :>");
   console.log("module1.js => " + __filename);
}