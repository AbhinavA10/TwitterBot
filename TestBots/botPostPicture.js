// Learnt from https://www.youtube.com/watch?v=mUoIPmZ4KwA&list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV&index=6
console.log("running");

var Twit = require('twit');

var config = require('../config');

var T = new Twit(config);
var fs = require('fs');
setInterval(tweetIt, 1000 * 60 * 60); // 1 hour
tweetIt();
function tweetIt() {
  var filename = 'testpics/wiki.png';
  var params = {
    encoding: 'base64'
  }
  var b64 = fs.readFileSync(filename, params);
  //need to upload media to twitter first, then tweet
  T.post('media/upload', {
    media_data: b64
  }, uploaded);

  function uploaded(err, data, response) {
    var id = data.media_id_string;
    var tweet = {
      status: '#codingrainbow live from node.js',
      media_ids: [id]
    }
    T.post('statuses/update', tweet, tweeted);

  }

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wwrong!");
    } else {
      console.log("It worked!");
    }
  }
};
