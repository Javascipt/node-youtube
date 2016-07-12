var fs = require('fs');
var path = require('path');
var Q = require('q');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var move = require('./modules/move');;
var startPath = require('./modules/start-path');


module.exports = function (url) {
    return {
        snapshot : function (time, filePath, format) {
            /**
             * @todo : can be optimized by downloading only the concerned part of the video
             */
            var videoFilePath = path.resolve(__dirname, 'tmp', 'video-'+ ( + new Date() ) + '.mp4');
            var snapshotFilePath = path.resolve(__dirname, 'tmp', 'snap-'+ ( + new Date() ) + '.jpg');

            function snapCallBack () {
                startPath().then(function (stpath) {
                    move(snapshotFilePath, path.resolve(stpath, filePath))
                        .then(function () {
                            deferred.resolve();
                            fs.unlink(videoFilePath);
                            fs.unlink(snapshotFilePath);
                        })
                        .catch(function (err) {
                            deferred.reject(err);
                            fs.unlink(videoFilePath);
                            fs.unlink(snapshotFilePath);
                        })
                }).catch(function (err) {
                    deferred.reject(err);
                })
            }

            var deferred = Q.defer();
            var video = youtubedl(url, format, { cwd: __dirname });
            video.pipe(fs.createWriteStream(videoFilePath));
            video.on('end', function() {
                ffmpeg(videoFilePath)
                    .output(snapshotFilePath)
                    .seek(time)
                    .on('error', snapCallBack)
                    .on('end', snapCallBack)
                    .run();
            });

            return deferred.promise;
        }
    }
}