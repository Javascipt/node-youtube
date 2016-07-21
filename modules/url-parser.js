var parser = require('url-parse');

module.exports = function (urlOrVidId) {
    var host = parser(urlOrVidId).host;
    
    if((host != 'youtube.com') && (host != 'youtu.be') && (host != 'www.youtube.com') && (host != 'www.youtu.be') && (host == urlOrVidId.toLowerCase())) {
        return 'https://youtu.be/' + urlOrVidId;
    }
    
    return urlOrVidId;
}