var startPath   = require('./startpath');
var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path')

module.exports = function (startTime, duration, videoFilePath, cropFilePath, filePath, cb) {
    function cropCallBack () {
        startPath().then(function (stpath) {
            move(cropFilePath, path.resolve(stpath, filePath))
                .then(function () {
                    cb && cb();
                })
                .catch(function (err) {
                    cb && cb(err);
                })
        }).catch(function (err) {
            cb && cb(err);
        })
    }

    ffmpeg(videoFilePath)
        .output(cropFilePath)
        .setStartTime(startTime)
        .setDuration(duration)
        .on('error', cropCallBack)
        .on('end', cropCallBack)
        .run();
}