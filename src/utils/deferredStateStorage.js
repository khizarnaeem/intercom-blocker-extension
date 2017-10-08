// @flow
declare var chrome: any

export default (delay: number = 1000) => {
  let pendingState: null | dataObject = null
  let timerId: number

  return {
    set(dataObject) {
      if (pendingState === null) {
        timerId = window.setTimeout(() => {
          chrome.storage.sync.set(pendingState, () => {
            window.clearTimeout(timerId)
            pendingState = null
          })
        }, delay)
      }

      pendingState = dataObject
    },

    get(query) {
      chrome.storage.sync.get(query, (response) => {
        console.log(response);
        return response;
      })
    }
  }
}
