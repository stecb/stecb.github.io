!function(){SCB.header={setTilt:function(){return this},setWindowScroll:function(){var r,o,l,n,s,t,i,a,e,c,u,m,f;return r=$(window),s=$(".img-src:first"),n=$(".img-blurry"),m=$("header > .container"),l=$(".btn-custom"),e={scrollingBlurTo:150,scrollingYValueTo:300,scrollingBlurTitleFrom:180,yValueTarget:30},t=0,i=0,a=0,o=null,u=!1,f=function(){var r,c,f,g,T,d,V,B;return f=o,f=0>f?0:f,g=f<e.scrollingBlurTitleFrom?0:f>e.scrollingYValueTo?e.scrollingYValueTo:f,T=f>e.scrollingYValueTo?e.scrollingYValueTo:f,f=f>e.scrollingBlurTo?e.scrollingBlurTo:f,r=+(f/e.scrollingBlurTo).toFixed(2),B=~~-(T/e.scrollingYValueTo*e.yValueTarget),c=1-g/e.scrollingYValueTo,i!==c&&(l.css("opacity",c),i=c),t!==r&&(n.css("opacity",r),t=r),a!==B&&(d="translate3d(0,"+-B+"px,0)",V="translate3d(0,"+B.toFixed(2)+"px,0)",n.css({"-webkit-transform":d,"-ms-transform":d,"-moz-transform":d,transform:d}),s.css({"-webkit-transform":d,"-ms-transform":d,"-moz-transform":d,transform:d}),m.css({"-webkit-transform":V,"-ms-transform":V,"-moz-transform":V,transform:V}),a=B),u=!1},c=function(){return u?void 0:(requestAnimFrame(f),u=!0)},r.on("scroll",function(){return o=r.scrollTop(),c()})}}}.call(this);