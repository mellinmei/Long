/**
 * Class: AEF.Layer.SkinLayer
 */
AEF.Layer.SkinLayer = AEF.Class(AEF.Layer, {
	
	/**
	 * Property: isBaseLayer
	 * {Boolean}
	 */
	isBaseLayer: true,
	
	/**
	 * Property: themes
	 * {String}
	 * 背景图层的样式	-	颜色或图片对象 
	 */
	themes: "color",
	
	/**
	 * Property: background
	 * {Object} 
	 */
	background: null,
	
    /**
     * Constructor: AEF.Layer.SkinLayer
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {
        AEF.Layer.prototype.initialize.apply(this, arguments);
		this.initBackground();
    },	
    
    /**
     * Method: initBackground
     * 初始化图层背景 
     */
    initBackground: function() {
    	if(this.themes == "color") {
    		this.background = this.background || "#E1424A";
    	} else {
    		this.background = this.background || {
    			color: "",
    			url: "resources/themes/default/images/background.png",
    			position: "center center",
    			repeat: "repeat",
    			backgroundSize: "cover"
    		};
    	}
    	this.setBackground(this.background);
    },
    
    /**
     * Method: setBackground
     * 设置背景图层
     * Parameters:
     * back	-	{String或者Object} 
     */
    setBackground: function(back) {
    	if(typeof back == "string") {
    		this.div.style.background = back;
    	} else {
    		var color = back.color,
    			url = back.url,
    			position = back.position,
    			repeat = back.repeat,
    			backgroundSize = back.backgroundSize;
    		var image = new Image();
    		image.src = url;
    		var that = this;
    		image.onload = function() {
				that.div.style.background = color + " url('" + url + "') " + position + " " + repeat;
				that.div.style.backgroundSize = backgroundSize;    			
    		}
    	}
    },
    
    
    /**
     * API Method:afterAdd 
     */
    afterAdd: function() {
    	
    },
	
	CLASS_NAME: "AEF.Layer.SkinLayer"
});
