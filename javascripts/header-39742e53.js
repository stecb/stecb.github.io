!function(){SCB.header={init:function(){var s=this;return this.windowHeight=$(window).height(),this.jobs=$("#jobs"),this["switch"]=$(".switch-theme"),this.who=$("#who"),this.mainLinks=$("#main-links-fixed"),this.setWindowScroll(),this.initalizedJobImages=!1,this.pinned=!1,this.covers=$(".section-cover"),this.checkSectionsScroll($(window).scrollTop()),$(window).on("resize",SCB.helpers.throttle(function(){return s.windowHeight=$(window).height()},100))},setTilt:function(){return this},checkCoversScroll:function(s){var i;return i=this,$.each(this.covers,function(){var i,o,t;return i=$(this),t=i.offset().top,o=i.height(),s>t-o-150?i.addClass("displayed"):i.removeClass("displayed"),s>t+o-100?i.addClass("off"):i.removeClass("off")}),this},checkSectionsScroll:function(s){return this.checkCoversScroll(s),!this.initalizedJobImages&&s>this.jobs.offset().top&&(this.initalizedJobImages=!0,$.each(this.jobs.find("img"),function(){var s;return s=$(this),s.attr("src",s.data("src")),s.hasClass("img-logo")?new RetinaImage(this):void 0})),s>this.who.offset().top-40?(this.mainLinks.addClass("pinned"),this["switch"].addClass("pinned")):(this.mainLinks.removeClass("pinned"),this["switch"].removeClass("pinned")),this},setWindowScroll:function(){var s,i,o,t,n,r,e,l,a,c,h,u,d,m,f,g,w=this;return s=$(window),e=$(".img-src:first"),r=$(".img-blurry"),m=$("header > .container"),t=$(".btn-custom"),o=$("section#main > .container-fluid"),n=$(".btn-go-top"),h={scrollingBlurTo:200,scrollingYValueTo:400,scrollingBlurTitleFrom:0,yValueTarget:30},l=0,a=0,c=0,i=null,d=!1,f=function(){var s,u,d,f,g,p,v,$,T;return f=i,f=0>f?0:f,w.checkSectionsScroll(f),g=f<h.scrollingBlurTitleFrom?0:f>h.scrollingYValueTo?h.scrollingYValueTo:f,p=f>h.scrollingYValueTo?h.scrollingYValueTo:f,f=f>h.scrollingBlurTo?h.scrollingBlurTo:f,s=+(f/h.scrollingBlurTo).toFixed(2),T=~~-(p/h.scrollingYValueTo*h.yValueTarget),u=1-g/h.scrollingYValueTo,d=u/10+.9,i>50?(o.addClass("scrolled"),n.fadeIn()):(o.removeClass("scrolled"),n.fadeOut()),a!==u&&(t.css("opacity",u),m.css("opacity",u),a=u),l!==s&&(r.css("opacity",s),l=s),c!==T?(v="translate3d(0,"+-T+"px,0)",$="translate3d(0,"+T+"px,0) scale("+d+")",r.css({"-webkit-transform":v,"-ms-transform":v,"-moz-transform":v,transform:v}),e.css({"-webkit-transform":v,"-ms-transform":v,"-moz-transform":v,transform:v}),m.css({"-webkit-transform":$,"-ms-transform":$,"-moz-transform":$,transform:$}),c=T):void 0},g=function(){return f(),d=!1},u=function(){return d?void 0:(requestAnimFrame(g),d=!0)},s.on("scroll",function(){return i=s.scrollTop(),u()}),s.on("touchmove",function(){return i=s.scrollTop(),f()})}}}.call(this);