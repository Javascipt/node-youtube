var Youtube = require('../');
var youtube = Youtube('3I78ELjTzlQ')
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('Testing main features (crop, snapshot, GIF, download)', function () {
    
    describe('Testing snapshots', function () {
        var filePath = path.resolve(__dirname, 'snap.png');
        
        beforeEach(function (done) {
            this.timeout(180000)
            youtube.snapshot('0:02', filePath)
                .then(done);
        });
        
        it('Should take snapshot from the video at 0:02', function () {
            assert.equal(true, fs.statSync(filePath).size > 0);
            fs.unlink(filePath);
        });
    });
    
    describe('Testing GIFs taking', function () {
        var filePath = path.resolve(__dirname, 'file.gif');
        
        beforeEach(function (done) {
            this.timeout(180000)
            youtube.gif('0:02', '0:05', filePath)
                .then(done);
        });
        
        it('Should take gif from the video between 0:02 and 0:05', function () {
            assert.equal(true, fs.statSync(filePath).size > 0);
            fs.unlink(filePath);
        });
    });
    
    describe('Testing crop', function () {
        var filePath = path.resolve(__dirname, 'video.mp4');
        
        beforeEach(function (done) {
            this.timeout(180000)
            youtube.crop('0:00', '0:05', filePath)
                .then(done);
        });
        
        it('Should download just a part from the video', function () {
            assert.equal(true, fs.statSync(filePath).size > 0);
            fs.unlink(filePath);
        });   
    });
    
    describe('Testing download', function () {
        var filePath = path.resolve(__dirname, 'video.mp4');
        
        beforeEach(function (done) {
            this.timeout(180000)
            youtube.download(filePath)
                .then(done);
        });
        
        it('Should download the video', function () {
            assert.equal(true, fs.statSync(filePath).size > 0);
            fs.unlink(filePath);
        });    
    });
    
})