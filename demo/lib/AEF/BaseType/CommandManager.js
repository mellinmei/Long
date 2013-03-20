/**
 * @requires AEF/BaseTypes/Class.js
 * @requires AEF/Events.js
 */

/**
 * Class: AEF.CommandManager
 */
AEF.CommandManager = AEF.Class({

    /**
     * Property: id
     * {String}
     */
    id: null,
    
    /**
     * Property: commands
     * {Object(<AEF.Command>)} 
     */
    commands: null,

    /**
     * Property: page
     * {<AEF.Page>}
     */
    page: null,


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
    initialize: function(options) {
        AEF.Util.extend(this, options);
        var page = this.page || options.page;
        if (page) {
            this.setPage(page); 
        }
        this.id = this.id || AEF.Util.createUniqueID(this.CLASS_NAME + "_");
        this.commands = this.commands || [];
    },
    
    /**
     * Method: setPage
     */
    setPage: function (page) {
        this.page = page;
    },

    /**
    * Method: register
    * register a command to the commandManager
    */
    register: function (command) {
		var index = this.commands.indexOf(command);
		if(index != -1)	return false;
		this.commands.push(command);
		command.setPage(this.page);
		return true;	
    },

    /**
    * Method: unregister
    * unregister a command from the commandManager
    */
    unregister: function (name) {
		var index = this.getCommandIndexByName(name);
		if(index == -1)	return false;
		this.commands.splice(index, 1);
		return true;			
    },
    
    /**
     * API Method:
     * getCommandIndexByName
     */
    getCommandIndexByName: function(name) {
    	var i = 0, 
    		len = this.commands.length;
    	for(; i < len; i++) {
    		if(name == this.commands[i].name) {
				return i;
    		}
    	}  
    	return -1;  	
    },
    
    /**
     * APIMethod: excuteCommand 
     */
    excuteCommand: function(name, option) {
    	var index = this.getCommandIndexByName(name);
		if(index == -1)	return;
		this.commands[index].execute(option);
    },

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {
        // eliminate circular references
        this.page = null;        
    },

    CLASS_NAME: "AEF.CommandManager"
});