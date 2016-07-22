var youtube = require('..');

youtube(' ??? ')
    .download('file.mp4')
    .then(function () {
        console.log("Done");
    });