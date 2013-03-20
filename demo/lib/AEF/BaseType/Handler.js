/**
 * @requires AEF/BaseTypes/Class.js
 * @requires AEF/Events.js
 */

/**
 * Class: AEF.Handler
 */
AEF.Handler = AEF.Class({

    /**
     * Property: id
     * {String}
     */
    id: null,
        
    /**
     * APIProperty: control
     * {<AEF.Control>}. The control that initialized this handler.  The
     *     control is assumed to have a valid page property - that page is used
     *     in the handler's own setPage method.
     */
    control: null,

    /**
     * Property: page
     * {<AEF.Page>}
     */
    page: null,

    /**
     * APIProperty: keyMask
     * {Integer} Use bitwise operators and one or more of the AEF.Handler
     *     constants to construct a keyMask.  The keyMask is used by
     *     <checkModifiers>.  If the keyMask matches the combination of keys
     *     down on an event, checkModifiers returns true.
     *
     * Example:
     * (code)
     *     // handler only responds if the Shift key is down
     *     handler.keyMask = AEF.Handler.MOD_SHIFT;
     *
     *     // handler only responds if Ctrl-Shift is down
     *     handler.keyMask = AEF.Handler.MOD_SHIFT |
     *                       AEF.Handler.MOD_CTRL;
     * (end)
     */
    keyMask: null,

    /**
     * Property: active
     * {Boolean}
     */
    active: false,
    
    /**
     * Property: evt
     * {Event} This property references the last event handled by the handler.
     *     Note that this property is not part of the stable API.  Use of the
     *     evt property should be restricted to controls in the library
     *     or other applications that are willing to update with changes to
     *     the AEF code.
     */
    evt: null,

    /**
     * Constructor: AEF.Handler
     * Construct a handler.
     *
     * Parameters:
     * control - {<AEF.Control>} The control that initialized this
     *     handler.  The control is assumed to have a valid page property; that
     *     page is used in the handler's own setMap method.  If a page property
     *     is present in the options argument it will be used instead.
     * callbacks - {Object} An object whose properties correspond to abstracted
     *     events or sequences of browser events.  The values for these
     *     properties are functions defined by the control that get called by
     *     the handler.
     * options - {Object} An optional object whose properties will be set on
     *     the handler.
     */
    initialize: function(control, callbacks, options) {
        AEF.Util.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;

        var page = this.page || control.page;
        if (page) {
            this.setPage(page); 
        }
        
        this.id = AEF.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    
    /**
     * Method: setPage
     */
    setPage: function (page) {
        this.page = page;
    },

    /**
     * Method: checkModifiers
     * Check the keyMask on the handler.  If no <keyMask> is set, this always
     *     returns true.  If a <keyMask> is set and it matches the combination
     *     of keys down on an event, this returns true.
     *
     * Returns:
     * {Boolean} The keyMask matches the keys down on an event.
     */
    checkModifiers: function (evt) {
        if(this.keyMask == null) {
            return true;
        }
        /* calculate the keyboard modifier mask for this event */
        var keyModifiers =
            (evt.shiftKey ? AEF.Handler.MOD_SHIFT : 0) |
            (evt.ctrlKey  ? AEF.Handler.MOD_CTRL  : 0) |
            (evt.altKey   ? AEF.Handler.MOD_ALT   : 0);
    
        /* if it differs from the handler object's key mask,
           bail out of the event handler */
        return (keyModifiers == this.keyMask);
    },

    /**
     * APIMethod: activate
     * Turn on the handler.  Returns false if the handler was already active.
     * 
     * Returns: 
     * {Boolean} The handler was activated.
     */
    activate: function() {
        if(this.active) {
            return false;
        }
        // register for event handlers defined on this class.
        var events = AEF.Events.prototype.BROWSER_EVENTS;
        for (var i=0, len=events.length; i<len; i++) {
            if (this[events[i]]) {
                this.register(events[i], this[events[i]]); 
            }
        } 
        this.active = true;
        return true;
    },
    
    /**
     * APIMethod: deactivate
     * Turn off the handler.  Returns false if the handler was already inactive.
     * 
     * Returns:
     * {Boolean} The handler was deactivated.
     */
    deactivate: function() {
        if(!this.active) {
            return false;
        }
        // unregister event handlers defined on this class.
        var events = AEF.Events.prototype.BROWSER_EVENTS;
        for (var i=0, len=events.length; i<len; i++) {
            if (this[events[i]]) {
                this.unregister(events[i], this[events[i]]); 
            }
        } 
        this.active = false;
        return true;
    },

    /**
    * Method: callback
    * Trigger the control's named callback with the given arguments
    *
    * Parameters:
    * name - {String} The key for the callback that is one of the properties
    *     of the handler's callbacks object.
    * args - {Array(*)} An array of arguments (any type) with which to call 
    *     the callback (defined by the control).
    */
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args);
        }
    },

    /**
    * Method: register
    * register an event on the page
    */
    register: function (name, method) {
        // TODO: deal with registerPriority in 3.0
        this.page.events.registerPriority(name, this, method);
        this.page.events.registerPriority(name, this, this.setEvent);
    },

    /**
    * Method: unregister
    * unregister an event from the page
    */
    unregister: function (name, method) {
        this.page.events.unregister(name, this, method);   
        this.page.events.unregister(name, this, this.setEvent);
    },
    
    /**
     * Method: setEvent
     * With each registered browser event, the handler sets its own evt
     *     property.  This property can be accessed by controls if needed
     *     to get more information about the event that the handler is
     *     processing.
     *
     * This allows modifier keys on the event to be checked (alt, shift,
     *     and ctrl cannot be checked with the keyboard handler).  For a
     *     control to determine which modifier keys are associated with the
     *     event that a handler is currently processing, it should access
     *     (code)handler.evt.altKey || handler.evt.shiftKey ||
     *     handler.evt.ctrlKey(end).
     *
     * Parameters:
     * evt - {Event} The browser event.
     */
    setEvent: function(evt) {
        this.evt = evt;
        return true;
    },

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {
        // unregister event listeners
        this.deactivate();
        // eliminate circular references
        this.control = this.page = null;        
    },

    CLASS_NAME: "AEF.Handler"
});

/**
 * Constant: AEF.Handler.MOD_NONE
 * If set as the <keyMask>, <checkModifiers> returns false if any key is down.
 */
AEF.Handler.MOD_NONE  = 0;

/**
 * Constant: AEF.Handler.MOD_SHIFT
 * If set as the <keyMask>, <checkModifiers> returns false if Shift is down.
 */
AEF.Handler.MOD_SHIFT = 1;

/**
 * Constant: AEF.Handler.MOD_CTRL
 * If set as the <keyMask>, <checkModifiers> returns false if Ctrl is down.
 */
AEF.Handler.MOD_CTRL  = 2;

/**
 * Constant: AEF.Handler.MOD_ALT
 * If set as the <keyMask>, <checkModifiers> returns false if Alt is down.
 */
AEF.Handler.MOD_ALT   = 4;


