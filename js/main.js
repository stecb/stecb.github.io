setTimeout(function(){document.getElementById("canvas").classList.add("in")},1e3),setTimeout(function(){document.getElementById("img-bg").classList.add("in")},1e3),function(){var a=~~(innerWidth/20),b=-1,c=["rgba(180,108,96,0.08)","rgba(244,170,141,0.05)"],d=[10,1,5,20,40],e=function(a){0!==a.length&&(this.$element=a,this.lastTimeStamp=null,this.particles=[],this.init())},f=e.prototype;f.init=function(){this.createChildren().layout().enable()},f.setDimensions=function(){this.canvas.width=innerWidth,this.canvas.height=innerHeight,this.canvasWidth=innerWidth,this.canvasHeight=innerHeight},f.createChildren=function(){return this.canvas=this.$element,this.context=this.canvas.getContext("2d"),window.addEventListener("resize",this.setDimensions.bind(this)),this.setDimensions(),this.lastTimeStamp=(new Date).getTime(),this},f.layout=function(){return window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}(),this},f.removeChildren=function(){return this.context=null,this.canvasWidth=null,this.canvasHeight=null,this.lastTimeStamp=null,this},f.enable=function(){this.createParticleData(),this.renderLoop()},f.createParticleData=function(){for(var b=0,c=a;b<c;b++)this.particles[b]={},this.setParticleData(this.particles[b])},f.setParticleData=function(a){a.x=Math.random()*this.canvasWidth,a.y=Math.random()*this.canvasHeight,a.vx=Math.random()-.5,a.vy=Math.random()-.5,a.radius=d[Math.floor(Math.random()*d.length)],a.color=c[Math.floor(Math.random()*c.length)]},f.update=function(){for(var c=0,d=a;c<d;c++){var e=this.particles[c];e.x+=e.vx,e.y+=e.vy,e.x>this.canvasWidth?(e.x=this.canvasWidth,e.vx*=b):e.x<0&&(e.x=0,e.vx*=b),e.y>this.canvasHeight?(e.y=this.canvasHeight,e.vy*=b):e.y<0&&(e.y=0,e.vy*=b)}},f.draw=function(){var b=0;if(this.context)for(this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);b<a;b++){var c=this.particles[b];this.context.save(),this.context.beginPath(),this.context.fillStyle=c.color,this.context.arc(c.x,c.y,c.radius,0,2*Math.PI),this.context.fill(),this.context.restore()}},f.renderLoop=function(){requestAnimationFrame(this.renderLoop.bind(this)),this.update(),this.draw()};new e(document.getElementById("canvas"))}();