import './popup/index.css';

var popupStats = document.querySelector('#popups-btn');
var timeStats = document.querySelector('#time-btn');
var timeLabel = document.querySelector('#time-label');
var shareViaTwitter = document.querySelector('#btn-share-via-twitter');
var timeinMinutes = 0;
var timeinHours = 0;
var totalBlocked = 0;


chrome.storage.sync.get(({IntercomBlockerStats}) => {

  totalBlocked = IntercomBlockerStats.totalBlocked;
  timeinMinutes = (totalBlocked*3);
  timeinHours = (parseFloat(timeinMinutes)/60).toFixed(1);

  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    popupStats.innerText = IntercomBlockerStats.totalBlocked;
    timeStats.innerText = timeinMinutes;
    if (timeinMinutes > 500 ) {
      timeLabel.innerText = 'hours';
      timeStats.innerText = timeinHours;
    }
  })
});

shareViaTwitter.addEventListener("click", function(){
  var tweetline1 = 'I have blocked ' + totalBlocked + ' annoying intercom popups by using intercom blocker. My productivity net gain: ';
  var tweetline2 = timeinMinutes > 500 ? timeinHours : timeinMinutes;
  var tweetline3 = timeinMinutes > 500 ? ' hours': ' minutes'
  var tweetline4 = '. Thanks @woutlaban @khizarnaeem';
  var tweet = encodeURI(tweetline1+tweetline2+tweetline3+tweetline4);
  var _url = 'https://twitter.com/intent/tweet?text='+ tweet;
  chrome.tabs.create({ url: _url });
});
