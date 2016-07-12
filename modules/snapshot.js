var startPath   = require('./startpath');
var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path');
var fs = require('fs');

module.exports = function (videoFilePath, time, snapshotFilePath, filePath, cb) {
    function snapCallBack () {
        if(filePath) {
            startPath().then(function (stpath) {
                move(snapshotFilePath, path.resolve(stpath, filePath))
                    .then(cb)
                    .catch(cb)
            }).catch(cb)
        } else {
            fs.access(snapshotFilePath, fs.F_OK, cb);
        }
    }

    ffmpeg(videoFilePath)
        .output(snapshotFilePath)
        .seek(time)
        .on('error', snapCallBack)
        .on('end', snapCallBack)
        .run();
}