!function(){SCB.header={setWindowScroll:function(){var r,o,l,n,s,t,a,i,e,c,u,m;return r=$(window),n=$(".img-src:first"),l=$(".img-blurry"),u=$("header > .container"),i={scrollingBlurTo:150,scrollingYValueTo:300,scrollingBlurTitleFrom:180,yValueTarget:30},s=0,t=0,a=0,o=null,c=!1,m=function(){var r,e,m,f,g,T,d,V;return m=o,m=0>m?0:m,f=m<i.scrollingBlurTitleFrom?0:m>i.scrollingYValueTo?i.scrollingYValueTo:m,g=m>i.scrollingYValueTo?i.scrollingYValueTo:m,m=m>i.scrollingBlurTo?i.scrollingBlurTo:m,r=+(m/i.scrollingBlurTo).toFixed(2),e=.5-f/i.scrollingYValueTo,V=~~-(g/i.scrollingYValueTo*i.yValueTarget),t!==e&&(t=e),s!==r&&(l.css("opacity",r),s=r),a!==V&&(T="translate3d(0,"+-V+"px,0)",d="translate3d(0,"+V.toFixed(2)+"px,0)",l.css({"-webkit-transform":T,"-ms-transform":T,"-moz-transform":T,transform:T}),n.css({"-webkit-transform":T,"-ms-transform":T,"-moz-transform":T,transform:T}),u.css({"-webkit-transform":d,"-ms-transform":d,"-moz-transform":d,transform:d}),a=V),c=!1},e=function(){return c?void 0:(requestAnimFrame(m),c=!0)},r.on("scroll",function(){return o=r.scrollTop(),e()})}}}.call(this);