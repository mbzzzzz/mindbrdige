// This is the service worker for the MindBridge AI Chrome Extension.
// It will handle background tasks, such as communication with AI services
// and managing user preferences.

chrome.runtime.onInstalled.addListener(() => {
  console.log('MindBridge AI Extension Installed.');
});
