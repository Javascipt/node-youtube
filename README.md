Youtube to snapshots and GIFs.
================================================================

![youtube.com](https://api.travis-ci.org/Javascipt/node-youtube.svg)

Have you ever dreamt of creating a gif out of a youtube video ? Then you are in the right place

![GIF](https://www.dropbox.com/s/w7w870zd14jhr1x/file.gif?raw=1)

[GIF source](https://www.youtube.com/watch?v=ja8pA2B0RR4)

This package allows you to take a screenshot, a gif or a portion out of a youtube video.

This package is the son of these two amazing parents:

- [Youtube-dl package](https://github.com/fent/node-youtube-dl)
- [Fluent-ffmpeg package](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

### Dependencies:

> You need to get [ffmpeg](https://ffmpeg.org/) installed to start using this package.

## Installation :

```bash
  $ npm install youtube.com
```

## How does it work ?

Instantiate the `youtube` object :

```javascript
    var Youtube = require('youtube.com');
    
    // You can instantiate the youtube object using the video url
    var youtube = Youtube('http://www.youtube.com/watch?v=ategZqxHkz4');
    
    // or you can also specify the video id
    var youtube = Youtube('ategZqxHkz4');
```

####Crop a youtube video :

```javascript
    youtube.crop('0:05', '0:25', './file.mp4')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```

The `.crop()` method takes a 4th argument which is the format of the video to download example : `['--format=18']`
This format is exactly the same we specify when downloading a youtube video using the [Youtube-dl package](https://github.com/fent/node-youtube-dl). Make sure to take a look at it for more info.

####Take a screenshot :

```javascript
    youtube.snapshot('1:00', './file.jpg')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```

The `.snapshot()` method also takes the format as its 3rd argument.

####Creating a GIF :

```javascript
    youtube.gif('0:05', '0:35', './file.gif')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```
The `.gif()` method takes 2 more arguments, which are `size` and `fps`
- size : The hight and width of the final gif ex : `"600x300"`
- fps : an integer representing the fps of the final gif

You can find more details on these 2 arguments on the [Fluent-ffmpeg package](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

#### Downloading a video

```javascript
    youtube.download('file.mp4', format)
        .then(function () {
            console.log("done");
        });
```

Again, the format is the same as the one mentioned before.