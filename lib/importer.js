var async = require('async');
var fs = require('fs');
var rq = require("./requireBLJS");
var bjn = require("blinadijson");


module.exports = function (filePath, options, callback) {
	
	rq(filePath, options, function (err, object) {
		if (err) return callback(err);
		async.series(workers.map(function (worker) {
			var fun = function (cb) {
				var needs = bjn.search(object, worker.key);
				
				if (needs.length>0){
				 return worker(needs, options, filePath, function (err, res) {
									if(err) return cb(err)
																		needs.forEach(function (need) {
																			delete need[worker.key]
																		});
																		cb(null);
								});
				}
				cb(null);
			};
			return fun;
		}),
		function(err, results){
			if (err) return callback(err);
			callback(null, object);
		});
	});
}
var workers =  [require("./layout"), require("./imp")];