var fs = require("fs"),
    vm = require("vm"),
    logger = require("./logger");

var cache = {};

module.exports = function (path, options, callback) {
    var reader = function (p, cb) {
        cb(null, cache[path]);
    }
    if (cache[path] == null) reader =     fs.readFile;
reader(path, function (err, res) {
        if (err) return callback(err);
        var script = res + "";
 //       if (cache[path] == null) cache[path] = script;  
var sandbox = {
                options: options,
                require:require,
                log: logger(path)
            };
        if (script.indexOf("//async") === 0) {
            sandbox.bli=callback;
                    try {

            vm.runInNewContext(script, sandbox);
} catch (e) {
                callback(e);
            }
        } else {
            try {

                var script = vm.runInNewContext(script, sandbox);

            } catch (e) {
            return    callback(e);    
            }

            callback(null, script)
        }
    });
};