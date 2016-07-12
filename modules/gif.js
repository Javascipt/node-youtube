var ffmpeg      = require('fluent-ffmpeg');
var path        = require('path');
var fs          = require('fs');
var startPath   = require('./startpath')

module.exports = function (videoFilePath, filePath, startTime, duration, size, ifps, cb) {
    startPath().then(function (stpath) {
        var ws  = fs.createWriteStream( path.resolve(stpath, filePath));
        var f   = ffmpeg(videoFilePath)
            .format('gif')
            .setStartTime(startTime)
            .duration(duration);

        size && f.size(size);
        ifps && f.inputFPS(ifps);
        
        f.on('error', cb)
            .on('end', cb)
            .writeToStream(ws, { end: true });
    }).catch(cb)
}