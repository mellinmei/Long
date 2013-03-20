/**
 * Class: AEF.Command.ReportToBrowser
 */
AEF.Command.ReportToBrowser = AEF.Class(AEF.Command, {
		
    /**
     * Constructor: AEF.Command.ReportToBrowser
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
		/* debug start */
		console.log(option);
		/* debug end */
		AEF.Command.prototype.execute.apply(this, arguments);
		var action = option.action,
			target = option.target;
		bdbrowser.global.report({
			action: action,
			target: target
		}, AEF.Function.Void);
	},
	
	CLASS_NAME: "AEF.Command.ReportToBrowser"
});
