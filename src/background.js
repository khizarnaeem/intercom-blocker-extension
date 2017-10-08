// @flow
declare var chrome: any
import deferredStateStorage from './utils/deferredStateStorage'
import GA from './utils/tracking'

chrome.storage.sync.get(({IntercomBlockerStats, IntercomBlockerSettings}) => {
  const blockPopups = IntercomBlockerSettings.blockPopup;
  const storage = deferredStateStorage()
  const analytics = GA()

  if (!IntercomBlockerStats) {
    storage.set({ 'IntercomBlockerStats': {'totalBlocked': 0}});
    storage.set({ 'IntercomBlockerSettings': {'blockPopup': true}});
  }

  /**
   * Retrieve saved bytes info from response headers, update statistics in
   * app storage and notify UI about state changes.
   */
  function onCompletedListener({responseHeaders, url}) {
    if (url.includes("intercom")) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (blockPopups) chrome.tabs.sendMessage(tabs[0].id, {type: "blockPopup"}, function(response) {});
      });
    }
  }

  function onMessageRecieved(request, sender, sendResponse) {
    storage.set({'IntercomBlockerStats': { 'totalBlocked': IntercomBlockerStats.totalBlocked += 1}});
    analytics.sendEvent(request.eventData);
  }

  chrome.webRequest.onCompleted.addListener(
    onCompletedListener,
    {
      urls: ['<all_urls>'],
      types: ['script']
    },
    ['responseHeaders'],
  )

  chrome.runtime.onMessage.addListener(onMessageRecieved);
})
