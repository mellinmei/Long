/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Class: AEF.Data
 */
AEF.Data = AEF.Class({

    /**
     * Property: id
     * {String}
     */
    id: null,
    
    /**
     * Property: name
     * {String} 
     */
    name: null,
    
    /**
     * APIProperty: events
     * {<AEF.Events>}
     *
     * Register a listener for a particular event with the following syntax:
     * (code)
     * data.events.register(type, obj, listener);
     * (end)
     * 
     */
    events: null,   
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <AEF.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,    
    
    /**
     * Property: sortable
     * {Boolean}
     */
    sortable: false,
    
    /**
     * Property: data
     * {Object} 
     */
    data: null,

    /**
     * Constructor: AEF.Action
     * Construct a action.
     */
    initialize: function(options) {
        AEF.Util.extend(this, options);
        this.id = this.id || AEF.Util.createUniqueID(this.CLASS_NAME + "_");
        this.name = this.name || this.CLASS_NAME;
        this.events = new AEF.Events(this);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }         
    },
    

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {

    },

    CLASS_NAME: "AEF.Data"
});