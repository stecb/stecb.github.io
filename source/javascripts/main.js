//= require jquery
//= require jquery-knob
//= require perfect-scrollbar
//= require_directory ./plugins
//= require utils
//= require scroll
//= require app

!(function($){
  'use strict';

  // fire app on dom load
  $(function(){SCB.app.init()});
})(jQuery);