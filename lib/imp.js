var async = require('async');
var PATH = require('path');

var importer = require("./importer");
var clone = require("./clone");

module.exports = function (impneeds, options, filePath, callback){
	var viewDir = PATH.dirname(filePath);
	async.map(impneeds, function  (imp, cb) {
		var filename = PATH.join(viewDir, imp.imp+".bli");
		var thisoptions = clone(options);
		thisoptions.heir = imp;
		importer(filename, thisoptions, function(err, res){
			if(err) return cb(err);
			cb(null, res);
		});
	}, function (err, res) {
		if (err) return callback(err);

		res.forEach(function (imp, index) {
			var edit = impneeds[index];
			for (var key in imp){
				edit[key]=imp[key];
			}
		});
		callback(null);
	});
};
module.exports.key = "imp";