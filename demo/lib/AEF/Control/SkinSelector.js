/**
 * Class: AEF.Control.SkinSelector
 */
AEF.Control.SkinSelector = AEF.Class(AEF.Control, {
	
	/**
	 * Property: skinResolution
	 * {Number} 
	 */
	skinResolution: null,
	
	/**
	 * Property: selectSkinBox
	 * {DOMElement} 
	 */
	selectSkinBox: null,
	
	/**
	 * Property: selectSkinContainer
	 * {DOMElement}
	 */
	selectSkinContainer: null,
	
	/**
	 * Property: lightLineButton
	 * {DOMElement} 
	 */
	lightLineButton: null,
	
	/**
	 * Property: selectColorContainer
	 * {DOMElement} 
	 */
	selectColorContainer: null,
	
	/**
	 * Property: lingtDragging
	 * {Boolean} 
	 */
	lingtDragging: false,
	
	/**
	 * Property: lightTween
	 * {<AEF.Tween} 
	 */
	lightTween: null,
	
	/**
	 * Property: autoActivate
	 * {Boolean} 
	 */
	autoActivate: true,
	
	/**
	 * Property: skinLayerIsShow
	 * {Boolean} 
	 */
	skinLayerIsShow: false,
	
	/**
	 * Property: currentSkinId
	 * {String} 
	 */
	currentSkinId: null,
	
	/**
	 * Property: skinLayerTween
	 * {<AEF.Tween>} 
	 */
	skinLayerTween: null,
	
	/**
	 * Property: skinData
	 * {Object} 
	 */
	skinData: null,
	
	/**
	 * Property: skinList
	 * {Array} 
	 */
	skinList: null,
	
	/**
	 * Property: skinDom
	 * {Array} 
	 */
	skinDom: null,
	
	/**
	 * Property: skin
	 * {Array} 
	 */
	skin: null,
	
	/**
	 * Property: ls
	 * {Object} 
	 */
	ls: null,
	
	/**
	 * Property: username
	 * {String} 
	 */
	username: null,
	
    /**
     * Constructor: AEF.Control.SkinSelector
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.Control.prototype.initialize.apply(this, arguments);
        this.ls = window.localStorage;
        this.skinList = AEF.Control.SkinSelector.SKIN_LISTS;
        this.skinDom = [];
        this.skinData = {};
        this.skin = [];
        this.setSkinResolution();
        this.initSkinData();
    },	
    
    /**
     * API Method: setSkinResolution
     */
    setSkinResolution: function() {
    	var len = AEF.Control.SkinSelector.RESOLUTION_LIST.length,
    		width = screen.width;
    	for(var i = len; i--; ) {
    		if(AEF.Control.SkinSelector.RESOLUTION_LIST[i] >= width) {
    			this.skinResolution = AEF.Control.SkinSelector.RESOLUTION_LIST[i];
    			return;
    		}
    	}
    	this.skinResolution = AEF.Control.SkinSelector.RESOLUTION_LIST[len - 1];
    },
	
    /**
     * Method: draw
     * 
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
	draw: function() {
        if (this.div == null) {
        	this.div = document.createElement("div");
			this.div.id = this.id;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = AEF.Function.False; 
            }    
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        this.div.appendChild(this.buildSelector());
        return this.div;		
	},
	
	/**
	 * Method: initSkinData 
	 */
	initSkinData: function() {
		this.skinData = {};
		var list = AEF.Control.SkinSelector.SKIN_LISTS.concat(AEF.Control.SkinSelector.COLORS),
			len = list.length,
			i = 0;
		for( ; i < len; i++) {
			var id = list[i].id;
			this.skinData[id] = list[i];
		}
	},
	
	/**
	 * Method: buildSelector 
     * Returns:
     * {DOMElement} 
	 */
	buildSelector: function() {
		if(this.selectSkinBox == null) {
			this.selectSkinBox = document.createElement("div");
			this.selectSkinBox.className = "selectSkinLayerBox";			

			
			this.selectSkinContainer = document.createElement('div');
			this.selectSkinContainer.className = 'selectSkinLayer';
			
			
			this.selectColorContainer = document.createElement('div');
			this.selectColorContainer.className = 'selectSkinColorLayer';
			
			
			var downLight = document.createElement('div');
			downLight.className = 'selectSkinDownlight';
			
			
			var selectSinkCloseButton = document.createElement('div');
			selectSinkCloseButton.className = 'selectSkinCloseButton';
			
			this.lightLineButton = document.createElement('div');
			this.lightLineButton.className = 'selectSkinLightButton';
			
			
			/**
			 * More buton
			 */
			var skinMoreButton = document.createElement('div');
			skinMoreButton.className = 'skinMoreButton';
			skinMoreButton.innerHTML = '更多壁纸';
			downLight.appendChild(selectSinkCloseButton);
			downLight.appendChild(this.lightLineButton);
			downLight.appendChild(skinMoreButton);
			this.selectSkinBox.appendChild(this.selectSkinContainer);
			this.selectSkinBox.appendChild(this.selectColorContainer);
			this.selectSkinBox.appendChild(downLight);
			var that = this;
			this.lightLineButton.addEventListener("mouseover", function(e) {
				that.overLightLine();	
			});
			this.lightLineButton.addEventListener("mouseout", function(e) {
				that.outLightLine();
			});
			this.lightLineButton.addEventListener("click", function(e) {
				if(!that.skinLayerIsShow){
					that.showSkinLayer(e);
				}else{
					that.hideSkinLayer(e);
				}
			});
		}
		
		this.buildSkinBox();
		this.buildColorList();
		return this.selectSkinBox;
	},
	
	/**
	 * Private Method:
	 * buildSkinBox 
	 */
	buildSkinBox: function() {
		var list = AEF.Control.SkinSelector.SKIN_LISTS;
		var that = this;
		for(var i = 0; i < 9; i++) {
			var itemBox = document.createElement("div");
			itemBox.className = 'skinItemBox';
			//var item = itemBox.item = document.createElement('div');
			var item = document.createElement('div');
			item.className = 'skinItem';
			itemBox.appendChild(item);	
			this.selectSkinContainer.appendChild(itemBox);
			this.skinDom.push(itemBox);
			var itemLoading = null,
				data = null,
				imageEl = null;
			if(i) {
				item.style.backgroundColor = "rgb(58, 60, 62)"
				//itemLoading = itemBox.itemLoading = document.createElement('div');
				itemLoading = document.createElement('div');
				itemLoading.className = 'skin-loading';
				item.appendChild(itemLoading);	
			} else {
				//imageEl = itemBox.imageEl = document.createElement('img');
				imageEl = document.createElement('img');
				data = list[0];
				imageEl.src = data.thumbnail;
				imageEl.className = 'skinItemImage';
				item.appendChild(imageEl);	
				itemBox.setAttribute('data-id', data.id);
				itemBox.onclick = function(){
					that.setSkin(data.id, this);
				};				
			}
			var skinObj = {
				"data": data,
				"lDom": itemLoading,
				"cDom": item,
				"iDom": imageEl,
				"dom": itemBox	
			};
			this.skin.push(skinObj);		
		}
		this.getLocalSkin();
	},
	
	/**
	 * Private Method:
	 * getIndexByIdOfSkin 
	 */
	getIndexByIdOfSkin: function(id) {
		var len = this.skin.length,
			i = 0;
		for(; i < len; i++) {
			if(!this.skin[i].data.id)	continue;
			if(id == this.skin[i].data.id) {
				return i;
			}
		}
		return -1;
	},
	
	/**
	 * Private Method:
	 * getCDomById 
	 */
	getItemByType: function(id, type) {
		var index = this.getIndexByIdOfSkin(id);
		if(index != -1)	return this.skin[index][type];
		return null;
	},
	
	
	/**
	 * Private Method:
	 * getLocalSkin 
	 */
	getLocalSkin: function() {
		var list = AEF.Control.SkinSelector.SKIN_LISTS;
		if(!this.username) {
			this.username = "";
		}
		var key = AEF.Control.SkinSelector.SKINLISTKEYPREFIX + 1 + '_' + this.username;
		var result = this.ls.getItem(key) || {};
		var value = result.value;	
		this.skinData[list[0].id] = list[0];	
		this.getWallpaperData(true);
	},
	
	/**
	 * Private Method:
	 * applyDefaultWallpapers 
	 * 
	 * Patetermers:
	 * index	-	{Number}
	 */
	applyDefaultWallpapers: function(index) {
		for(var i = index; i < 9; i++) {
			this.reverseToNormal(this.skinList[i], this.skinDom[i], i);
		}			
	},
	
	/**
	 * Private Method:
	 * getWallpaperData 
	 * 
	 * Parmeters:
	 * iscall	-	{Boolean}
	 */
	getWallpaperData: function(iscall) {
		var iscall = iscall ? 0 : 1;
		var that = this;
		var onFailure = function() {
			that.applyDefaultWallpapers(iscall);
		};
		baidu.sio.callByServer(AEF.Control.SkinSelector.WALLPAPERSURL, function(data) {
				if(!data.content || !data.content.list) return;	
				var list = data.content.list;
				for(var i = 1; i < 9; i++) {
					//如果不是同一张壁纸，或者壁纸曾经被修改过
					var itemData = list[i - 1];
					itemData.areaid = -1;
					itemData.areaname = '拉绳';
					if(that.skinList[i].id !== itemData.id || that.skinList[i].stime !== itemData.stime) {
						if(!that.skin[i]["dom"]) return;
						var imageBuffer = new Image();
						imageBuffer.src = itemData.thumbnail;
						(function() {
							var index = i;
							var cacheItemData = itemData;
							var isImageSuccess = false;
							imageBuffer.onload = function() {
								isImageSuccess = true;
								that.skinList[index] = cacheItemData;
								that.skinData[that.skinList[index].id] = cacheItemData;
								that.skin[index].data = cacheItemData;
								that.reverseToNormal(that.skin[index], index);
							};
							//如果图片加载失败，显示上次对应位置的图片
							setTimeout(function() {
								if(isImageSuccess) return;
								imageBuffer.onload = null;
								that.reverseToNormal(that.skinList[index], that.skinDom[index], index);
								that.skinData[slef.skinList[index].id] = that.skinList[index];
							}, 10000);							
						})();

				}
				//如果没变
				else {
				//	that.reverseToNormal(that.skinList[i], that.skinDom[i], i, itemData);
				//	that.skinData[that.skinList[i].id] = that.skinList[i];
					that.skin[i].data = that.skinList[i];
					that.reverseToNormal(that.skin[i], i, itemData);
				}
			}				
			
			},{
				timeout: 10000,
				onfailure: onFailure		
		});
		
	},
	
	/**
	 * Private Method: 
	 * reverseToNormal 
	 */
	reverseToNormal: function(obj, index, itemData) {
		var that = this,
			cDom = obj.cDom,
			lDom = obj.lDom,
			iDom = obj.iDom,
			data = obj.data,
			dom = obj.dom;
		if(lDom) {
			if(lDom) {
				cDom.removeChild(lDom);
			}
			obj.lDom = null;
			cDom.style.removeProperty("background-color");
			if(iDom) {
				cDom.removeChild(iDom);
			}
			var imageEl = obj.iDom =  document.createElement('img');
			imageEl.onload = function() {
				success = true;
			};
			//因为这里读取的都是内存有缓存或者本地的图片，所以不用延时太久，只是为了账号同步的容错
			setTimeout(function() {
				if(success || !itemData || !itemData.thumbnail) return;
				imageEl.src = itemData.thumbnail;
			}, 1000 + parseInt(index) * 100);
			imageEl.src = data.thumbnail;
			imageEl.className = 'skinItemImage';
			cDom.appendChild(imageEl);							
		}
		dom.setAttribute('data-id', data.id);
		dom.onclick = function(){
			that.setSkin(this.getAttribute('data-id'), dom);
		};				
	},
	/*
	reverseToNormal: function(data, el, index, backup) {
		var that = this;
		if(el.item) {
			if(el.itemLoading) {
				el.item.removeChild(el.itemLoading);
			}
			el.itemLoading = null;
			el.item.style.removeProperty("background-color")
			if(el.imageEl) {
				el.item.removeChild(el.imageEl);
			}
			var imageEl = el.imageEl =  document.createElement('img');
			var success = false;
			imageEl.onload = function() {
				success = true;
			};
			
			//因为这里读取的都是内存有缓存或者本地的图片，所以不用延时太久，只是为了账号同步的容错
			setTimeout(function() {
				if(success || !backup || !backup.thumbnail) return;
				imageEl.src = backup.thumbnail;
				//必须分开存，否则会崩溃
			}, 1000 + parseInt(index) * 100);
			imageEl.src = data.thumbnail;
			imageEl.className = 'skinItemImage';
			el.item.appendChild(imageEl);			
		}	
		el.setAttribute('data-id', data.id);
		el.onclick = function(){
			that.setSkin(this.getAttribute('data-id'), el);
		};		
	},
	*/
	/**
	 * Private Method: buildColorList 
	 */
	buildColorList: function() {
		var list = 	AEF.Control.SkinSelector.COLORS,
			len = list.length;
		this.skinData = this.skinData || {};
		for(var i = 0; i < len; i++) {
			var skin = list[i];
			this.skinData[skin.id] = skin;
			this.buildColorItem(skin);
		}
		
	},
	
	/**
	 * Private Method: buildColorItem 
	 * Parameters:
	 * skin	-	{Object}
	 */
	buildColorItem: function(skin) {
		var that = this;
		var itemBox = document.createElement('div');
		itemBox.className = 'skinItemBox';	
		var item = document.createElement('div');
		item.className = 'skinItem';
		item.setAttribute('data-id', skin.id);
		item.style.backgroundColor = skin.color;
		itemBox.appendChild(item);
		this.selectColorContainer.appendChild(itemBox);
		item.onclick = function(){
			that.setSkin(this.getAttribute('data-id'), item);
		};		
	},
	
	/**
	 * Method: showSkinLayer 
	 */
	showSkinLayer: function(e) {
		if(this.skinLayerTween){
			this.skinLayerTween.stop();
		}
		this.skinLayerTween = new AEF.Animation(AEF.Easing.Back.easeOut);	
		var last = {top: -414};
		var that = this;
		this.skinLayerTween.start({top: -414}, {top: -106}, "500", {
			callbacks: {
				eachStep: AEF.Function.bind(function(btop) {
			    	var top = btop.top - last.top;
			    	that.selectSkinBox.style.top = last.top + top + "px";
			    	last.top = Math.round(btop.top);
			    }, that),
			    done: AEF.Function.bind(function(btop) {
			        that.selectSkinBox.style.top = "-106px"; 
			        this.skinLayerTween = null;
			    	this.events.triggerEvent("SkinBox-moveEnd");
			    	that.outLightLine();
			    }, that)			    
			}
		});	
		this.skinLayerIsShow = true;
	},
	
	/**
	 * Method: hideSkinLayer 
	 */
	hideSkinLayer: function(e) {
		if(!this.skinLayerIsShow)	return;
		if(this.skinLayerTween){
			this.skinLayerTween.stop();
		}
		this.skinLayerTween = new AEF.Animation(AEF.Easing.Expo.easeIn);	
		var last = {top: -106};
		var that = this;
		this.skinLayerTween.start({top: -106}, {top: -414}, "300", {
			callbacks: {
				eachStep: AEF.Function.bind(function(btop) {
			    	var top = btop.top - last.top;
			    	that.selectSkinBox.style.top = last.top - top + "px";
			    	last.top = Math.round(btop.top);
			    }, that),
			    done: AEF.Function.bind(function(btop) {
			        that.selectSkinBox.style.top = "-414px"; 
			        this.skinLayerTween = null;
			    	this.events.triggerEvent("SkinBox-backEnd");
			    }, that)			    
			}
		});		

		this.skinLayerIsShow = false;	
		this.outLightLine();		
	},
	
	/**
	 * Private Method:
	 * outLightLine 
	 */
	outLightLine: function() {
		if(this.lingtDragging) {
			return;
		}
		if(this.lightTween) {
			this.lightTween.stop();
		}
		this.lightween = new AEF.Animation(AEF.Easing.Quad.easeIn);
		var last = {y: -114};
		var that = this;
        this.lightween.start( {y: -114}, {y: -129}, "200", {
			callbacks: {
				eachStep: AEF.Function.bind(function(by) {
			    	var y = by.y - last.y;
			    	that.lightLineButton.style.backgroundPositionY = last.y - y + "px";
			    	last.y = Math.round(by.y);
			    }, that),
			    done: AEF.Function.bind(function(by) {
			        that.lightLineButton.style.backgroundPositionY = "-129px"; 
			        this.lightween = null;
			    	this.events.triggerEvent("linghtLine-backEnd");
			    }, that)
			}
        });   		
    	this.lingtDragging = true;
	},
	
	/**
	 * Private Method:
	 * overLightLine 
	 */
	overLightLine: function() {
        if (this.lightTween) {
            this.lightTween.stop();
        }
        this.lightween = new AEF.Animation(AEF.Easing.Quad.easeOut);
        var last = {y: -129};
        var that = this;
        this.lightween.start( {y: -129}, {y: -114}, "200", {
			callbacks: {
				eachStep: AEF.Function.bind(function(by) {
			    	var y = by.y - last.y;
			    	that.lightLineButton.style.backgroundPositionY = last.y + y + "px";
			    	last.y = Math.round(by.y);
			    }, that),
			    done: AEF.Function.bind(function(by) {
			        that.lightLineButton.style.backgroundPositionY = "-114px"; 
			        this.lightween = null;
			    	this.events.triggerEvent("moveend");
			    }, that)
			}
        });     
        this.lingtDragging = false;   
	},
	
	/**
	 * API Method: setUserName 
	 * Parmerters:
	 * name	-	{String}
	 */
	setUserName: function(name) {
		this.username = name;
	},
	
	/**
	 * API Method:
	 * setSkin 
	 */
	setSkin: function(arg, notSave, isInit, callback) {
		if(arg.id != undefined || arg.id != null) {
		//	if()
		//	currentSkinId
		}
		this.page.excuteCommand("PAGE_SETSKIN", arg.id);
		console.log("Command SET_SKIN: " + arg);
		var isSkinDom = this.skinDom.indexOf(notSave);
		if(isSkinDom != -1) {
			this.addLoading(notSave, isSkinDom);	
		}
			
	},
	
	
	/**
	 * API Method:
	 * addLoading
	 */
	addLoading: function(el, index) {
		var len = this.skinDom.length;
		for(var i = len; i--; ) {
			if(i == index)	continue;
			this.removeLoading(this.skinDom[i]);
		}
		var le = el.loadingEl = document.createElement('div');
			le.className = 'wallpaperloading';
				
		var re = el.loadingRotateEl = document.createElement('div');
			re.className = 'skinLoading';
				
		le.appendChild(re);
		el.item.appendChild(le);		
	},
	
	/**
	 * API Method: 
	 * removeLoading 
	 */
	removeLoading: function(el) {
		if(!el.loadingEl) return;
		el.loadingEl.style.webkitTransition = 'height .5s linear';
		setTimeout(function() {
			el.loadingEl.style.height = "0px";	
		}, 0);
		setTimeout(function() {
			if(el.loadingRotateEl) {
				el.loadingEl.removeChild(el.loadingRotateEl);
				el.loadingRotateEl = null;
			}
			if(el.loadingEl) {
				el.item.removeChild(el.loadingEl);
					el.loadingEl = null;
			}
		}, 800);	
	},
	
	/**
	 * API Method:
	 * highLight 
	 */
	highLight: function() {
		if(!AEF.Element.hasClass(this.lightLineButton)) {
			AEF.Element.addClass(this.lightLineButton, "highLight");
		}
	},
	
	/**
	 * API Method:
	 * lowLight 
	 */
	lowLight: function() {
		if(AEF.Element.hasClass(this.lightLineButton)) {
			AEF.Element.removeClass(this.lightLineButton, "highLight");
		}		
	},
	
	CLASS_NAME: "AEF.Control.SkinSelector"
});

