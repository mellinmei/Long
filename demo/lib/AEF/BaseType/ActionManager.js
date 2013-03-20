/**
 * @requires AEF/BaseTypes/Class.js
 * @requires AEF/Events.js
 */

/**
 * Class: AEF.ActionManager
 */
AEF.ActionManager = AEF.Class({

    /**
     * Property: id
     * {String}
     */
    id: null,
    
    /**
     * Property: actions
     * {Array(<AEF.Action>)} 
     */
    actions: null,
    
    /**
     * Property: defaultAction
     * {<AEF.Action>} 
     */
    defaultAction: null,
    
    /**
     * Property: nowAction
     * {<AEF.Action>} 
     */
    nowAction: null,

    /**
     * Constructor: AEF.ActionManager
     * Construct a actionManager.
     */
    initialize: function(options) {
        AEF.Util.extend(this, options);
		var actions = this.actions || options.actions;
		if(!actions) {
			this.actions = [];
		}
		var len = this.actions.length;
		var defaultAction = this.defaultAction || options.defaultAction;
		if(!defaultAction && len > 0) {
			this.defaultAction = this.action[0];
		}
        this.id = this.id || AEF.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    

    /**
     * APIMethod: changedAction
     * 
     * Paratemers:
     * action	-	{String}
     */
    changedAction: function(action) {
		var action = this.getActionByClassName(action);
		if(!action || this.nowAction == action)	return;
		this.nowAction.deactivate();
		this.nowAction = action;
		this.nowAction.activate();		
    },
    
    /**
     * APIMethod:  
     */
    
    /**
     * APIMethod: getActionByName
     * 
     * Paratemers:
     * action	-	{String} 
     */ 
    getActionByName: function(action) {
		return this.getActionBy("name", action);
    },
    
    /**
     * APIMethod: getActionByClassName
     * 
     * Paratemers:
     * action	-	{String} 
     */ 
    getActionByClassName: function(action) {
		return this.getActionBy("CLASS_NAME", action);
    },      
    
    /**
     * APIMethod: getActionBy
     * 
     * Paratemers:
     * param	-	{String}
     * action	-	{Object} 
     */ 
    getActionBy: function(param, action) {
    	var i = 0,
    		len = this.actions.length;
    	for( ;  i < len; i++) {
    		if(this.actions[i].param == action) {
    			return this.actions[i];
    		}
    	}
    	return false;	
    },     

    /**
    * Method: register
    * register an action on the actionManager
    * 
    * Paratemers:
    * action	-	{AEF.action}
    */
    register: function (action) {
		if(this.actions.indexOf(action) != -1)	return false;
		this.actions.push(action);
    },

    /**
    * Method: unregister
    * unregister an action from the actionManager
    */
    unregister: function (action) {
    	var index = -1;
    	if(typeof action == "string") {
    		var i = 0,
    		len = this.actions.length;
    		for( ; i < len; i++) {
    			if(action == this.actions[i].name) {
    				index = i;
    				break;
    			}
    		}
    	} else {
    		var index = this.actions.indexOf(action);
    	}
		if(index != -1) {
			this.actions.splice(i, 1);
			return true;    			
		}
		return false;    	
    },

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {
        // unregister event listeners
        this.deactivate();
       	this.actions.length = 0;
       	this.actions = null;    
    },

    CLASS_NAME: "AEF.ActionManager"
});