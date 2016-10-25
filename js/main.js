setTimeout(function() {
  document.getElementById('canvas').classList.add('in');
}, 1000);

setTimeout(function() {
  document.getElementById('img-bg').classList.add('in');
}, 1000);

(function(){
  var PARTICLE_QUANT = ~~(innerWidth / 20);
  var BOUNCE = -1;
  var PARTICLE_COLOR = [
    'rgba(180,108,96,0.08)',
    'rgba(244,170,141,0.05)'];
  var ARC_RADIUS = [10, 1, 5, 20, 40];
  /**
   * Particles lib class
   *
   * @class Particles
   * @constructor
   */
  var Particles = function($element) {
    // if element doesnt exist in the DOM return early
    if ($element.length === 0) { return; }

        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property {jQuery} $element
         * @public
         */
        this.$element = $element;

        /**
         * Initial timestamp use to for baseline of animation loop
         *
         * @default null
         * @property lastTimeStamp
         * @type {number}
         * @public
         */
        this.lastTimeStamp = null;

        /**
         * array representing particles
         *
         * @default empty array
         * @property lastTimeStamp
         * @type {array}
         * @public
         */
        this.particles = [];

        this.init();
  };

  var proto = Particles.prototype;

  /**
   * Initializes the class.
   * Runs a single setupHandlers call, followed by createChildren and layout.
   * Exits early if it is already initialized.
   *
   * @method init
   * @private
   */
  proto.init = function() {
    this.createChildren()
      .layout()
      .enable();
  };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {Particles}
     * @private
     */

    proto.setDimensions = function() {
      this.canvas.width  = innerWidth;
      this.canvas.height = innerHeight;
      this.canvasWidth = innerWidth;
      this.canvasHeight = innerHeight;
    } 
    proto.createChildren = function() {
        this.canvas = this.$element;
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this.setDimensions.bind(this));
        this.setDimensions();
        this.lastTimeStamp = new Date().getTime();

        return this;
    };

    /**
     * handles layout of DOM elements
     *
     * @method layout
     * @returns {ParticlesController}
     * @private
     */
    proto.layout = function() {
        window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame         ||
            window.mozRequestAnimationFrame;
        })();

        return this;
    };

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {Particles}
     * @public
     */
    proto.removeChildren = function() {
        this.context = null;
        this.canvasWidth = null;
        this.canvasHeight = null;
        this.lastTimeStamp = null;

        return this;
    };

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @public
     */
    proto.enable = function() {
        this.createParticleData();
        this.renderLoop();
    };

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHODS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates particle data objects
     *
     * @method createParticleData
     * @private
     */
    proto.createParticleData = function() {
        var i = 0;
        var l = PARTICLE_QUANT;

        for(; i < l; i++) {
            this.particles[i] = {};
            this.setParticleData(this.particles[i]);
        }
    };

    /**
     * Sets the base particle data
     *
     * @method setParticleData
     * @private
     */
    proto.setParticleData = function(particle) {
        particle.x = Math.random() * this.canvasWidth;
        particle.y = Math.random() * this.canvasHeight;
        particle.vx = (Math.random()) - 0.5;
        particle.vy = (Math.random()) - 0.5;
        particle.radius = ARC_RADIUS[Math.floor(Math.random() * ARC_RADIUS.length)];
        particle.color = PARTICLE_COLOR[Math.floor(Math.random() * PARTICLE_COLOR.length)];
    };

    /**
     * Updates the particle data object
     *
     * @method update
     * @private
     */
    proto.update = function() {
        var i = 0;
        var l = PARTICLE_QUANT;
      
        for (; i < l; i++) {
            var particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x > this.canvasWidth) {
                particle.x = this.canvasWidth;
                particle.vx *= BOUNCE;
            } else if (particle.x < 0) {
                particle.x = 0;
                particle.vx *= BOUNCE;
            }

            if (particle.y > this.canvasHeight) {
                particle.y = this.canvasHeight;
                particle.vy *= BOUNCE;
            } else if (particle.y < 0) {
                particle.y = 0;
                particle.vy *= BOUNCE;
            }
        }
    };

    /**
     * Renders the particle on the canvas
     *
     * @method draw
     * @private
     */
    proto.draw = function() {
        var i = 0;

        if (!this.context) {
            return;
        }

        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      
        for(; i < PARTICLE_QUANT; i++) {
            var particle = this.particles[i];
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = particle.color;
            this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.context.fill();
            this.context.restore();
        }
    };

    /**
     * Creates the animation loop
     *
     * @method renderLoop
     * @private
     */
    proto.renderLoop = function() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.update();
        this.draw();
    };

  var particles = new Particles(document.getElementById('canvas'));

})();