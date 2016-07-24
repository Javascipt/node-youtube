var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path');
var fileExists  = require('file-exists');
var fs          = require('fs');

module.exports = function (videoFilePath, time, snapshotFilePath, filePath, cb) {
    function snapCallBack () {
        if(filePath) {
            move(snapshotFilePath, path.resolve(filePath)).then(cb).catch(cb)
        } else {
            // fs.access not supported
            cb(fileExists(snapshotFilePath) ? null: new Error(snapshotFilePath + ' not found'));
        }
    }

    ffmpeg(videoFilePath)
        .output(snapshotFilePath)
        .seek(time)
        .on('error', snapCallBack)
        .on('end', snapCallBack)
        .run();
}