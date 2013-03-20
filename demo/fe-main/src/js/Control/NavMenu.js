/**
 * Class: AEF.Control.NavMenu
 */
AEF.Control.NavMenu = AEF.Class(AEF.Control, {
	
	/**
	 * Property: data
	 * {Object}
	 */
	data: null,

	/**
	 * Property: navBar
	 * {DOMELement}
	 */
	navBar: null,
	
    /**
     * Constructor: AEF.Control.NavMenu
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.Control.prototype.initialize.apply(this, arguments);
        this.currentDoms = [];
    },
    
    /**
     * Method: draw
     * 
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
	draw: function() {
        if (this.div == null) {
            this.div = AEF.Util.createDiv(this.id);
            this.div.className = this.displayClass;   
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        var menudiv = document.createElement("div");
        menudiv.className = "navmenu-menucontent";
        var bgdiv = document.createElement("div");
        bgdiv.className = "navmenu-menubg";
        var menubardiv = document.createElement("div");
        menubardiv.id = "navmenu_menubar";
        var menubarbgdiv = document.createElement("div");
        menubarbgdiv.className = "navmenu-barbg";
        var logodiv = document.createElement("div");
        logodiv.className = "navmenu-log";
        logodiv.innerHTML = "东方龙文";
        var menucontentdiv = document.createElement("div");
        menucontentdiv.className = "navmenu-content";
        this.navBar = document.createElement("div");
        this.navBar.className = "navmenu-baron";
        menucontentdiv.appendChild(this.buildMenuItem());
        menubardiv.appendChild(menubarbgdiv);
        menubardiv.appendChild(this.navBar);
        menudiv.appendChild(bgdiv);
        menudiv.appendChild(logodiv);
        menudiv.appendChild(menucontentdiv);
        this.div.appendChild(menudiv);
        this.div.appendChild(menubardiv);
        this.onToggleBar = AEF.Function.bind(this._onToggleBar, this);
        AEF.Event.observe(this.navBar, 'click', this.onToggleBar);
        return this.div;	
	},
	
	/**
	 * Method: buildMenuItem
	 */
	buildMenuItem: function() {
		var fragment = document.createDocumentFragment(),
			list = this.data.list,
			len = list.length;
		for(var i = 0; i < len; i++) {
			var _data = list[i];
			var dom = document.createElement("div");
			var bgdom = document.createElement("div");
			if(_data.current == "true") {
				dom.className = "navmenu-menuitem-container select";
			} else {
				dom.className = "navmenu-menuitem-container";
			}
			bgdom.className = "navmenu-menuitem-bg";
			var textdom = document.createElement("div");
			textdom.className = "navmenu-menuitem-text";
			textdom.innerHTML = _data.title;
			dom.appendChild(bgdom);
			dom.appendChild(textdom);
			if(_data.children) {
				var _children = _data.children,
					_len = _children.length;
				var childrenitemdom = document.createElement("div");
				childrenitemdom.className = "navmenu-menuitem-plus";
				childrenitemdom.innerHTML = "+";
				var childrenmenudom = document.createElement("div");
				childrenmenudom.className = "navmenu-menuitem-childrenmenu";
				for(var j = 0; j < _len; j++) {
					var _childrenmenudom = document.createElement("div");
					if(j == 0 && _data.current == "true") {
						_childrenmenudom.className = "navmenu-childrenmenuitem-item select";
					} else {
						_childrenmenudom.className = "navmenu-childrenmenuitem-item";
					}
					var _childrenmenubgdom = document.createElement("div");
					_childrenmenubgdom.className = "navmenu-childrenmenuitem-bg";
					var _childrenmenutextdom = document.createElement("div");
					_childrenmenutextdom.className = "navmenu-childrenmenuitem-text";
					_childrenmenutextdom.innerHTML = _children[j].title;
					_childrenmenudom.appendChild(_childrenmenubgdom);
					_childrenmenudom.appendChild(_childrenmenutextdom);
					childrenmenudom.appendChild(_childrenmenudom);
					if(_children[j].link) {
						_childrenmenudom.setAttribute("data-link", _children[j].link);
						AEF.Element.addClass(_childrenmenudom, "navmenu-link");
					} else {
						_childrenmenudom.setAttribute("data-id", _children[j].id);
						_childrenmenudom.setAttribute("data-mid", _children[j].mid);
					}
					_childrenmenudom.addEventListener("click", function(e) {
						AEF.Event.stop(e);
						if(AEF.Element.hasClass(this, "select"))	return;
						var domlink = this.getAttribute("data-link");
						if(domlink) {
							window.open(domlink, "newtab");
							return;
						} else {
							that.excuteCommand(this.getAttribute("data-id"), this.getAttribute("data-mid"));
						}							
						that.removeAllSelect();
						AEF.Element.addClass(this, "select");					
						if(AEF.Element.hasClass(this.parentNode.parentNode, "select"))	return;
						AEF.Element.addClass(this.parentNode.parentNode, "select");
					});
				}
				dom.appendChild(childrenitemdom);
				dom.appendChild(childrenmenudom);
				var _clonedom = childrenmenudom,
					__len = _len,
					_dom = dom;
				(function(__clonedom, ___len, __dom) {
					dom.addEventListener("mouseover", function(e) {
						AEF.Event.stop(e);
						__clonedom.style.height = ___len * 32 + "px";
					});	
					dom.addEventListener("mouseout", function(e) {
						AEF.Event.stop(e);
						__clonedom.style.height = "0px";
					});			
				}(_clonedom, __len, _dom));			
			} else {
				var that = this;
				if(_data.link) {
					dom.setAttribute("data-link", _data.link);
					AEF.Element.addClass(dom, "navmenu-link");
				} else {
					dom.setAttribute("data-id", _data.id);
					dom.setAttribute("data-mid", _data.mid);
				}
				dom.addEventListener("click", function(e) {
					AEF.Event.stop(e);
					if(AEF.Element.hasClass(this, "select"))	return;
					var domlink = this.getAttribute("data-link");
					if(domlink) {
						window.open(domlink, "newtab");
						return;
					} else {
						that.excuteCommand(this.getAttribute("data-id"), this.getAttribute("data-mid"));
					}					
					that.removeAllSelect();
					AEF.Element.addClass(this, "select");
				});
			}
			fragment.appendChild(dom);
		}
		return fragment;
	},
	
	/**
	 * Method: removeAllSelect
	 */
	removeAllSelect: function() {
		var doms = document.getElementsByClassName("select"),
			len = doms.length;
		for(var i = len; i--; ) {
			AEF.Element.removeClass(doms[i], "select")
		}
	},
	
	/**
	 * Method: _onToggleBar
	 * 点击收缩
	 */
	_onToggleBar: function() {
		if(this.active) {
			this.deactivate();
		} else {
			this.activate();
		}
	},
	
	/**
	 * Method: excuteCommand
	 * Parameters:
	 * id	-	{String}
	 */
	excuteCommand: function(id, mid) {
		this.page.excuteCommand("ChangedNav", {id: id, mid: mid});
	},
	
	CLASS_NAME: "AEF.Control.NavMenu"
});