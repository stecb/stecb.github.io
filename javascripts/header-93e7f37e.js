!function(){SCB.header={init:function(){return this.jobs=$("#jobs"),this["switch"]=$(".switch-theme"),this.who=$("#who"),this.mainLinks=$("#main-links-fixed"),this.setWindowScroll(),this.initalizedJobImages=!1},setTilt:function(){return this},checkSectionsScroll:function(s){return!this.initalizedJobImages&&s>this.jobs.offset().top&&(this.initalizedJobImages=!0,$.each(this.jobs.find("img"),function(){var s;return s=$(this),s.attr("src",s.data("src"))})),s>this.who.offset().top-40?(this.mainLinks.addClass("pinned"),this["switch"].addClass("pinned")):(this.mainLinks.removeClass("pinned"),this["switch"].removeClass("pinned")),this},setWindowScroll:function(){var s,o,t,i,n,r,l,e,a,c,u,m,h,f,d,g,T=this;return s=$(window),l=$(".img-src:first"),r=$(".img-blurry"),f=$("header > .container"),i=$(".btn-custom"),t=$("section#main > .container-fluid"),n=$(".btn-go-top"),u={scrollingBlurTo:200,scrollingYValueTo:400,scrollingBlurTitleFrom:0,yValueTarget:30},e=0,a=0,c=0,o=null,h=!1,d=function(){var s,m,h,d,g,p,w,b,$;return d=o,d=0>d?0:d,T.checkSectionsScroll(d),g=d<u.scrollingBlurTitleFrom?0:d>u.scrollingYValueTo?u.scrollingYValueTo:d,p=d>u.scrollingYValueTo?u.scrollingYValueTo:d,d=d>u.scrollingBlurTo?u.scrollingBlurTo:d,s=+(d/u.scrollingBlurTo).toFixed(2),$=~~-(p/u.scrollingYValueTo*u.yValueTarget),m=1-g/u.scrollingYValueTo,h=m/10+.9,o>50?(t.addClass("scrolled"),n.fadeIn()):(t.removeClass("scrolled"),n.fadeOut()),a!==m&&(i.css("opacity",m),f.css("opacity",m),a=m),e!==s&&(r.css("opacity",s),e=s),c!==$?(w="translate3d(0,"+-$+"px,0)",b="translate3d(0,"+$+"px,0) scale("+h+")",r.css({"-webkit-transform":w,"-ms-transform":w,"-moz-transform":w,transform:w}),l.css({"-webkit-transform":w,"-ms-transform":w,"-moz-transform":w,transform:w}),f.css({"-webkit-transform":b,"-ms-transform":b,"-moz-transform":b,transform:b}),c=$):void 0},g=function(){return d(),h=!1},m=function(){return h?void 0:(requestAnimFrame(g),h=!0)},s.on("scroll",function(){return o=s.scrollTop(),m()}),s.on("touchmove",function(){return o=s.scrollTop(),d()})}}}.call(this);