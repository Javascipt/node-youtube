var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path');
var fs = require('fs');

module.exports = function (videoFilePath, time, snapshotFilePath, filePath, cb) {
    function snapCallBack () {
        if(filePath) {
            move(snapshotFilePath, path.resolve(filePath)).then(cb).catch(cb)
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