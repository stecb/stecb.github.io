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
!function(t){"use strict";var e="{{href}} I played #MemorYsta and scored {{points}} points in {{time}}!! Can you beat me?",s=1e3,i=1e3,n="msta-card",a="https://api.instagram.com/v1/tags/{{tag}}/media/recent",o="f3a1200e40454386afcf89918e8e63c0",d='<div data-refid="{{refid}}" class="'+n+' flip-container"><div class="flipper"><div class="front"></div><div class="back"><img src="{{src}}" alt="{{alt}}" /></div></div></div>',c=function(t,e){this.gid=Math.floor(1e11*Math.random())+1,this.gameDOM=document.createElement("div"),this.gameDOM.id="game"+this.gid,this.gameOptionsDOM=e.gameOptionsDOM,t.innerHTML="",t.appendChild(this.gameDOM),this.board=t.parentElement,this.points=0,this.tag=e.hash,this.timeouts={resetDone:null,resetShow:null,timer:null},this.options={count:"easy"===e.level?6:"medium"===e.level?10:15,client_id:o},this.DOM={time:e.timeDOM,points:e.pointsDOM},document.getElementById("tag-placeholder").innerHTML="<small>#"+this.tag+"</small>",this.board.style.display="block",document.body.classList.remove("won"),document.body.classList.remove("end"),setTimeout(function(){document.body.classList.add("playing")}.bind(this),50)};c.prototype.won=function(){var t=e.replace("{{href}}","http://stecb.ninja/memorysta"+window.location.hash).replace("{{points}}",this.points).replace("{{time}}",this.DOM.time.innerHTML);document.getElementById("tw-share-placeholder").innerHTML='<a href="https://twitter.com/share" class="twitter-share-button" data-text="'+t+'" data-via="stecb" data-count="none">Tweet</a>',twttr.widgets.load(),clearInterval(this.timeouts.timer),this.reset(),document.body.classList.add("won")},c.prototype.checkStatus=function(){var t=document.querySelectorAll("."+n+".done");t.length===2*this.options.count&&this.won()},c.prototype.check=function(t){var e=document.querySelectorAll("."+n+".selected");0===e.length?(t.classList.add("selected"),t.dataset.visited=!0):e[0]!=t&&(t.classList.add("selected"),e[0].dataset.refid===t.dataset.refid?(this.setPoints("equal"),this.resetting=!0,t.classList.add("memorized","animated","pulse"),t.classList.remove("selected"),e[0].classList.add("memorized","animated","pulse"),e[0].classList.remove("selected"),clearTimeout(this.timeouts.resetDone),this.timeouts.resetDone=setTimeout(function(){e[0].classList.add("done"),t.classList.add("done"),this.checkStatus(),this.resetting=!1}.bind(this),s)):(t.dataset.visited&&this.setPoints("not_equal"),this.resetting=!0,t.classList.remove("selected"),t.classList.add("showed","animated","shake"),e[0].classList.remove("selected"),e[0].classList.add("showed","animated","shake"),t.dataset.visited=!0,clearTimeout(this.timeouts.resetShow),this.timeouts.resetShow=setTimeout(function(){e[0].classList.remove("showed","animated","shake"),t.classList.remove("showed","animated","shake"),this.resetting=!1}.bind(this),i)))},c.prototype.setPoints=function(t){var e=0,s=document.createElement("div");switch(t){case"equal":e=5;break;case"not_equal":e=-2}s.classList.add("point-element","animated","fadeInUp"),e>0&&s.classList.add("plus"),s.innerHTML=e,document.body.appendChild(s),setTimeout(function(){s.classList.remove("animated","fadeInUp"),setTimeout(function(){s.classList.add("animated","fadeOutUp"),setTimeout(function(){s.parentElement.removeChild(s)},1e3)},500)},1e3),this.points=this.points+e,this.DOM.points.innerHTML=this.points},c.prototype.startTimer=function(){var t=1,e=0,s=0;this.timeouts.timer=setInterval(function(){e=~~(t/60),s=t%60,this.DOM.time.innerHTML=(10>e?"0"+e:e)+":"+(10>s?"0"+s:s),t++}.bind(this),1e3)},c.prototype.ready=function(){document.body.classList.remove("loading"),document.body.classList.add("ready"),this.initEvents(),this.startTimer()},c.prototype.initEvents=function(){this.gameDOM.addEventListener("click",function(t){var e=t.target.parentElement.parentElement;"DIV"===t.target.nodeName&&e.classList.contains(n)&&!e.classList.contains("memorized")&&!this.resetting&&this.check(e)}.bind(this))},c.prototype.initCards=function(t){var e=t.data?t.data.slice(0,this.options.count):void 0,s="",i="",a=[],o=0,c=this;if("undefined"==typeof e||0===e.length||e.length<this.options.count)return swal({title:"please change hash!"}),void this.playAgain();for(var r=0,l=e.length;l>r;r++)s=e[r].images.standard_resolution.url,i=d.replace("{{src}}",s).replace("{{alt}}",n+(r+1)).replace("{{refid}}",e[r].id),a.push(i),a.push(i);this.gameDOM.innerHTML=a.shuffle().join(""),[].slice.call(document.querySelectorAll("#board img")).forEach(function(t){t.addEventListener("load",function(){o++,o===2*c.options.count&&c.ready()})})},c.prototype.reset=function(){this.resetting=!1,document.body.classList.remove("ready","loading")},c.prototype.end=function(t){clearInterval(this.timeouts.timer),this.DOM.time.innerHTML="00:00",this.DOM.points.innerHTML="0",document.getElementById("tag-placeholder").innerHTML="",document.body.classList.remove("playing","loading"),document.body.classList.add("end"),setTimeout(function(){this.board.style.display="none",t.call()}.bind(this),1e3)},c.prototype.play=function(){var t=a.replace("{{tag}}",this.tag)+"?count="+this.options.count+"&client_id="+this.options.client_id;return jsonp(t,function(t){this.initCards(t)}.bind(this)),this},c.prototype.playAgain=function(){document.body.classList.remove("won"),this.gameOptionsDOM.style.display="block",setTimeout(function(){this.gameOptionsDOM.classList.remove("out")}.bind(this),50),this.end(function(){document.querySelector("#hashtag").focus(),document.querySelector("#play").disabled=!1})},t.Game=c}(window.MSTA||this);