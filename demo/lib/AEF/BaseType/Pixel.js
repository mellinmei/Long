/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Class: AEF.Pixel
 * This class represents a screen coordinate, in x and y coordinates
 */
AEF.Pixel = AEF.Class({
    
    /**
     * APIProperty: x
     * {Number} The x coordinate
     */
    x: 0.0,

    /**
     * APIProperty: y
     * {Number} The y coordinate
     */
    y: 0.0,
    
    /**
     * Constructor: AEF.Pixel
     * Create a new AEF.Pixel instance
     *
     * Parameters:
     * x - {Number} The x coordinate
     * y - {Number} The y coordinate
     *
     * Returns:
     * An instance of AEF.Pixel
     */
    initialize: function(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    
    /**
     * Method: toString
     * Cast this object into a string
     *
     * Returns:
     * {String} The string representation of Pixel. ex: "x=200.4,y=242.2"
     */
    toString:function() {
        return ("x=" + this.x + ",y=" + this.y);
    },

    /**
     * APIMethod: clone
     * Return a clone of this pixel object
     *
     * Returns:
     * {<AEF.Pixel>} A clone pixel
     */
    clone:function() {
        return new AEF.Pixel(this.x, this.y); 
    },
    
    /**
     * APIMethod: equals
     * Determine whether one pixel is equivalent to another
     *
     * Parameters:
     * px - {<AEF.Pixel>|Object} An AEF.Pixel or an object with
     *                                  a 'x' and 'y' properties.
     *
     * Returns:
     * {Boolean} The point passed in as parameter is equal to this. Note that
     * if px passed in is null, returns false.
     */
    equals:function(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                      (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },

    /**
     * APIMethod: distanceTo
     * Returns the distance to the pixel point passed in as a parameter.
     *
     * Parameters:
     * px - {<AEF.Pixel>}
     *
     * Returns:
     * {Float} The pixel point passed in as parameter to calculate the
     *     distance to.
     */
    distanceTo:function(px) {
        return Math.sqrt(
            Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2)
        );
    },

    /**
     * APIMethod: add
     *
     * Parameters:
     * x - {Integer}
     * y - {Integer}
     *
     * Returns:
     * {<AEF.Pixel>} A new Pixel with this pixel's x&y augmented by the 
     * values passed in.
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new AEF.Pixel(this.x + x, this.y + y);
    },

    /**
    * APIMethod: offset
    * 
    * Parameters
    * px - {<AEF.Pixel>|Object} An AEF.Pixel or an object with
    *                                  a 'x' and 'y' properties.
    * 
    * Returns:
    * {<AEF.Pixel>} A new Pixel with this pixel's x&y augmented by the 
    *                      x&y values of the pixel passed in.
    */
    offset:function(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },

    CLASS_NAME: "AEF.Pixel"
});
