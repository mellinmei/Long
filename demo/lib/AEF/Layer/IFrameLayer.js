/**
 * Class: AEF.Layer.IFrameLayer
 */
AEF.Layer.IFrameLayer = AEF.Class(AEF.Layer, {
	
	/**
	 * Property: isBaseLayer
	 * {Boolean}
	 */
	isBaseLayer: false,
	
	/**
	 * Property: currentSrc
	 * {String} 
	 */
	currentSrc: null,
	
	/**
	 * Property: iframeDom
	 * {IFrameElement} 
	 */
	iframeDom: null,
	
    /**
     * Constructor: AEF.Layer.IFrameLayer
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.Layer.prototype.initialize.apply(this, arguments);
        this.buildIframDom()
        this.div.appendChild(this.iframeDom);
    },	
    
    /**
     * API Method:afterAdd 
     */
    afterAdd: function() { 	
		this.page.reportTimeToBrowser("Extension.invoke.fe.currentTime", "loaded.hot");
    },    
    
    /**
     * Private Method:
     * buildIframDom 
     */	
    buildIframDom: function() {
    	var that = this;
    	this.iframeDom = document.createElement("iframe");
    	this.iframeDom.className = "iframeLayer-iframe";
    },
    
    /**
     * APIMethod: changedSrc 
     */
    changedSrc: function(src) {
    	if(this.currentSrc == src)	return;
    	this.currentSrc = src;
    	this.iframeDom.src = src;
    },
    
    /**
     * APIMethod: setNone 
     */
    setNone: function() {
    	this.iframeDom.src = "";
    	this.currentSrc = "";
    },
	
	CLASS_NAME: "AEF.Layer.IFrameLayer"
});
