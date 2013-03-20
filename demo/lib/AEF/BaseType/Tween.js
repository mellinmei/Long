/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Namespace: AEF.Tween
 */
AEF.Tween = AEF.Class({
    
    /**
     * Constant: INTERVAL
     * {int} Interval in milliseconds between 2 steps
     */
    INTERVAL: 10,
    
    /**
     * APIProperty: easing
     * {<AEF.Easing>(Function)} Easing equation used for the animation
     *     Defaultly set to AEF.Easing.Expo.easeOut
     */
    easing: null,
    
    /**
     * APIProperty: begin
     * {Object} Values to start the animation with
     */
    begin: null,
    
    /**
     * APIProperty: finish
     * {Object} Values to finish the animation with
     */
    finish: null,
    
    /**
     * APIProperty: duration
     * {int} duration of the tween (number of steps)
     */
    duration: null,
    
    /**
     * APIProperty: callbacks
     * {Object} An object with start, eachStep and done properties whose values
     *     are functions to be call during the animation. They are passed the
     *     current computed value as argument.
     */
    callbacks: null,
    
    /**
     * Property: time
     * {int} Step counter
     */
    time: null,
    
    /**
     * Property: interval
     * {int} Interval id returned by window.setInterval
     */
    interval: null,
    
    /**
     * Property: playing
     * {Boolean} Tells if the easing is currently playing
     */
    playing: false,
    
    /** 
     * Constructor: AEF.Tween
     * Creates a Tween.
     *
     * Parameters:
     * easing - {<AEF.Easing>(Function)} easing function method to use
     */ 
    initialize: function(easing) {
        this.easing = (easing) ? easing : AEF.Easing.Expo.easeOut;
    },
    
    /**
     * APIMethod: start
     * Plays the Tween, and calls the callback method on each step
     * 
     * Parameters:
     * begin - {Object} values to start the animation with
     * finish - {Object} values to finish the animation with
     * duration - {int} duration of the tween (number of steps)
     * options - {Object} hash of options (for example callbacks (start, eachStep, done))
     */
    start: function(begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.interval = window.setInterval(
            AEF.Function.bind(this.play, this), this.INTERVAL);
    },
    
    /**
     * APIMethod: stop
     * Stops the Tween, and calls the done callback
     *     Doesn't do anything if animation is already finished
     */
    stop: function() {
        if (!this.playing) {
            return;
        }
        
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        window.clearInterval(this.interval);
        this.interval = null;
        this.playing = false;
    },
    
    /**
     * Method: play
     * Calls the appropriate easing method
     */
    play: function() {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                throw new TypeError('invalid value for Tween');
            }

            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        
        if (this.time > this.duration) {
            this.stop();
        }
    },
    
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "AEF.Tween"
});

/**
 * Namespace: AEF.Animation
 */
