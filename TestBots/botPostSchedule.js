console.log("running");

var Twit = require('twit');

var config = require('../config');

var T = new Twit(config);

setInterval(tweetIt, 1000 * 60 * 60); // 1 hour

//  tweet 'hello world!'
function tweetIt() {

  var r = Math.floor(Math.random() * 100);

  var tweet = {
    status: 'Random number: ' + r,
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wrong!");
    } else {
      console.log("it worked!");
    }
  };
};
