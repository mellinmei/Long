/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Class: AEF.Control
 */
AEF.Control = AEF.Class({

    /** 
     * Property: id 
     * {String} 
     */
    id: null,
    
    /** 
     * Property: page 
     * {<AEF.Page>} this gets set in the addControl() function in
     * AEF.Page 
     */
    page: null,

    /** 
     * APIProperty: div 
     * {DOMElement} The element that contains the control, if not present the 
     *     control is placed inside the page.
     */
    div: null,

    /** 
     * APIProperty: type 
     * {Number}
     */
    type: null, 

    /** 
     * Property: allowSelection
     * {Boolean} By default, controls do not allow selection, because
     * it may interfere with page dragging. If this is true, AEF
     * will not prevent selection of the control.
     * Default is false.
     */
    allowSelection: false,  

    /** 
     * Property: displayClass 
     * {string}  This property is used for CSS related to the drawing of the
     * Control. 
     */
    displayClass: "",
    
    /**
    * APIProperty: title  
    * {string}  This property is used for showing a tooltip over the  
    * Control.  
    */ 
    title: "",

    /**
     * APIProperty: autoActivate
     * {Boolean} Activate the control when it is added to a page.  Default is
     *     false.
     */
    autoActivate: false,

    /** 
     * APIProperty: active 
     * {Boolean} The control is active (read-only).  Use <activate> and 
     *     <deactivate> to change control state.
     */
    active: null,

    /**
     * Property: handlerOptions
     * {Object} Used to set non-default properties on the control's handler
     */
    handlerOptions: null,

    /** 
     * Property: handler 
     * {<AEF.Handler>} null
     */
    handler: null,

    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <AEF.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /** 
     * APIProperty: events
     * {<AEF.Events>} Events instance for listeners and triggering
     *     control specific events.
     *
     * Register a listener for a particular event with the following syntax:
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to control.events.object (a reference
     *      to the control).
     * element - {DOMElement} A reference to control.events.element (which
     *      will be null unless documented otherwise).
     *
     * Supported page event types:
     * activate - Triggered when activated.
     * deactivate - Triggered when deactivated.
     */
    events: null,

    /**
     * Constructor: AEF.Control
     * Create an AEF Control.  The options passed as a parameter
     * directly extend the control.  For example passing the following:
     * 
     * > var control = new AEF.Control({div: myDiv});
     *
     * Overrides the default div attribute value of null.
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function (options) {
        // We do this before the extend so that instances can override
        // className in options.
        
        this.displayClass = 
            this.CLASS_NAME.replace("AEF.", "ol").replace(/\./g, "");
        
        AEF.Util.extend(this, options);
        
        this.events = new AEF.Events(this);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = AEF.Util.createUniqueID(this.CLASS_NAME + "_");
        }
    },

    /**
     * Method: destroy
     * The destroy method is used to perform any clean up before the control
     * is dereferenced.  Typically this is where event listeners are removed
     * to prevent memory leaks.
     */
    destroy: function () {
        if(this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;

        // eliminate circular references
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if(this.handlers) {
            for(var key in this.handlers) {
                if(this.handlers.hasOwnProperty(key) &&
                   typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.page) {
            this.page.removeControl(this);
            this.page = null;
        }
        this.div = null;
    },

    /** 
     * Method: setPage
     * Set the page property for the control. This is done through an accessor
     * so that subclasses can override this and take special action once 
     * they have their page variable set. 
     *
     * Parameters:
     * page - {<AEF.Map>} 
     */
    setPage: function(page) {
        this.page = page;
        if (this.handler) {
            this.handler.setPage(page);
        }
    },
  
    /**
     * Method: draw
     * The draw method is called when the control is ready to be displayed
     * on the page.  If a div has not been created one is created.  Controls
     * with a visual component will almost always want to override this method 
     * to customize the look of control. 
     *
     * Parameters:
     * px - {<AEF.Pixel>} The top-left pixel position of the control
     *      or null.
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
    draw: function (px) {
        if (this.div == null) {
            this.div = AEF.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = AEF.Function.False; 
            }    
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        return this.div;
    },

    /**
     * Method: moveTo
     * Sets the left and top style attributes to the passed in pixel 
     * coordinates.
     *
     * Parameters:
     * px - {<AEF.Pixel>}
     */
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },

    /**
     * APIMethod: activate
     * Explicitly activates a control and it's associated
     * handler if one has been set.  Controls can be
     * deactivated by calling the deactivate() method.
     * 
     * Returns:
     * {Boolean}  True if the control was successfully activated or
     *            false if the control was already active.
     */
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.page) {
            AEF.Element.addClass(
                this.page.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    /**
     * APIMethod: deactivate
     * Deactivates a control and it's associated handler if any.  The exact
     * effect of this depends on the control itself.
     * 
     * Returns:
     * {Boolean} True if the control was effectively deactivated or false
     *           if the control was already inactive.
     */
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.page) {
                AEF.Element.removeClass(
                    this.page.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },
    
    /**
     * Method: on
     * Binding Event to a control 
     */
    on: function() {
    	
    },

    CLASS_NAME: "AEF.Control"
});

/**
 * Constant: AEF.Control.TYPE_BUTTON
 */
AEF.Control.TYPE_BUTTON = 1;

/**
 * Constant: AEF.Control.TYPE_TOGGLE
 */
AEF.Control.TYPE_TOGGLE = 2;

/**
 * Constant: AEF.Control.TYPE_TOOL
 */
AEF.Control.TYPE_TOOL   = 3;