AEF.Animation = AEF.Class({
    
    /**
     * APIProperty: easing
     * {<AEF.Easing>(Function)} Easing equation used for the animation
     *     Defaultly set to AEF.Easing.Expo.easeOut
     */
    easing: null,
    
    /**
     * APIProperty: begin
     * {Object} Values to start the animation with
     */
    begin: null,
    
    /**
     * APIProperty: finish
     * {Object} Values to finish the animation with
     */
    finish: null,
    
    /**
     * APIProperty: duration
     * {int} duration of the tween (number of steps)
     */
    duration: null,
    
    /**
     * APIProperty: callbacks
     * {Object} An object with start, eachStep and done properties whose values
     *     are functions to be call during the animation. They are passed the
     *     current computed value as argument.
     */
    callbacks: null,
    
    /**
     * Property: time
     * {int} Step counter
     */
    time: null,
    
    /**
     * Property: infinite
     * {Boolean}
     */
    infinite: false,
    
    /**
     * Property: playing
     * {Boolean} Tells if the easing is currently playing
     */
    playing: false,
    
    /**
     * Property: startTime
     * {Number}
     */
    startTime: null,
    
    /**
     * Property: totalCount
     * {Number}
     */
    totalCount: null,
    
    /**
     * Property: nowTime
     * {Number}
     */
    nowTime: null,
    
    /** 
     * Constructor: AEF.Tween
     * Creates a Tween.
     *
     * Parameters:
     * easing - {<AEF.Easing>(Function)} easing function method to use
     */ 
    initialize: function(easing) {
        this.easing = (easing) ? easing : AEF.Easing.Expo.easeOut;
    },
    
    /**
     * APIMethod: start
     * Plays the Tween, and calls the callback method on each step
     * 
     * Parameters:
     * begin - {Object} values to start the animation with
     * finish - {Object} values to finish the animation with
     * duration - {int} duration of the tween (number of steps)
     * options - {Object} hash of options (for example callbacks (start, eachStep, done))
     */
    start: function(begin, finish, duration, options) {
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;   		
    	this.startTime = this.nowTime = new Date * 1;
        this.playing = true;
        this.totalCount = (typeof duration == "string") ? 0 : duration;
        this.time = 0;
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }       
        webkitRequestAnimationFrame(AEF.Function.bind(this.play, this)); 
    },
    
    /**
     * APIMethod: stop
     * Stops the Tween, and calls the done callback
     *     Doesn't do anything if animation is already finished
     */
    stop: function() {
        if (!this.playing) {
            return;
        }
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        this.playing = false;
    },
    
    /**
     * Method: play
     * Calls the appropriate easing method
     */
    play: function(time) {
        var value = {};
        
        if( typeof this.duration == "string") {
      		var timenow = new Date * 1,
      			timedif = (timenow - this.nowTime) == 0 ? 16 : timenow - this.nowTime;
      		this.totalCount = Math.floor(parseInt(this.duration, 10) / timedif);
      		this.nowTime = timenow;
      		this.time = Math.ceil(((this.nowTime - this.startTime) * this.totalCount) / parseInt(this.duration, 10)) || 1; 
        } else {
        	this.time++;       	
        }
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                throw new TypeError('invalid value for Tween');
            }

            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.totalCount]);
        }          
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        if (this.time >= this.totalCount) {
            this.stop();
            return;
        }
        if(this.playing == false) {
        	return;
        }
		webkitRequestAnimationFrame(AEF.Function.bind(this.play, this));
    },
    
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "AEF.Animation"
});

/**
 * Namespace: AEF.Easing
 */
AEF.Easing = {
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "AEF.Easing"
};

/**
 * Namespace: AEF.Easing.Linear
 */
AEF.Easing.Linear = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        return c*t/d + b;
    },

    CLASS_NAME: "AEF.Easing.Linear"
};

/**
 * Namespace: AEF.Easing.Expo
 */
AEF.Easing.Expo = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },

    CLASS_NAME: "AEF.Easing.Expo"
};

/**
 * Namespace: AEF.Easing.Quad
 */
AEF.Easing.Quad = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    CLASS_NAME: "AEF.Easing.Quad"
};

/**
 * Namespace: AEF.Easing.Back
 */
AEF.Easing.Back = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
	},

    CLASS_NAME: "AEF.Easing.Back"
};

/**
 * Namespace: AEF.Easing.Bounce
 */
AEF.Easing.Bounce = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return c - Easing.Bounce.easeOut(d - t, 0, c, d) + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
		}
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		if (t < d / 2) return Easing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
		else return Easing.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
	},
	
    CLASS_NAME: "AEF.Easing.Bounce"
};

/**
 * Namespace: AEF.Easing.Elastic
 */
AEF.Easing.Elastic = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
	},
	
    CLASS_NAME: "AEF.Easing.Elastic"
};

/**
 * Namespace: AEF.Easing.Circ
 */
AEF.Easing.Circ = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
	},
	
    CLASS_NAME: "AEF.Easing.Circ"
};

/**
 * Namespace: AEF.Easing.Sine
 */
AEF.Easing.Sine = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return - c * Math.cos(t / d * (Math.PI / 2)) + c + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
	},
	
    CLASS_NAME: "AEF.Easing.Sine"
};

/**
 * Namespace: AEF.Easing.Quint
 */
AEF.Easing.Quint = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
	},
	
    CLASS_NAME: "AEF.Easing.Quint"
};

/**
 * Namespace: AEF.Easing.Quart
 */
AEF.Easing.Quart = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		return - c * ((t = t / d - 1) * t * t * t - 1) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return - c / 2 * ((t -= 2) * t * t * t - 2) + b
	},
	
    CLASS_NAME: "AEF.Easing.Quart"
};

/**
 * Namespace: AEF.Easing.Cubic
 */
AEF.Easing.Cubic = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t * t + b
	},
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b
	},
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
	easeInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b
	},
	
    CLASS_NAME: "AEF.Easing.Cubic"
};
