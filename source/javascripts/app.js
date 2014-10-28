!(function($, w){

  'use strict';

  var BASICS_KNOB_COLOR = '#ccc',
      LOW_KNOB_COLOR = "#c7c8ff",
      UNI_KNOB_COLOR = "#9495ff",
      MASTER_KNOB_COLOR = "#80c780",
      NINJA_KNOB_COLOR = "#5cb85c",
      DEFAULT_OPENED_JOB_WIDTH = 400
  ;


  SCB.app = {



    init : function() {
      // init scroll obj
      SCB.scroll.init();

      // init some stuff
      this.initBody();
      this.initLangs();
      this.initJobs();

      // analytics, how many ppz download cv, if on build(production) env
      if(SCB.env === 'build') {
        $('#link_download_cv').on('click', function(){
          ga('send', 'event', 'button', 'click', 'download-cv');
        });
      }

      return this; // chain.a.bility
    },



    // all the body stuff (+ delegation)
    initBody : function() {
      var h = window.location.hash,
          $who = $('#who'),
          $body = $('body'),
          $ba = $('body, html'),
          $imgWrapper = $('.img-wrapper')
      ;

      this.is_touch = SCB.is_touch_device;
      this.is_touch && $('body').addClass('has-touch-support');

      $body
        .on('click', '.links-horizontal a', function(evt){
          evt.preventDefault();
          var $target = $(evt.target).is('a') ? $(evt.target) : $(evt.target).parents('a'),
              $to = $($target.attr('href'))
          ;
          $ba.animate({
            scrollTop: $to.offset().top
          }, 1000);
        })
        .on('click', '.btn-go-top', function(evt){
          if(SCB.is_mobile) {
            $ba.scrollTop(0);
          } else {
            $ba.animate({
              scrollTop: 0
            }, 1000);  
          }
        })
        .on('click', 'header .btn-custom', function(evt){
          evt.preventDefault();
          $ba.animate({
            scrollTop: $who.offset().top
          }, 1000);
        })
        .on('click', '.switch-theme, .hidden-dark, .visible-dark', function(evt){
          $body.toggleClass('is-dark');
          $imgWrapper.removeClass('flipInX flipInY');
          if($body.hasClass('is-dark')) {
            window.location.hash = 'dark';
            $imgWrapper.addClass('flipInY');
          } else {
            window.location.hash = 'light';
            $imgWrapper.addClass('flipInX');
          } 
        })
        .magnificPopup({
          delegate: '.mfp-open',
          gallery: { enabled: true }
        });

      (h === '#dark') && $body.addClass('is-dark');

    },



    // langs stuff (knobs + scrollbar)
    initLangs: function() {

      $.each($('.langs-items li input'), function(){
        var $elem = $(this),
            val = $elem.val(),
            color = BASICS_KNOB_COLOR
        ;
        if(val > 30 && val <= 50) {
          color = LOW_KNOB_COLOR
        } else if(val > 50 && val <= 70) {
          color = UNI_KNOB_COLOR
        } else if(val > 70 && val < 90){
          color = MASTER_KNOB_COLOR
        } else if(val >= 90){
          color = NINJA_KNOB_COLOR
        }

        $elem.knob({
          readOnly  : true,
          fgColor   : color,
          thickness : '0.1',
          draw      : function() {
            this.cursorExt = 0.3;

            var a = this.arc(this.cv),
                pa = null,
                r = 1
            ;

            this.g.lineWidth = this.lineWidth;

            if(this.o.displayPrevious){
              pa = this.arc(this.v);
              this.g.beginPath();
              this.g.strokeStyle = this.pColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
              this.g.stroke();
            }

            this.g.beginPath();
            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
            this.g.stroke();

            this.g.lineWidth = 2;
            this.g.beginPath();
            this.g.strokeStyle = this.o.fgColor;
            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
            this.g.stroke();

            return false;
          }
        });
          
      });
        

      !this.is_touch && $('.langs').perfectScrollbar({suppressScrollY: true});
      
    },



    // jobs stuff (click handling to show more info + scrollbar)
    initJobs : function() {
      var $all_jobs = $('#jobs').find('.job-item'),
          $jobs_scrollable = $('#jobs').find('.jobs-container-wrapper'),
          original_width = $jobs_scrollable.width(),
          selector = this.is_touch ? '.job-item' : '.btn-job-open-more-big'
      ;

      if(!this.is_touch) {
        $('.jobs-container').perfectScrollbar({suppressScrollY: true});
        $('.job-img').perfectScrollbar({suppressScrollY: true});
      }
      
      $('#jobs').on('click', selector, function(evt) {
        var $j = $(evt.target).is('.job-item') ? $(evt.target) : $(evt.target).parents('.job-item');
        if($j.data('is-open')) {
          $j.removeClass('open');
          $j.data('is-open', false);
          $jobs_scrollable.width(original_width);
        } else {
          $all_jobs.removeClass('open');
          $all_jobs.data('is-open', false);
          $j.addClass('open');
          $j.data('is-open', true);
          $jobs_scrollable.width(original_width + DEFAULT_OPENED_JOB_WIDTH);
          // if(SCB.is_mobile) {
          //   $jobs_scrollable.parent().animate({
          //     scrollLeft: $j.position().left
          //   });
          // }
        }
      });
        
    }



  }
})(jQuery, this);