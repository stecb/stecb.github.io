/**
 * Copyright (C) 2014 by Stefano Ceschi Berrini, @stecb
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

!(function($, w){

  'use strict';


  var COVER_TOP_THRESHOLD = 200,
      COVER_TITLE_VISIBLE_THRESHOLD = 150,
      COVER_TITLE_HIDDEN_THRESHOLD = 100,
      LANG_VISIBLE_THRESHOLD = 50,
      LANG_HIDDEN_THRESHOLD = 10,
      PINNED_ITEMS_THRESHOLD = 40
  ;

  // scroll object, all the scroll related stuff

  SCB.scroll = {



    // init method, call it when ready
    init: function() {
      // cache some elements
      this.initDOMcache();

      // instance vars
      this.initalizedJobImages = false;
      this.pinned = false;

      // set window scroll
      this.setWindowScroll();

      // reset on resize value of window height
      $(w).on('resize', SCB.helpers.throttle(function(){
        this.windowHeight = $(w).height();
      }.bind(this), 100));

      return this; //chain.a.bility
    },



    // cache some DOM elements needed for scrolling stuff
    initDOMcache: function (){
      // generic dom stuff
      this.windowHeight = $(w).height();
      this.jobs = $('#jobs');
      this.who = $('#who');
      this.switchTheme = $('.switch-theme');
      this.mainLinks = $('#main-links-fixed');
      this.mainLinksUl = $('#main-links-fixed ul');
      this.covers = $('.section-cover');
      this.langsItems = $('.langs-items');
      this.gotop = $('.btn-go-top');

      // header stuff
      this.header = {}
      this.header.DOM = {}
      this.header.options = {
        scrollingBlurTo        : 200,
        scrollingYValueTo      : 400,
        scrollingBlurTitleFrom : 0,
        yValueTarget           : 30,
        last_opacity           : 0,
        last_opacity_title     : 0,
        last_yValue            : 0
      }
      this.header.DOM.img_normal = $('.img-src:first');
      this.header.DOM.img = $('.img-blurry');
      this.header.DOM.title =  $('header > .container');
      this.header.DOM.discover_more = $('.btn-custom');
      this.header.DOM.content = $('section#main > .container-fluid');

      return this;
    },



    // covers on scroll
    checkCoversScroll : function(scroll) {
      var _this = this;

      $.each(this.covers, function(){
        var $c = $(this),
            ctop = $c.offset().top,
            cheight = $c.height()
        ;

        _this.mainLinksUl[scroll > ctop - COVER_TOP_THRESHOLD ? 'addClass' : 'removeClass']($c.data('menuitem'));
        $c[scroll > ctop - cheight - COVER_TITLE_VISIBLE_THRESHOLD ? 'addClass' : 'removeClass']('displayed');
        $c[scroll > ctop + cheight - COVER_TITLE_HIDDEN_THRESHOLD ? 'addClass' : 'removeClass']('off');
      });

      return this;
    },



    // langs on scroll
    checkLangsScroll : function(scroll) {
      var _this = this;
      
      $.each(this.langsItems, function() {
        var $l = $(this),
            ltop = $l.offset().top,
            lheight = $l.height()
        ;

        $l[scroll + _this.windowHeight > ltop + LANG_VISIBLE_THRESHOLD  ? 'addClass' : 'removeClass']('displayed');

        if(scroll > ltop + LANG_HIDDEN_THRESHOLD) {
          $l.removeClass('displayed');
        }
      }); 

      return this;
    },



    // jobs on scroll 
    checkJobsScroll : function(scroll) {
      if (!this.initalizedJobImages && scroll > this.jobs.offset().top) {
        this.initalizedJobImages = true;
        $.each(this.jobs.find('img'), function() {
          var $img = $(this);
          $img.attr('src', $img.data('src'));
          $img.hasClass('img-logo') && new RetinaImage(this);
        });
      }

      return this;
    },



    // check header scroll
    checkHeaderScroll : function(wscroll) {

      var o = this.header.options,
          DOM = this.header.DOM;

      var scroll = wscroll < 0 ? 0 : wscroll,
          scrollTitleVal =  scroll < o.scrollingBlurTitleFrom ? 0 : scroll > o.scrollingYValueTo ? o.scrollingYValueTo : scroll,
          scrollYVal = scroll > o.scrollingYValueTo ? o.scrollingYValueTo : scroll,
          scroll = scroll > o.scrollingBlurTo ? o.scrollingBlurTo : scroll,
          opacity = +(scroll / o.scrollingBlurTo).toFixed(2),
          yValue = ~~(-((scrollYVal / o.scrollingYValueTo) * o.yValueTarget)),
          opacityTitle = 1-(scrollTitleVal / o.scrollingYValueTo),
          scaleTitle = opacityTitle/10+0.9,
          translate = '',
          translateTitle = ''
      ;
      DOM.content[wscroll > 50 ? 'addClass' : 'removeClass']('scrolled');
      if (o.last_opacity_title !== opacityTitle) {
        DOM.discover_more.css('opacity', opacityTitle);
        DOM.title.css('opacity', opacityTitle);
        o.last_opacity_title = opacityTitle;
      }
      if (o.last_opacity !== opacity) {
        DOM.img.css('opacity', opacity);
        o.last_opacity = opacity;
      }
      if (o.last_yValue !== yValue) {
        translate = "translate3d(0," + (-yValue) + "px,0)";
        translateTitle = "translate3d(0," + yValue + "px,0) scale( " + scaleTitle + ")";
        DOM.img.css({
          "-webkit-transform" : translate,
          "-ms-transform"     : translate,
          "-moz-transform"    : translate,
          "transform"         : translate
        });
        DOM.img_normal.css({
          "-webkit-transform" : translate,
          "-ms-transform"     : translate,
          "-moz-transform"    : translate,
          "transform"         : translate
        });
        DOM.title.css({
          "-webkit-transform" : translateTitle,
          "-ms-transform"     : translateTitle,
          "-moz-transform"    : translateTitle,
          "transform"         : translateTitle
        });
          
        o.last_yValue = yValue;
      }
      
      return this;

    },



    // check elements on scroll
    checkElementsScroll : function(scroll) {
      this.checkJobsScroll(scroll)
          .checkLangsScroll(scroll)
          .checkCoversScroll(scroll)
          .checkHeaderScroll(scroll);
      // pinned stuff
      if (scroll > this.who.offset().top - PINNED_ITEMS_THRESHOLD) {
        this.mainLinks.addClass('pinned');
        this.switchTheme.addClass('pinned');
        this.gotop.fadeIn();
      } else {
        this.mainLinks.removeClass('pinned');
        this.switchTheme.removeClass('pinned');
        this.gotop.fadeOut();
      }

      return this;
    },



    // set main scroll 
    setWindowScroll : function() {
      var $w = $(w),
          ticking = false,
          wScroll = null,
          // called when ready to scroll
          update = function(){
            this.checkElementsScroll(wScroll);
          }.bind(this),
          // update tick and calling update function, ready to scroll
          updateTick = function() {
            update();
            ticking = false;
          },
          // requestTick, on animation frame call the updateTick fn
          requestTick = function() {
            if (!ticking) {
              requestAnimFrame(updateTick);
              ticking = true;
            }
          }
      ;
      // listen to the scroll event on window elem
      $w.on('scroll', function(){
        wScroll = $w.scrollTop();
        requestTick();
      });

      wScroll = $w.scrollTop();
      this.checkElementsScroll(wScroll);

      return this;
    }
    
    

  }
})(jQuery, this);