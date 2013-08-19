"use strict";

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('simple.html', {
      'id': 'main-view',
    'width': 700,
    'height': 500,
  });
});
