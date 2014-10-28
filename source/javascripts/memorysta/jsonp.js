// simple jsonp function, pass an url and callback.
// callback will be called w/ response as parameter
!(function(w){
  'use strict';
  w.jsonp = function(url, callback) {
    w.callbackJSONP = function(response) {
      callback(response);
    }
    var script = document.createElement('script');
    script.src = url + '&callback=callbackJSONP';
    document.body.appendChild(script);
  }
})(window);