/**
 * Class: AEF.Command.SetSkinCommand
 */
AEF.Command.SetSkinCommand = AEF.Class(AEF.Command, {
	
    /**
     * Constructor: AEF.Command.SetSkinCommand
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
	execute: function() {
		AEF.Command.prototype.execute.apply(this, arguments);
		this.page.setSkin();
	},
	
	CLASS_NAME: "AEF.Command.SetSkinCommand"
});
