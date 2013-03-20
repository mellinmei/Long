/**
 * Class: AEF.Layer.ContentLayer
 */
AEF.Layer.ContentLayer = AEF.Class(AEF.Layer, {
	
	/**
	 * Property: currentChildrenLayer
	 * {}
	 */
	currentChildrenLayer: null,
	
	/**
	 * Property: childrenLayers
	 * {Array}
	 */
	childrenLayers: null,
	
    /**
     * Constructor: AEF.Layer.ContentLayer
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {
        AEF.Layer.prototype.initialize.apply(this, arguments);
        this.childrenLayers = this.childrenLayers || [];
    },	
    
    /**
     * Method: getChildrenLayerById
     * Parameters:
     * id	-	{String}
     */
    getChildrenLayerById: function(mid) {
    	var len = this.childrenLayers.length;
		if(len == 0)	return null;
		for(var i = len; i--; ) {
			if(this.childrenLayers[i].id == mid) {
				return this.childrenLayers[i];
			}
		}
		return null;  	
    },
    
    /**
     * Method: getCurrentLayer
     * return layer
     */
    getCurrentLayer: function() {
    	return this.currentChildrenLayer;
    },
    
    /**
     * Method: setCurrentLayer
     * 设置当前显示的图层
     */
    setCurrentLayer: function(option) {
    	var layer = option.layer; 
    	if(this.childrenLayers.indexOf(layer) == -1) {
    		this.childrenLayers.push(layer);
    		this.div.appendChild(layer.div);
    		layer.afterAdd();
    	}
    	if(this.currentChildrenLayer) {
    		this.currentChildrenLayer.hidden();
    	}
		this.currentChildrenLayer = layer;
		this.currentChildrenLayer.activate();
    },
    
    /**
     * Method: initTemplate
     * 初始化模版
     */
    initTemplate: function(data) {
    	var id = AEF.Util.clone(data.mid),
    		_id = id;
    	if(!AEF.Layer.ContentLayer.MapChildrenLayer[id]) {
    		_id = "-1";
    	}
    	this.events.triggerEvent("ContentLayer-ChildChanged", {layer: new AEF.Layer.ContentLayer.MapChildrenLayer[_id](data)});	
    },
    
    /**
     * Method: on
     * 加事件
     */
    on: function(eventName, arg, callback) {
    	this.events.register(eventName, arg, callback);
    },
    
    /**
     * API Method:afterAdd 
     */
    afterAdd: function() {
    	
    },
	
	CLASS_NAME: "AEF.Layer.ContentLayer"
});

AEF.Layer.ContentLayer.MapChildrenLayer = {
	"-1": AEF.ChildrenLayer.TextChildrenLayer,
	"browser_fe_1": AEF.ChildrenLayer.FirstPageChildrenLayer
};
