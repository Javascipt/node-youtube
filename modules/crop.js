var ffmpeg      = require('fluent-ffmpeg');
var move        = require('./move');
var path        = require('path')

module.exports = function (startTime, duration, videoFilePath, cropFilePath, filePath, cb) {
    function cropCallBack () {
        move(cropFilePath, path.resolve(filePath)).then(cb).catch(cb)
    }

    ffmpeg(videoFilePath)
        .output(cropFilePath)
        .setStartTime(startTime)
        .setDuration(duration)
        .on('error', cropCallBack)
        .on('end', cropCallBack)
        .run();
}