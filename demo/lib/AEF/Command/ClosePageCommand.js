/**
 * Class: AEF.Command.ClosePageCommand
 */
AEF.Command.ClosePageCommand = AEF.Class(AEF.Command, {
		
    /**
     * Constructor: AEF.Command.ClosePageCommand
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
		window.close();
	},
	
	CLASS_NAME: "AEF.Command.ClosePageCommand"
});
