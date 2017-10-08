// @flow
declare var chrome: any

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-107337644-1']);

export default (delay: number = 1000) => {

  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  return {
    sendEvent(event) {
      _gaq.push(['_trackEvent', event.data, 'blocked'])
    }
  }
}
