/**
 * Class: AEF.Control.HeadBar
 */
AEF.Control.HeadBar = AEF.Class(AEF.Control, {
	
	/**
	 * Property: tabs
	 * {Array} 
	 */
	tabs: null,
	
	/**
	 * Property: currentTab
	 * {Object} 
	 */
	currentTab: null,
	
	/**
	 * Property: remindDom
	 * {DOMELement} 
	 */
	remindDom: null,
	
	/**
	 * Property: isRemind
	 * {Boolean} 
	 */
	isRemind: false,
	
	/**
	 * Property: count
	 * {Number} 
	 */
	count: 0,
	
	/**
	 * Property: searchdom
	 * {DOMElement} 
	 */
	searchdom: null,
	
	/**
	 * Property: bartype
	 * {String} 
	 */
	bartype: null,
	
	/**
	 * Property: precode
	 * {Number} 
	 */
	precode: null,
	
    /**
     * Constructor: AEF.Control.HeadBar
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.Control.prototype.initialize.apply(this, arguments);
        this.bartype = this.bartype || "";
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
			/*
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = AEF.Function.False; 
            } 
            */   
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        var positiondiv = document.createElement("div");
        positiondiv.className = "header-position";
        positiondiv.appendChild(this.buildNav());
        positiondiv.appendChild(this.searchInput());
        this.div.appendChild(positiondiv);
        return this.div;		
	},
	
	/**
	 * API Method: searchInput 
	 */
	searchInput: function() {
		var fragment = document.createDocumentFragment(),
			that = this;
		this.searchdom = document.createElement("input");
		this.searchdom.type = "text";
		this.searchdom.className = "header-search";
		this.searchdom.maxLength = 32;
		var buttondom = document.createElement("div");
		buttondom.className = "header-button";
		buttondom.addEventListener("click", function() {
			that.searchPage();
		});
		this.searchdom.addEventListener("keyup", function(e) {
			var code = e.keyCode;
			if(String(code) == "13" && String(that.precode) == "13") {
				that.searchPage();
			}	
		});
		this.searchdom.addEventListener("keydown", function(e) {
			var code = e.keyCode;
			that.precode = code;
		});		
		fragment.appendChild(this.searchdom);
		fragment.appendChild(buttondom);
		return fragment;
	},
	
	/**
	 * APIMethod: searchPage 
	 */
	searchPage: function() {
		var value = this.searchdom.value,
			_value = AEF.String.trim(value);
		if(_value.length == 0)	return;
		this.page.reportToBrowserSearch();
		var url =  "http://www.baidu.com/s?ie=utf8&wd=" + encodeURIComponent(_value) + encodeURIComponent(" " + this.bartype);
		window.open(url, "_blank");
	},
	
	/**
	 * Method: buildNav
	 *  
	 */   
	buildNav: function() {
		var dom = document.createElement("nav"),
			len = this.tabs.length,
			i = 0;
		dom.className = "header-nav";
		var that = this;
		for(; i < len; i++) {
			var text = this.tabs[i].text,
				pdom = document.createElement("div");
				pdom.setAttribute("data-id", this.tabs[i].id);
			if(this.tabs[i].current) {
				pdom.className = "header-nav-item current";
				this.page.excuteCommand("CHANGED-LAYER", this.tabs[i].src);
				this.currentTab = {
					id: this.tabs[i].id,
					dom: pdom
				};
			} else {
				pdom.className = "header-nav-item";
			}
			pdom.innerHTML = text;
			if(this.tabs[i].isremind) {
				this.remindDom = document.createElement("div");
				if(this.isRemind) {
					this.checkRemind();
				}
				pdom.appendChild(this.remindDom);
			}
			dom.appendChild(pdom);
			pdom.addEventListener("click", function(e) {
				that.setCurrentTab(e);
			});
		}	
		return dom;
	},
	
	/**
	 * Method: setCurrentTab 
	 */		
	setCurrentTab: function(e) {
		var target = e.target,
			id = e.target.getAttribute("data-id");
		if(id == this.currentTab.id)	return;
		AEF.Element.removeClass(this.currentTab.dom, "current");
		this.currentTab = {
			id: id,
			dom: target
		};
		AEF.Element.addClass(this.currentTab.dom, "current");
		var src = this.getSrcById(id);
		this.page.excuteCommand("CHANGED-LAYER", src);
		this.page.reportToBrowserTab(src);
	},
	
	/**
	 * Private Method:
	 * getSrcById 
	 */ 
	getSrcById: function(id) {
		var len = this.tabs.length,
			i = 0;
		for(; i < len; i++) {
			if(this.tabs[i].id == id) {
				return this.tabs[i].src;
			}
		}
		return false;
	},
	
	/**
	 * API Method: changedRemind 
	 */
	changedRemind: function(count) {
		var _count = parseInt(count);
		this.isRemind = true;
		this.count = _count;		
		if(!this.remindDom) {
			return;
		}
		this.checkRemind();
	},
	
	/**
	 * APIMethod: checkRemind 
	 */
	checkRemind: function() {
		if(this.count > 0 && this.count < 100) {
			this.remindDom.innerHTML = String(this.count);
			this.remindDom.className = "baselayer-tool-remind";
		} else if(this.count >= 100) {
			this.remindDom.innerHTML = "99+";
			this.remindDom.className = "baselayer-tool-remind more";			
		} else {
			this.remindDom.innerHTML = "";
			this.remindDom.className = "baselayer-tool-remind disable";	
		}		
	},
	
	CLASS_NAME: "AEF.Control.HeadBar"
});