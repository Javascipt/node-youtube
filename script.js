var snapShot    = require('./modules/snapshot')
var youtubedl   = require('youtube-dl');
var path        = require('path');
var fs          = require('fs');
var Q           = require('q');

module.exports = function (url) {
    return {
        snapshot : function (time, filePath, format) {
            var videoFilePath = path.resolve(__dirname, 'tmp', 'video-'+ ( + new Date() ) + '.mp4');
            var snapshotFilePath = path.resolve(__dirname, 'tmp', 'snap-'+ ( + new Date() ) + '.jpg');
            var ws = fs.createWriteStream(videoFilePath);
            var deferred = Q.defer();
            var video = youtubedl(url, format, { cwd: __dirname });
            var checkSnap = function () {
                snapShot(videoFilePath, time, snapshotFilePath, filePath, function (err) {
                    if(err) return setTimeout(checkSnap, 200);
                    ws.emit('close');
                    deferred.resolve();
                })
            }

            video.pipe(ws);
            video.on('info', checkSnap);
            video.on('end', function() {
                snapShot(videoFilePath, time, snapshotFilePath, filePath, function (err) {
                    if(err) return deferred.reject(err);
                    deferred.resolve();
                })
            });

            return deferred.promise;
        }
    }
}