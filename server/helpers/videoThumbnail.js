const { spawn } = require('child_process');
const { createWriteStream } = require('fs');

const VideoDetails = require('../models/VideoDetails');
const port = require('../configs/default').port;

const ffmpegPath = 'C:\FFmpeg';
const width = 256;
const height = 144;

const generateThumbnail = (target, title, username) => {
    // rplacing the title with nothing
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  const ffmpeg = spawn(ffmpegPath, [
    '-ss',
    0,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
  ffmpeg.stdout.pipe(tmpFile);
//   saving data into our database using the schema that we created before
  const videoDetails = new VideoDetails({
    uploader_name: username,
    upload_title: title,
    video_path: target,
    // saving also the url in database
    thumbnail_path: 'http://127.0.0.1:' + port + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
  });
//   saving th details into database 
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  generateThumbnail: generateThumbnail
}