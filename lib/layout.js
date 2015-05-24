var async = require('async');
var PATH = require('path');

var importer = require("./importer");
var clone = require("./clone");

module.exports = function (needs, options, filePath, callback){
	var viewDir = PATH.dirname(filePath);
	async.map(needs, function (need, cb){
		var filename = PATH.join(viewDir, need.layout+".bli");
		delete need.layout;
		var thisoptions = clone(options);
		thisoptions.body = clone(need);
	
		importer(filename, thisoptions, function(err, res){
			if(err) return cb(err);
			cb(null, res);
		});
		}, function (err, res) {
		if (err) return callback(err);

		res.forEach(function (imp, index) {
			
			var edit = needs[index];
			for (var key in edit){
				delete edit[key];
			}
			for (var key in imp){
				edit[key]=imp[key];
			}
		});
		callback(null);
	});
	

}
module.exports.key = "layout";
