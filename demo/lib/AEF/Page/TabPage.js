/**
 * Class: AEF.Page.TabPage
 */
AEF.Page.TabPage = AEF.Class(AEF.Page, {
	
    /**
     * Constructor: AEF.Page.TabPage
     *
     * Parameters:
     * div	-	{DOMElement}
     * options - {Object} 
     */
    initialize: function(div, options) {
        AEF.Page.prototype.initialize.apply(this, arguments);
        console.log("AEF.Page.TabPage completed");
    },		
	
	CLASS_NAME: "AEF.Page.TabPage"
});
