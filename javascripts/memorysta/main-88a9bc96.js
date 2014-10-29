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
!function(e){"use strict";var t=1e3,i=1e3,n="msta-card",s="https://api.instagram.com/v1/tags/{{tag}}/media/recent",a="f3a1200e40454386afcf89918e8e63c0",o='<div data-refid="{{refid}}" class="'+n+' flip-container"><div class="flipper"><div class="front"></div><div class="back"><img src="{{src}}" alt="{{alt}}" /></div></div></div>',r=function(e,t,i){this.gid=Math.floor(1e11*Math.random())+1,this.gameDOM=document.createElement("div"),this.gameDOM.id="game"+this.gid,e.innerHTML="",e.appendChild(this.gameDOM),this.board=e.parentElement,this.points=0,this.tag=i,this.timeouts={resetDone:null,resetShow:null},this.options={count:"easy"===t?6:"medium"===t?10:15,client_id:a},this.board.style.display="block",this.board.classList.remove("done"),this.board.classList.remove("end"),setTimeout(function(){this.board.classList.add("playing")}.bind(this),50),this.reset()};r.prototype.checkStatus=function(){var e=document.querySelectorAll("."+n+".done");e.length===2*this.options.count&&(this.reset(),this.gameDOM.parentElement.parentElement.classList.add("done"))},r.prototype.check=function(e){var s=document.querySelectorAll("."+n+".selected");0===s.length?e.classList.add("selected"):s[0]!=e&&(e.classList.add("selected"),s[0].dataset.refid===e.dataset.refid?(this.resetting=!0,e.classList.add("memorized","animated","pulse"),e.classList.remove("selected"),s[0].classList.add("memorized","animated","pulse"),s[0].classList.remove("selected"),clearTimeout(this.timeouts.resetDone),this.timeouts.resetDone=setTimeout(function(){s[0].classList.add("done"),e.classList.add("done"),this.checkStatus(),this.resetting=!1}.bind(this),t)):(this.resetting=!0,e.classList.remove("selected"),e.classList.add("showed","animated","shake"),s[0].classList.remove("selected"),s[0].classList.add("showed","animated","shake"),clearTimeout(this.timeouts.resetShow),this.timeouts.resetShow=setTimeout(function(){s[0].classList.remove("showed","animated","shake"),e.classList.remove("showed","animated","shake"),this.resetting=!1}.bind(this),i)))},r.prototype.ready=function(){this.gameDOM.parentElement.parentElement.classList.add("ready"),this.initEvents()},r.prototype.initEvents=function(){this.gameDOM.addEventListener("click",function(e){var t=e.target.parentElement.parentElement;"DIV"===e.target.nodeName&&t.classList.contains(n)&&!t.classList.contains("memorized")&&!this.resetting&&this.check(t)}.bind(this))},r.prototype.initCards=function(e){var t=e.data,i="",s="",a=[],r=0,c=this;if("undefined"==typeof t||0===t.length)return alert("Change hash"),void(this.board.style.display="none");for(var l=0,d=t.length;d>l;l++)i=t[l].images.standard_resolution.url,s=o.replace("{{src}}",i).replace("{{alt}}",n+(l+1)).replace("{{refid}}",t[l].id),a.push(s),a.push(s);this.gameDOM.innerHTML=a.shuffle().join(""),[].slice.call(document.querySelectorAll("#board img")).forEach(function(e){e.addEventListener("load",function(){r++,r===2*c.options.count&&c.ready()})})},r.prototype.reset=function(){this.resetting=!1,this.gameDOM.parentElement.parentElement.classList.remove("ready")},r.prototype.end=function(e){this.board.classList.remove("playing"),this.board.classList.add("end"),setTimeout(function(){this.board.style.display="none",e.call()}.bind(this),1e3)},r.prototype.play=function(){var e=s.replace("{{tag}}",this.tag)+"?count="+this.options.count+"&client_id="+this.options.client_id;return jsonp(e,function(e){this.initCards(e)}.bind(this)),this},e.Game=r}(window.MSTA||this),/**
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
!function(e){"use strict";e.jsonp=function(t,i){var n=document.getElementById("jsonpscript");n&&n.parentElement.removeChild(n),e.callbackJSONP=function(e){i(e)};var s=document.createElement("script");s.id="jsonpscript",s.src=t+"&callback=callbackJSONP",document.body.appendChild(s)}}(window),/**
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
Array.prototype.shuffle=Array.prototype.shuffle||function(){for(var e,t,i=this.length;i;e=Math.floor(Math.random()*i),t=this[--i],this[i]=this[e],this[e]=t);return this},String.prototype.sanitize=String.prototype.sanitize||function(){return this.replace(/\s|[^0-9a-zA-Z]/g,"")},"document"in self&&!("classList"in document.createElement("_"))&&!function(e){"use strict";if("Element"in e){var t="classList",i="prototype",n=e.Element[i],s=Object,a=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[i].indexOf||function(e){for(var t=0,i=this.length;i>t;t++)if(t in this&&this[t]===e)return t;return-1},r=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},c=function(e,t){if(""===t)throw new r("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new r("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(e,t)},l=function(e){for(var t=a.call(e.getAttribute("class")||""),i=t?t.split(/\s+/):[],n=0,s=i.length;s>n;n++)this.push(i[n]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},d=l[i]=[],u=function(){return new l(this)};if(r[i]=Error[i],d.item=function(e){return this[e]||null},d.contains=function(e){return e+="",-1!==c(this,e)},d.add=function(){var e,t=arguments,i=0,n=t.length,s=!1;do e=t[i]+"",-1===c(this,e)&&(this.push(e),s=!0);while(++i<n);s&&this._updateClassName()},d.remove=function(){var e,t=arguments,i=0,n=t.length,s=!1;do{e=t[i]+"";var a=c(this,e);-1!==a&&(this.splice(a,1),s=!0)}while(++i<n);s&&this._updateClassName()},d.toggle=function(e,t){e+="";var i=this.contains(e),n=i?t!==!0&&"remove":t!==!1&&"add";return n&&this[n](e),!i},d.toString=function(){return this.join(" ")},s.defineProperty){var m={get:u,enumerable:!0,configurable:!0};try{s.defineProperty(n,t,m)}catch(h){-2146823252===h.number&&(m.enumerable=!1,s.defineProperty(n,t,m))}}else s[i].__defineGetter__&&n.__defineGetter__(t,u)}}(self),!function(e,t){"use strict";e.log=function(){log.history=log.history||[],log.history.push(arguments),arguments.callee=arguments.callee.caller,this.console&&console.log(Array.prototype.slice.call(arguments))},e.performance=e.performance||{},performance.now=function(){performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow||function(){(new Date).getTime()}}(),e.isIE=function(){for(var e,t=3,i=document.createElement("div"),n=i.getElementsByTagName("i");i.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",n[0];);return t>4?t:e}(),e.requestAnimFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)}}(),t.is_touch_device="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch||!1,t.is_mobile=function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}(),t.helpers={throttle:function(e,t){var t,i,n;return null==t&&(t=100),function(){var s=+new Date,a=this,o=arguments;n&&n+t>s?(clearTimeout(i),i=setTimeout(function(){n=s,e.apply(a,o)},t)):(n=s,e.apply(this,o))}}}}(this,SCB),/**
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
!function(){"use strict";var e=document.querySelector("#hashtag"),t=document.querySelector("#play"),i=document.querySelector("#playagain"),n=window.location.hash.sanitize(),s=(document.getElementById("board-wrapper"),document.querySelector(".game-options")),a=null,o={},r=function(){o.level=document.querySelector("input[type=radio]:checked").value,o.hash=e.value.sanitize()},c=function(){s.classList.add("out"),t.disabled=!0,setTimeout(function(){s.style.display="none",a=new MSTA.Game(document.getElementById("board"),o.level,o.hash).play()},1e3)};t.addEventListener("click",function(){r(),""!==o.hash?c():e.focus()}),i.addEventListener("click",function(){s.style.display="block",setTimeout(function(){s.classList.remove("out")},50),a.end(function(){t.disabled=!1})}),e.addEventListener("keyup",function(){var e="";return function(){e!==this.value&&(this.value="#"+this.value.sanitize())&&(e=this.value)}}()),""!==n&&(e.value="#"+n,r(),c())}();