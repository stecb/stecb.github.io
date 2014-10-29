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
!function(i){"use strict";var t="#ccc",s="#c7c8ff",o="#9495ff",n="#80c780",e="#5cb85c",a=400;SCB.app={init:function(){return SCB.scroll.init(),this.initBody(),this.initLangs(),this.initJobs(),"build"===SCB.env&&i("#link_download_cv").on("click",function(){ga("send","event","button","click","download-cv")}),this},initBody:function(){var t=window.location.hash,s=i("#who"),o=i("body"),n=i("body, html"),e=i(".img-wrapper");this.is_touch=SCB.is_touch_device,this.is_touch&&i("body").addClass("has-touch-support"),o.on("click",".links-horizontal a",function(t){t.preventDefault();var s=i(t.target).is("a")?i(t.target):i(t.target).parents("a"),o=i(s.attr("href"));n.animate({scrollTop:o.offset().top},1e3)}).on("click",".btn-go-top",function(){SCB.is_mobile?n.scrollTop(0):n.animate({scrollTop:0},1e3)}).on("click","header .btn-custom",function(i){i.preventDefault(),n.animate({scrollTop:s.offset().top},1e3)}).on("click",".switch-theme, .hidden-dark, .visible-dark",function(){o.toggleClass("is-dark"),e.removeClass("flipInX flipInY"),o.hasClass("is-dark")?(window.location.hash="dark",e.addClass("flipInY")):(window.location.hash="light",e.addClass("flipInX"))}).magnificPopup({delegate:".mfp-open",gallery:{enabled:!0}}),"#dark"===t&&o.addClass("is-dark")},initLangs:function(){i.each(i(".langs-items li input"),function(){var a=i(this),r=a.val(),h=t;r>30&&50>=r?h=s:r>50&&70>=r?h=o:r>70&&90>r?h=n:r>=90&&(h=e),a.knob({readOnly:!0,fgColor:h,thickness:"0.1",draw:function(){this.cursorExt=.3;var i=this.arc(this.cv),t=null,s=1;return this.g.lineWidth=this.lineWidth,this.o.displayPrevious&&(t=this.arc(this.v),this.g.beginPath(),this.g.strokeStyle=this.pColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,t.s,t.e,t.d),this.g.stroke()),this.g.beginPath(),this.g.strokeStyle=s?this.o.fgColor:this.fgColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,i.s,i.e,i.d),this.g.stroke(),this.g.lineWidth=2,this.g.beginPath(),this.g.strokeStyle=this.o.fgColor,this.g.arc(this.xy,this.xy,this.radius-this.lineWidth+1+2*this.lineWidth/3,0,2*Math.PI,!1),this.g.stroke(),!1}})}),!this.is_touch&&i(".langs").perfectScrollbar({suppressScrollY:!0})},initJobs:function(){var t=i("#jobs").find(".job-item"),s=i("#jobs").find(".jobs-container-wrapper"),o=s.width(),n=this.is_touch?".job-item":".btn-job-open-more-big";this.is_touch||(i(".jobs-container").perfectScrollbar({suppressScrollY:!0}),i(".job-img").perfectScrollbar({suppressScrollY:!0})),i("#jobs").on("click",n,function(n){var e=i(n.target).is(".job-item")?i(n.target):i(n.target).parents(".job-item");e.data("is-open")?(e.removeClass("open"),e.data("is-open",!1),s.width(o)):(t.removeClass("open"),t.data("is-open",!1),e.addClass("open"),e.data("is-open",!0),s.width(o+a))})}}}(jQuery,this);