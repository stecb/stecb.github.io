(function() {
  window.log = function() {
    log.history = log.history || [];
    log.history.push(arguments);
    arguments.callee = arguments.callee.caller;
    if (this.console) {
      console.log(Array.prototype.slice.call(arguments));
    }
  };

  window.performance = window.performance || {};

  performance.now = (function() {
    return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return new Date().getTime();
    };
  })();

  
window.isIE = (function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();
;

  SCB.helpers = {
    throttle: function(fn, time) {
      var last, timeout;
      if (time == null) {
        time = 100;
      }
      timeout = null;
      last = null;
      return function() {
        var args, now, _t;
        now = +new Date();
        _t = this;
        args = arguments;
        if (last && (now < (last + time))) {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            last = now;
            return fn.apply(_t, args);
          }, time);
        } else {
          last = now;
          fn.apply(this, args);
        }
        return null;
      };
    }
  };

}).call(this);
