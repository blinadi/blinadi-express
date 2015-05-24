var colors = require('colors');

module.exports = function(path){
var prefix = "[".green + path.blue + "]".green + ": ";
var log = function () {
process.stdout.write(prefix);
console.log.apply(this,arguments);
};
return log;
};