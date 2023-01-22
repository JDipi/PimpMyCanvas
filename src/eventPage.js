chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // enables the page action label on the right pages
  if (request.todo == "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.action.show(tabs[0].id);
      chrome.tabs.sendMessage(
        tabs[0].id,
        { todo: "showPopup" },
      );

      // clears storage keys between refreshes
      // chrome.storage.sync.remove([
      //   // "toggleElim",
      //   "toggleWikipedia",
      //   "wikiSearchTerm",
      //   "toggleUnused",
      //   "toggleNotes",
      //   "toggleDocs",
      //   "toggleStorage",
      //   "toggleDesmos",
      // ]);
    });
  }
});
