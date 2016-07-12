var rub = require('../script.js');

rub('https://www.youtube.com/watch?v= ???')
    .snapshot('1:00', './file.jpg')
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });

