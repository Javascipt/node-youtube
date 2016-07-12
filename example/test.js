var rub = require('../script.js');

rub('https://www.youtube.com/watch?v= ???')
    .snapshot('0:22', 'file.jpg', ['--format=18'])
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });

