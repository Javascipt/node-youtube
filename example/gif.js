
var rub = require('../script.js');

rub('https://www.youtube.com/watch?v= ????')
    .gif('0:05', '0:35', './file.gif')
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });

