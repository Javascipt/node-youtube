var Q = require("q");
var fs = require("fs");

module.exports = function (sourcePath, destPath) {
    var source = fs.createReadStream(sourcePath);
    var dest = fs.createWriteStream(destPath);
    var deferred = Q.defer();

    source.pipe(dest);
    source.on('end', function() { 
        deferred.resolve();
     });
    source.on('error', function(err) { 
        deferred.reject(err);
     });

     return deferred.promise;
}