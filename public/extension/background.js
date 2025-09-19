const WEB_APP_URL = 'http://localhost:9002';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'mindbridge-transform',
    title: 'Transform with MindBridge AI',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'mindbridge-transform' && info.selectionText) {
    const text = encodeURIComponent(info.selectionText);
    const url = `${WEB_APP_URL}/?text=${text}`;
    chrome.tabs.create({ url: url });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: WEB_APP_URL });
});
