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
