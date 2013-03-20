/**
 * Class: AEF.Command.ChangedNavCommand
 */
AEF.Command.ChangedNavCommand = AEF.Class(AEF.Command, {
	
	/**
	 * Property: contentLayer
	 * {AEF.Layer.ContentLayer}
	 */
	contentLayer: null,
	
	/**
	 * Property: bgLayer
	 * {AEF.Layer.BackgroundLayer}
	 */
	bgLayer: null,
		
    /**
     * Constructor: AEF.Command.ChangedNavCommand
     *
     * Parameters:
     * name	-	{String}
     * options - {Object} 
     */
    initialize: function(name, options) {
        AEF.Command.prototype.initialize.apply(this, arguments);
        this.initTemplate = AEF.Function.bind(this._initTemplate, this);
        this.setCurrentLayer = AEF.Function.bind(this._setCurrentLayer, this);
    },
    
	/**
	 * API Method:
	 * execute
	 */
	execute: function(option) {
		AEF.Command.prototype.execute.apply(this, arguments);
		if(this.contentLayer == null) {
			this.contentLayer = this.page.getLayer("browser_fe_contentlayer");
			this.contentLayer.on("ContentLayer-ChildChanged", this, this.setCurrentLayer);
		}
		if(this.bgLayer == null) {
			this.bgLayer = this.page.getLayer("browser_fe_bglayer");
		}
		var id = option.id;
		var layer = this.getLayerByMid(id);
		var currentlayer = this.getCurrentLayer();
		if(currentlayer) {
			currentlayer.deactivate();
		}
		this.getDataByType(id, this.initTemplate);
	},
	
	/**
	 * Method: getCurrentLayer
	 * 
	 */
	getCurrentLayer: function() {
		return this.contentLayer.getCurrentLayer();
	},
	
	/**
	 * Method: getLayerByMid
	 * 查看模版是否已经被初始化
	 * Parameters:
	 * 	id	-	{String}
	 */
	getLayerByMid: function(id) {
		return this.contentLayer.getChildrenLayerById(id);
	},
	
	/**
	 * Method: initTemplate
	 * 初始化模版
	 * Parameters:
	 * 	data	-	{Object}
	 */
	_initTemplate: function(data) {
		return this.contentLayer.initTemplate(data);
	},
	
	/**
	 * Method: getDataByType
	 * 根据模版类型拉取数据
	 * Parameters:
	 * callback	-	{Function}
	 */
	getDataByType: function(id, callback) {
		InterFaceMainPage.getDataById(id, callback);
	},
	
	/**
	 * Method: activateChildLayer
	 * 激活指定的子图层
	 * 
	 * Parameters:
	 * layer	-	{AEF.ChildrenLayer}
	 */
	activateChildLayer: function(layer) {
	//	this.contentLayer.notify
	},
	
	/**
	 * Method: setCurrentLayer
	 * 设置当前显示的layer
	 * Parameters:
	 * layer
	 */
	_setCurrentLayer: function(layer) {
		this.contentLayer.setCurrentLayer(layer);
	},
	
	CLASS_NAME: "AEF.Command.ChangedNavCommand"
});
