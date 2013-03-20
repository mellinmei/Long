/**
 * @author xingyan
 */
AEF.Command = AEF.Class({
	
	/**
	 * Property:
	 * page	-	{AEF.Page}
	 */
	page: null,
	
	/**
	 * Property:
	 * active	-	{Boolean}
	 */
	active: false,
	
	/**
	 * Property:
	 * name	-	{String}
	 */
	name: null,
	
	/**
     * Constructor: AEF.Command
     * Create a new AEF.Command instance
     * Returns:
     * An instance of AEF.Command
	 */	
	initialize: function(name, options) {
		this.name = name || this.CLASS_NAME;
        this.options = AEF.Util.extend({}, options);

        // now override default options 
        AEF.Util.extend(this, options);		
	},
	
	/**
	 * API Method:
	 * activate
	 */
	activate: function() {
		if(!this.active) {
			this.active = true;
		}
	},
	
	/**
	 * API Method:
	 * deactivate
	 */
	deactivate: function() {
		if(this.active) {
			this.active = false;
		}
	},
	
	/**
	 * API Method:
	 * execute
	 */
	execute: function() {
		if(!this.active)	return false;
	},
	
	/**
	 * API Method:
	 * setPage
	 * 
	 * Paratemers:
	 * page	-	{AEF.Page}
	 */
	setPage: function(page) {
		if(this.page != page) {
			this.page = page;
		}
	},
	
	CLASS_NAME: "AEF.Command"
});
