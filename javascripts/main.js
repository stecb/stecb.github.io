(function() {
  SCB.header = {
    setWindowScroll: function() {
      var area, areaScroll, img, img_normal, last_opacity, last_opacity_title, last_yValue, o, requestTick, ticking, title, update,
        _this = this;
      area = $(window);
      img_normal = $('.img-src:first');
      img = $('.img-blurry');
      title = $('header > .container');
      o = {
        scrollingBlurTo: 150,
        scrollingYValueTo: 300,
        scrollingBlurTitleFrom: 180,
        yValueTarget: 40
      };
      last_opacity = 0;
      last_opacity_title = 0;
      last_yValue = 0;
      areaScroll = null;
      ticking = false;
      update = function() {
        var opacity, opacityTitle, scroll, scrollTitleVal, scrollYVal, translate, yValue;
        scroll = areaScroll;
        scroll = scroll < 0 ? 0 : scroll;
        scrollTitleVal = scroll < o.scrollingBlurTitleFrom ? 0 : scroll > o.scrollingYValueTo ? o.scrollingYValueTo : scroll;
        scrollYVal = scroll > o.scrollingYValueTo ? o.scrollingYValueTo : scroll;
        scroll = scroll > o.scrollingBlurTo ? o.scrollingBlurTo : scroll;
        opacity = +(scroll / o.scrollingBlurTo).toFixed(2);
        opacityTitle = 1 - (scrollTitleVal / o.scrollingYValueTo);
        yValue = ~~(-((scrollYVal / o.scrollingYValueTo) * o.yValueTarget));
        if (last_opacity_title !== opacityTitle) {
          title.css('opacity', opacityTitle);
          last_opacity_title = opacityTitle;
        }
        if (last_opacity !== opacity) {
          img.css('opacity', opacity);
          last_opacity = opacity;
        }
        if (last_yValue !== yValue) {
          translate = "translate3d(0," + yValue + "px,0)";
          img.css({
            "-webkit-transform": translate,
            "-ms-transform": translate,
            "-moz-transform": translate,
            "transform": translate
          });
          img_normal.css({
            "-webkit-transform": translate,
            "-ms-transform": translate,
            "-moz-transform": translate,
            "transform": translate
          });
          title.css({
            "-webkit-transform": translate,
            "-ms-transform": translate,
            "-moz-transform": translate,
            "transform": translate
          });
          last_yValue = yValue;
        }
        return ticking = false;
      };
      requestTick = function() {
        if (!ticking) {
          requestAnimFrame(update);
          return ticking = true;
        }
      };
      return area.on('scroll', function() {
        areaScroll = area.scrollTop();
        return requestTick();
      });
    }
  };

}).call(this);
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
(function() {
  SCB.header.setWindowScroll();

}).call(this);
