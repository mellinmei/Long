/**
 * Namespace: AEF.Animate
 */
AEF.Animate = (function(window) {
    
    /**
     * Property: isNative
     * {Boolean} true if a native requestAnimationFrame function is available
     */
    var isNative = !!(window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame);
    
    /**
     * Function: requestFrame
     * Schedule a function to be called at the next available animation frame.
     *     Uses the native method where available.  Where requestAnimationFrame is
     *     not available, setTimeout will be called with a 16ms delay.
     *
     * Parameters:
     * callback - {Function} The function to be called at the next animation frame.
     * element - {DOMElement} Optional element that visually bounds the animation.
     */
    var requestFrame = (function() {
        var request = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 16);
            };
        // bind to window to avoid illegal invocation of native function
        return function(callback, element) {
            request.apply(window, [callback, element]);
        };
    })();
    
    // private variables for animation loops
    var counter = 0;
    var loops = {};
    
    /**
     * Function: start
     * Executes a method with <requestFrame> in series for some 
     *     duration.
     *
     * Parameters:
     * callback - {Function} The function to be called at the next animation frame.
     * duration - {Number} Optional duration for the loop.  If not provided, the
     *     animation loop will execute indefinitely.
     * element - {DOMElement} Optional element that visually bounds the animation.
     *
     * Returns:
     * {Number} Identifier for the animation loop.  Used to stop animations with
     *     <stop>.
     */
    function start(callback, duration, element) {
        duration = duration > 0 ? duration : Number.POSITIVE_INFINITY;
        var id = ++counter;
        var start = +new Date;
        loops[id] = function() {
            if (loops[id] && +new Date - start <= duration) {
                callback();
                if (loops[id]) {
                    requestFrame(loops[id], element);
                }
            } else {
                delete loops[id];
            }
        };
        requestFrame(loops[id], element);
        return id;
    }
    
    /**
     * Function: stop
     * Terminates an animation loop started with <start>.
     *
     * Parameters:
     * id - {Number} Identifier returned from <start>.
     */
    function stop(id) {
        delete loops[id];
    }
    
    return {
        isNative: isNative,
        requestFrame: requestFrame,
        start: start,
        stop: stop
    };
    
})(window);
