!function(){SCB.header={init:function(){return this.jobItems=$(".job-item"),this.jobImgContainers=$(".job-img-container")},setTilt:function(){return this},checkSectionsScroll:function(o){return $.each(this.jobItems.not(".displayed"),function(){var r,t;return r=$(this),t=r.offset().top+150,t>o&&t<o+$(window).height()?r.addClass("displayed"):void 0}),$.each(this.jobImgContainers.not(".displayed"),function(){var r,t;return r=$(this),t=r.offset().top+100,t>o&&t<o+$(window).height()?r.addClass("displayed"):void 0}),this},setWindowScroll:function(){var o,r,t,n,s,i,l,e,a,c,u,m,d,f,g,h,T=this;return o=$(window),l=$(".img-src:first"),i=$(".img-blurry"),f=$("header > .container"),n=$(".btn-custom"),t=$("section#main > .container-fluid"),s=$(".btn-go-top"),u={scrollingBlurTo:200,scrollingYValueTo:400,scrollingBlurTitleFrom:0,yValueTarget:30},e=0,a=0,c=0,r=null,d=!1,g=function(){var o,m,d,g,h,$,p,b,v;return g=r,g=0>g?0:g,T.checkSectionsScroll(g),h=g<u.scrollingBlurTitleFrom?0:g>u.scrollingYValueTo?u.scrollingYValueTo:g,$=g>u.scrollingYValueTo?u.scrollingYValueTo:g,g=g>u.scrollingBlurTo?u.scrollingBlurTo:g,o=+(g/u.scrollingBlurTo).toFixed(2),v=~~-($/u.scrollingYValueTo*u.yValueTarget),m=1-h/u.scrollingYValueTo,d=m/10+.9,r>50?(t.addClass("scrolled"),s.fadeIn()):(t.removeClass("scrolled"),s.fadeOut()),a!==m&&(n.css("opacity",m),f.css("opacity",m),a=m),e!==o&&(i.css("opacity",o),e=o),c!==v?(p="translate3d(0,"+-v+"px,0)",b="translate3d(0,"+v+"px,0) scale("+d+")",i.css({"-webkit-transform":p,"-ms-transform":p,"-moz-transform":p,transform:p}),l.css({"-webkit-transform":p,"-ms-transform":p,"-moz-transform":p,transform:p}),f.css({"-webkit-transform":b,"-ms-transform":b,"-moz-transform":b,transform:b}),c=v):void 0},h=function(){return g(),d=!1},m=function(){return d?void 0:(requestAnimFrame(h),d=!0)},o.on("scroll",function(){return r=o.scrollTop(),m()}),o.on("touchmove",function(){return r=o.scrollTop(),g()})}}}.call(this);