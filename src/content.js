// @flow
declare var chrome: any

const delay = 1500;
let intercomContainer = document.getElementById("intercom-container");
let timerId: number

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "blockPopup") {
      sendResponse({status: 200});
      timerId = window.setTimeout(() => {
        intercomContainer = document.getElementById("intercom-container");
        if (intercomContainer !== null) {
          try {
            intercomContainer.remove();
            sendAnalytics();
          }
          catch (e) {
            // statements to handle any exceptions
          }
        }
        window.clearTimeout(timerId)
      }, delay);
    }
});

function sendAnalytics() {
  let data = {'type': 'recordAnalytics', eventData: { 'ibHost': window.location.host, 'ibTitle': document.title }};
  chrome.runtime.sendMessage(data, function(response) {});
}