AEF.Control.SkinSelector.MAX_PAGE = 12;
AEF.Control.SkinSelector.RESOLUTION_LIST = [1024, 1280, 1440, 1680, 1920];
AEF.Control.SkinSelector.NORMAL_ALPHA = 0.4;
AEF.Control.SkinSelector.BUTTON_CLEAR_MERGE = 200;
AEF.Control.SkinSelector.WALLPAPERSURL = "http://xapp.baidu.com/interface/lib.get_wallpaper_default_list";
AEF.Control.SkinSelector.COLORS = [{id: "10", color: "#F28637"}, {id: "11", color: "#80883A"}
	, {id: "12", color: "#FD91A3"}, {id: "13", color: "#89A8BC"}, {id: "14", color: "#B3AD7E"}
	, {id: "15", color: "#6D6060"}, {id: "16", color: "#BEBEBE"}];
AEF.Control.SkinSelector.SKINLISTKEYPREFIX = "defaulSkinList";
AEF.Control.SkinSelector.SKINLISTFILEPREFIX = "defaulSkinThumbnail";

AEF.Control.SkinSelector.SKIN_LISTS = [{
	id: '1',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#ffffff',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 0, //0: top, 1: center, 2: bottom
	stime: 0,
	image_1024: 'resources/themes/default/images/skins/wallpaper_01_1920.jpg',
	image_1280: 'resources/themes/default/images/skins/wallpaper_01_1920.jpg',
	image_1440: 'resources/themes/default/images/skins/wallpaper_01_1920.jpg',
	image_1680: 'resources/themes/default/images/skins/wallpaper_01_1920.jpg',
	image_1920: 'resources/themes/default/images/skins/wallpaper_01_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/default.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '2',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#28639D',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 2, //0: top, 1: center, 2: bottom
	stime: 0,
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/002_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/002_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/002_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/002_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/002_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/002.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '3',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#6F9DC1',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 2, //0: top, 1: center, 2: bottom
	stime: 0,
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/003_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/003_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/003_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/003_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/003_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/003.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '4',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#0D0805',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 0, //0: top, 1: center, 2: bottom
	stime: 0,
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/004_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/004_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/004_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/004_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/004_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/004.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '5',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#000000',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 1, //0: top, 1: center, 2: bottom
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/005_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/005_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/005_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/005_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/005_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/005.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '6',
	repeat: 3, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#000000',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 0, //0: top, 1: center, 2: bottom
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/006.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/006.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/006.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/006.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/006.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/006.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '7',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#000000',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 0, //0: top, 1: center, 2: bottom
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/007_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/007_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/007_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/007_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/007_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/007.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '8',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#3270AB',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 0, //0: top, 1: center, 2: bottom
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/012_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/012_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/012_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/012_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/012_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/012.jpg',
	areaid: -1,
	areaname: '拉绳'
},{
	id: '9',
	repeat: 1, //0: no-repeat, 1: repeat-x, 2: repeat-y, 3: repeat
	color: '#96B953',
	opacity: 1, //背景透明度
	position_x: 0, //0: left, 1: center, 2: right
	position_y: 1, //0: top, 1: center, 2: bottom
	image_1024: 'http://liulanqi.baidu.com/wallpaperM1/011_1024.jpg',
	image_1280: 'http://liulanqi.baidu.com/wallpaperM1/011_1280.jpg',
	image_1440: 'http://liulanqi.baidu.com/wallpaperM1/011_1440.jpg',
	image_1680: 'http://liulanqi.baidu.com/wallpaperM1/011_1680.jpg',
	image_1920: 'http://liulanqi.baidu.com/wallpaperM1/011_1920.jpg',
	thumbnail: 'resources/themes/default/images/skins/thumbnail/011.jpg',
	areaid: -1,
	areaname: '拉绳'
}];
