/**
 * Class: AEF.Command.ChangeHashCommand
 */
AEF.Command.ChangeHashCommand = AEF.Class(AEF.Command, {
		
    /**
     * Constructor: AEF.Command.ChangeHashCommand
     *
     * Parameters:
     * name	-	{String}
     * options - {Object} 
     */
    initialize: function(name, options) {
        AEF.Command.prototype.initialize.apply(this, arguments);
    },
    
	/**
	 * API Method:
	 * execute
	 */
	execute: function(option) {
		AEF.Command.prototype.execute.apply(this, arguments);
		window.location.hash = option.type;
	},
	
	CLASS_NAME: "AEF.Command.ChangeHashCommand"
});
