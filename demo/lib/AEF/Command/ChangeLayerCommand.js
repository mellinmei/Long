/**
 * Class: AEF.Command.ChangeLayerCommand
 */
AEF.Command.ChangeLayerCommand = AEF.Class(AEF.Command, {
	
	/**
	 * Property: refreshIframe
	 * {Boolean} 
	 */
	refreshIframe: true,
		
    /**
     * Constructor: AEF.Command.ChangeLayerCommand
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
    	var iframLayer = this.page.getLayer("iFrameLayer"),
    		baseLayer = this.page.getLayer("baseLayer");
    	if(!option) {
			this.page.topLayer(baseLayer);
			baseLayer.showSelf();
			if(this.refreshIframe) {
				iframLayer.setNone();
			}	
    	} else {
    		this.page.topLayer(iframLayer);
    		iframLayer.changedSrc(option);    	
    	}
	},
	
	CLASS_NAME: "AEF.Command.ChangeLayerCommand"
});
