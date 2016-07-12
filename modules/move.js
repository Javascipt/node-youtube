var fs  = require("fs");
var Q   = require("q");

module.exports = function (sourcePath, destPath) {
    var source      = fs.createReadStream(sourcePath);
    var dest        = fs.createWriteStream(destPath);
    var deferred    = Q.defer();

    source.pipe(dest);
    source.on('end', deferred.resolve.bind(deferred));
    source.on('error', deferred.reject.bind(deferred));

     return deferred.promise;
}