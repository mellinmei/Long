/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Class: AEF.PageList
 */
AEF.PageList = AEF.Class({
	
	/**
	 * Property: div
	 * {DOMElement} 
	 */
	div: null,
	
	/**
	 * Property: events
	 * {AEF.Events} 
	 */
	events: null,
	
	/**
	 * Property: pagelist
	 * {Array} 
	 */
	pagelist: null,
	
	/**

    /**
     * Constructor: AEF.PageList
     * Create an instance of AEF.PageList
     *
     */
    initialize: function(options) {
        var options = AEF.Util.extend({}, options);
        this.addOptions(options);
        this.len = this.len || 1;
        this.current = this.current || 1;
        this.pagelist = [];
        this.events = new AEF.Events(this);
        this.div = document.createElement("div");
        this.div.className = "pagelist";
        this.buildDom();
        this.addEvent();
    },
    
    /**
     * Private Method: buildDom 
     */
    buildDom: function() {
    	var preDom = document.createElement("div");
    	preDom.innerHTML = "上一页";
    	if(this.current == 1) {
    		preDom.className = "pagelist-button pre disabled";
    	} else {
    		preDom.className = "pagelist-button pre";
    	}
    	var nextDom =document.createElement("div");
    	nextDom.innerHTML = "下一页";
    	if(this.current == this.len) {
    		nextDom.className = "pagelist-button next disabled";
    	} else {
    		nextDom.className = "pagelist-button next";
    	}
    	this.div.appendChild(preDom);
    	if(this.len < 10) {
    		this.div.appendChild(this.buildLess());
    	} else {
    		this.div.appendChild(this.buildMore());
    	}
    	this.div.appendChild(nextDom);
    	var that = this;
    	preDom.addEventListener("click", function() {
    		if(preDom.className != "pagelist-button pre disabled") {
    			var inner = parseInt(that.current) - 2;
    			that.events.triggerEvent("pagechanged", {
    				page: inner,
    			});	    			
    		}
    	});
    	nextDom.addEventListener("click", function() {
    		if(nextDom.className != "pagelist-button next disabled") {
    			var inner = parseInt(that.current);
    			that.events.triggerEvent("pagechanged", {
    				page: inner,
    			});	    			
    		}
    	});    	
    },
    
    /**
     * Private Method: buildLess 
     */
    buildLess: function() {
    	var len = this.len,
    		fragment = document.createDocumentFragment();
    	for(var i = 0; i < len; i++) {
    		var dom = document.createElement("div");
    		if(i + 1 == this.current) {
    			dom.className = "pagelist-button num current";
    		} else {
    			dom.className = "pagelist-button num";
    		}
    		dom.innerHTML = String(i + 1);
    		this.pagelist.push(dom);
    		fragment.appendChild(dom);
    	}
    	return fragment;
    },
    
    /**
     * Private Method: buildMore 
     */
    buildMore: function() {
    	var len = 8,
    		fragment = document.createDocumentFragment();
    	var firdom = document.createElement("div");
    	firdom.innerHTML = 1;
    	if(this.current == 1) {
    		firdom.className = "pagelist-button num current";
    	} else {
    		firdom.className = "pagelist-button num";
    	}
    	this.pagelist.push(firdom);
    	fragment.appendChild(firdom);
    	if(this.current < 7) {
    		for(var i = 0; i < len; i++) {
    			var dom = document.createElement("div");
    			if(i + 2 == this.current) {
    				dom.className = "pagelist-button num current";
    			} else {
    				dom.className = "pagelist-button num";
    			}
    			if(i == len - 1) {
    				dom.innerHTML = "...";
    				dom.className = "pagelist-button none";
    			} else {
    				dom.innerHTML = String(i + 2);
    			}
    			this.pagelist.push(dom);
    			fragment.appendChild(dom);
    		}
    	} else if(this.current >= 7 && this.current < this.len - 8) {
    		var adom = document.createElement("div");
			adom.innerHTML = "...";
			adom.className = "pagelist-button none";
    		var bdom = document.createElement("div");
			bdom.innerHTML = this.current - 2;
			bdom.className = "pagelist-button num"; 
			var cdom = document.createElement("div");
			cdom.innerHTML = this.current - 1;
			cdom.className = "pagelist-button num"; 
			var ddom = document.createElement("div");
			ddom.innerHTML = this.current;
			ddom.className = "pagelist-button num current";
			var edom = document.createElement("div");
			edom.innerHTML = this.current + 1;
			edom.className = "pagelist-button num";		
			var fdom = document.createElement("div");
			fdom.innerHTML = this.current + 2;
			fdom.className = "pagelist-button num";	
    		var gdom = document.createElement("div");
			gdom.innerHTML = this.current + 3;
			gdom.className = "pagelist-button num";	
    		var hdom = document.createElement("div");
			hdom.innerHTML = "...";
			hdom.className = "pagelist-button none";									
			fragment.appendChild(adom);
			fragment.appendChild(bdom);
			fragment.appendChild(cdom);
			fragment.appendChild(ddom);
			fragment.appendChild(edom);
			fragment.appendChild(fdom);
			fragment.appendChild(gdom);
			fragment.appendChild(hdom);
			this.pagelist.push(bdom);
			this.pagelist.push(cdom);
			this.pagelist.push(edom);
			this.pagelist.push(fdom);
			this.pagelist.push(gdom);
    	} else {
    		var adom = document.createElement("div");
			adom.innerHTML = "...";
			adom.className = "pagelist-button none"; 
			fragment.appendChild(adom);
    		for(var i = len - 1; i--; ) {
    			var dom = document.createElement("div");
    			dom.innerHTML = this.len - i - 1;
    			if(this.len - i - 1 == this.current) {
    				dom.className = "pagelist-button num current";
    			} else {
    				dom.className = "pagelist-button num";
    			}  
    			this.pagelist.push(dom);
    			fragment.appendChild(dom);    			  			
    		}
    	}
    	
    	var lastdom = document.createElement("div");
    	lastdom.innerHTML = this.len;
    	if(this.current == this.len) {
    		lastdom.className = "pagelist-button num current";
    	} else {
    		lastdom.className = "pagelist-button num";
    	}
    	this.pagelist.push(lastdom);
    	fragment.appendChild(lastdom);
    	return fragment;
    	
    },
    
    /**
     * API Method: addEvent 
     */
    addEvent: function() {
    	var len = this.pagelist.length,
    		i = len,
    		that = this;
    	for(; i--; ) {
    		var _className = this.pagelist[i].className;
    		if(_className == "pagelist-button num current" || _className == "pagelist-button none") {
    			continue;
    		}
    		var inner = parseInt(this.pagelist[i].innerHTML) - 1;
    		(function(_inner) {
    			var self = that,
    				__inner = _inner;
	    		that.pagelist[i].addEventListener("click", function() {
	    			self.events.triggerEvent("pagechanged", {
	    				page: __inner,
	    			});	
	    		});    			
    		})(inner);

    	}
    },

   /**
    * APIMethod: addOptions
    * 
    * Parameters:
    * newOptions - {Object}
    */
    addOptions: function (newOptions) {
        if (this.options == null) {
            this.options = {};
        }
        // update our copy for clone
        AEF.Util.extend(this.options, newOptions);
        // add new options to this
        AEF.Util.extend(this, newOptions);
    },  

    CLASS_NAME: "AEF.PageList"
});
