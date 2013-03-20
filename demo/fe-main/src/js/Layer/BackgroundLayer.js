/**
 * Class: AEF.Layer.BackgroundLayer
 */
AEF.Layer.BackgroundLayer = AEF.Class(AEF.Layer, {
	
	/**
	 * Property: themes
	 * {String}
	 * 背景图层的样式	-	颜色或图片对象 
	 */
	themes: "image",
	
	/**
	 * Property: background
	 * {Object} 
	 */
	background: null,
	
    /**
     * Constructor: AEF.Layer.BackgroundLayer
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
    		this.background = this.background || {
    			color: "",
    			url: "resources/themes/default/images/bg/bck-04.jpg",
    			position: "center center",
    			repeat: "repeat",
    			backgroundSize: "cover"
    		};
    	} else {
    		this.background = this.background || {
    			color: "",
    			url: "resources/themes/default/images/bg/bck-03.jpg",
    			position: "center center",
    			repeat: "repeat",
    			backgroundSize: "cover"
    		};
    	}
    //	this.updateBackground(this.background);
    },
    
    /**
     * Method: updateBackground
     * 设置背景图层
     * Parameters:
     * back	-	{String或者Object} 
     */
    updateBackground: function(back) {
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
     * Method changedImage
     */
    
    
    /**
     * API Method:afterAdd 
     */
    afterAdd: function() {
    	
    },
	
	CLASS_NAME: "AEF.Layer.BackgroundLayer"
});
