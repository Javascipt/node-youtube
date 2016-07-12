var rub = require('../script.js');

rub('https://www.youtube.com/watch?v=OmWydFGry10')
    .snapshot('0:02', './file.jpg')
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });

