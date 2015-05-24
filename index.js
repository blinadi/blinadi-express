var bjn = require("blinadijson");

var importer = require("./lib/importer")
module.exports = function (filePath, options, callback) { 
	importer(filePath, options, function (err, object) {
				if (err) return callback(err);
		callback(null, bjn(object));	
	});
};
