!function(){SCB.header={init:function(){return this.jobItems=$(".job-item"),this.jobImgContainers=$(".job-img-container"),this.mainCategories=$("#who section, #life section, #tech section, #additional section"),this.langs=$(".langs-items li .level"),this.who=$("#who"),this.mainLinks=$("#main-links-fixed"),this.mainLinksStatic=$("#main-links")},setTilt:function(){return this},checkSectionsScroll:function(i){return $.each(this.jobItems.not(".displayed"),function(){var s,t;return s=$(this),t=s.offset().top+150,t>i&&t<i+$(window).height()?s.addClass("displayed"):void 0}),$.each(this.jobImgContainers.not(".displayed"),function(){var s,t;return s=$(this),t=s.offset().top+100,t>i&&t<i+$(window).height()?s.addClass("displayed"):void 0}),$.each(this.mainCategories.not(".displayed"),function(){var s,t;return s=$(this),t=s.offset().top+100,t>i&&t<i+$(window).height()?s.addClass("displayed"):void 0}),$.each(this.langs.not(".displayed"),function(){var s,t;return s=$(this),t=s.offset().top+20,t>i&&t<i+$(window).height()?s.addClass("displayed"):void 0}),i>this.who.offset().top-40?(this.mainLinks.addClass("pinned"),this.mainLinksStatic.addClass("transparent")):(this.mainLinks.removeClass("pinned"),this.mainLinksStatic.removeClass("transparent")),this},setWindowScroll:function(){var i,s,t,n,o,r,e,a,l,c,d,u,m,h,f,g,p=this;return i=$(window),e=$(".img-src:first"),r=$(".img-blurry"),h=$("header > .container"),n=$(".btn-custom"),t=$("section#main > .container-fluid"),o=$(".btn-go-top"),d={scrollingBlurTo:200,scrollingYValueTo:400,scrollingBlurTitleFrom:0,yValueTarget:30},a=0,l=0,c=0,s=null,m=!1,f=function(){var i,u,m,f,g,$,w,T,v;return f=s,f=0>f?0:f,p.checkSectionsScroll(f),g=f<d.scrollingBlurTitleFrom?0:f>d.scrollingYValueTo?d.scrollingYValueTo:f,$=f>d.scrollingYValueTo?d.scrollingYValueTo:f,f=f>d.scrollingBlurTo?d.scrollingBlurTo:f,i=+(f/d.scrollingBlurTo).toFixed(2),v=~~-($/d.scrollingYValueTo*d.yValueTarget),u=1-g/d.scrollingYValueTo,m=u/10+.9,s>50?(t.addClass("scrolled"),o.fadeIn()):(t.removeClass("scrolled"),o.fadeOut()),l!==u&&(n.css("opacity",u),h.css("opacity",u),l=u),a!==i&&(r.css("opacity",i),a=i),c!==v?(w="translate3d(0,"+-v+"px,0)",T="translate3d(0,"+v+"px,0) scale("+m+")",r.css({"-webkit-transform":w,"-ms-transform":w,"-moz-transform":w,transform:w}),e.css({"-webkit-transform":w,"-ms-transform":w,"-moz-transform":w,transform:w}),h.css({"-webkit-transform":T,"-ms-transform":T,"-moz-transform":T,transform:T}),c=v):void 0},g=function(){return f(),m=!1},u=function(){return m?void 0:(requestAnimFrame(g),m=!0)},i.on("scroll",function(){return s=i.scrollTop(),u()}),i.on("touchmove",function(){return s=i.scrollTop(),f()})}}}.call(this);