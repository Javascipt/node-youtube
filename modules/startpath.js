var exec    = require('child_process').exec;
var path    = require('path');
var Q       = require('q');

/**
 * @todo : this one can be a seperate module supporting all operating systems
 */

module.exports = function () {
    var deferred = Q.defer();
    exec('pwd', function (err, stdout) {
        if(err) return deferred.reject(err);
        deferred.resolve(stdout.toString().trim());
    });

    return deferred.promise;
}