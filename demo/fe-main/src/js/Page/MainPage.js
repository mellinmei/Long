/**
 * Class: AEF.Page.MainPage
 */
AEF.Page.MainPage = AEF.Class(AEF.Page, {

	/**
	 * Property: navMenu
	 * {AEF.Control.NavMenu}
	 */
	navMenu: null,

    /**
     * Constructor: AEF.Page.MainPage
     *
     * Parameters:
     * div	-	{DOMElement}
     * options - {Object} 
     */
    initialize: function(div, options) {
        AEF.Page.prototype.initialize.apply(this, arguments);
        this.navMenu = this.getControl("browser_page_navmenu");
        var that = this;
		window.setTimeout(function() {
			that.navMenu.activate();
		}, 0);
        
        console.log("AEF.Page.MainPage completed");
    },
	
	CLASS_NAME: "AEF.Page.MainPage"
});