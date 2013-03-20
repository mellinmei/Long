/**
 * @requires AEF/BaseTypes/Class.js
 * @requires AEF/Events.js
 */

/**
 * Class: AEF.Action
 */
AEF.Action = AEF.Class({

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
     * Property: tool
     * {Object} 
     */
    tool: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <AEF.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,    
    
    /**
     * Property: active
     * {Boolean}
     */
    active: false,

    /**
     * Constructor: AEF.Action
     * Construct a action.
     */
    initialize: function(tool, options) {
    	this.tool = tool;
        AEF.Util.extend(this, options);
		var commandManager = this.tool.CommandManager || options.tool.CommandManager;
		if(!commandManager) {
			throw new Error("The tool is invailid!");
		}
        this.id = this.id || AEF.Util.createUniqueID(this.CLASS_NAME + "_");
        this.name = this.name || this.CLASS_NAME;
    },
    

    /**
     * APIMethod: activate
     * Turn on the action.  Returns false if the handler was already active.
     * 
     * Returns: 
     * {Boolean} The action was activated.
     */
    activate: function() {
        if(this.active) {
            return false;
        }
        if(this.eventListeners instanceof Object) {
            this.tool.events.on(this.eventListeners);
        }
        this.active = true;
        return true;
    },  
    
    /**
     * APIMethod: deactivate
     * Turn off the action.  Returns false if the action was already inactive.
     * 
     * Returns:
     * {Boolean} The action was deactivated.
     */
    deactivate: function() {

        if(!this.active) {
            return false;
        }
        if(this.eventListeners instanceof Object) {
            this.tool.events.un(this.eventListeners);
        }
        this.active = false;
        return true;
    },      

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {
        // unregister event listeners
        this.deactivate();  
    },

    CLASS_NAME: "AEF.Action"
});