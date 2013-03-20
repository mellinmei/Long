/**
 * Class: AEF.Layer.SkinLayer
 */
AEF.Layer.SkinLayer = AEF.Class(AEF.Layer, {

	/**
	 * Property: currentPageId
	 * {String}  
	 */
	currentPageId: null,
	
	/**
	 * Property: isBaseLayer
	 * {Boolean}
	 */
	isBaseLayer: true,
	
    /**
     * Constructor: AEF.Layer.SkinLayer
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.Layer.prototype.initialize.apply(this, arguments);
    },		
	
	CLASS_NAME: "AEF.Layer.SkinLayer"
});
