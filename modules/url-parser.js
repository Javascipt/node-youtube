var parser = require('url-parse');

module.exports = function (urlOrVidId) {
    var host = parser(urlOrVidId).host;
    
    if((host != 'youtube.com') && (host != 'youtu.be') && (host == urlOrVidId.toLowerCase())) {
        return 'https://youtu.be/' + urlOrVidId;
    } else if((host != 'youtube.com') && (host != 'youtu.be')) {
        throw new Error('The url specified isn\'t a Youtube video');
    }
    
    return urlOrVidId;
}