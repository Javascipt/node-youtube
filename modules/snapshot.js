var startPath   = require('./startpath');
var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path')

module.exports = function (videoFilePath, time, snapshotFilePath, filePath, cb) {
    function snapCallBack () {
        startPath().then(function (stpath) {
            move(snapshotFilePath, path.resolve(stpath, filePath))
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
        .output(snapshotFilePath)
        .seek(time)
        .on('error', snapCallBack)
        .on('end', snapCallBack)
        .run();
}