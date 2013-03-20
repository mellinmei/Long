/**
 * @requires AEF/BaseTypes/Class.js
 * @author xingyan
 */

/**
 * Class: AEF.Page
 */
AEF.Page = AEF.Class({
    
    /**
     * Constant: Z_INDEX_BASE
     * {Object} Base z-indexes for different classes of thing 
     */
    Z_INDEX_BASE: {
        BaseLayer: 0,
        Overlay: 325,
        Popup: 750,
        Control: 1000
    },

    /**
     * Property: id
     * {String} Unique identifier for the page
     */
    id: null,
    
    /**
     * APIProperty: events
     * {<AEF.Events>} An events object that handles all 
     *                       events on the page
     */
    events: null,  
    
    /**
     * APIProperty: div
     * {DOMElement|String} 
     *     
     */
    div: null,     
    
    /**
     * Property: dragging
     * {Boolean} The page is currently being dragged.
     */
    dragging: false,     
    
    /**
     * Property: size
     * {<AEF.Size>} Size of the main div (this.div)
     */
    size: null, 
    
    /**
     * Property: viewPortDiv
     * {HTMLDivElement} The element that represents the page viewport
     */
    viewPortDiv: null,     
    
    /**
     * Property: layerContainerDiv
     * {HTMLDivElement} The element that contains the layers.
     */
    layerContainerDiv: null,

    /**
     * APIProperty: layers
     * {Array(<AEF.Layer>)} Ordered list of layers in the page
     */
    layers: null,    
    
    /**
     * Property: popups
     * {Array(<AEF.Popup>)} List of popups associated with the map
     */
    popups: null,   
    
    /**
     * APIProperty: baseLayer
     * {<AEF.Layer>} The currently selected base layer.
     */
    baseLayer: null,   
    
    /**
     * Property: resizeTimer
     * {Function}
     */
    resizeTimer: null,
    
    /**
     * Property: controls
     * {Array(<AEF.Control>)}
     */
    controls: null,
    
    /**
     * APIProperty: options
     * {Object} The options object passed to the class constructor. Read-only.
     */
    options: null,
    
    /**
     * APIProperty: theme
     * {String} Relative path to a CSS file from which to load theme styles.
     *          Specify null in the map options (e.g. {theme: null}) if you 
     *          want to get cascading style declarations - by putting links to 
     *          stylesheets or style declarations directly in your page.
     */
    theme: null,  
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <AEF.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,
    
    /**
     * APIProperty: commandManager
     * {AEF.CommandManager}
     */
    commandManager: null,  
    
    /**
     * Property: commands
     */
    commands: null,            
    
    /**
     * Constructor: AEF.Page
     * Create a new AEF.Page instance
     * Returns:
     * An instance of AEF.Page
     */
    initialize: function(div, options) {
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }

        this.options = AEF.Util.extend({}, options);

        // now override default options 
        AEF.Util.extend(this, options);
		this.commandManager = new AEF.CommandManager({page: this});
		if(this.commands) {
			var i = 0,
				len = this.commands.length;
			for(; i < len; i++) {
				this.commandManager.register(this.commands[i]);
			}
			this.commands.length = 0;
		}
        // initialize layers array
        this.layers = [];

        this.id = AEF.Util.createUniqueID(this.CLASS_NAME + "_");
		var node = AEF.Util.getElement(div);
        if(!node) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        } else {
        	this.div = node.cloneNode(true);
        }


        var id = this.id + "_AEF_ViewPort";
        if(!options.viewCss) {
	        this.viewPortDiv = AEF.Util.createDiv(id, null, null, null,
	                                                     "relative", null,
	                                                     "auto");        	
        } else {
        	this.viewPortDiv = document.createElement("div");
        	this.viewPortDiv.style.cssText = options.viewCss;
        }

        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.style.zIndex = "1";
        this.div.appendChild(this.viewPortDiv);
		
        this.events = new AEF.Events(
            this, this.viewPortDiv, null, true, 
            {includeXY: true}
        );

       // this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (options && options.layers) {
            this.addLayers(options.layers);
        }
        this.updateSizeDestroy = AEF.Function.bind(this.updateSize, this);
        AEF.Event.observe(window, 'resize', this.updateSizeDestroy);
        if(this.controls == null) {
        	this.controls = [];
        }
       	var i = 0,
       		len = this.controls.length;
       	for( ; i < len; i++) {
       		this.addControlToPage(this.controls[i]);
       	}
        this.popups = [];

        this.unloadDestroy = AEF.Function.bind(this.destroy, this);
        

        // always call page.destroy()
        AEF.Event.observe(window, 'unload', this.unloadDestroy);
        
        // add any initial layers
        if(node) {
        	node.parentNode.replaceChild(this.div, node);
        }
        this.events.triggerEvent("pageonload");	
    },
    
    destroy: function() {
    	
    },
    
    /**
     * API Method: excuteCommand 
     */	
    excuteCommand: function(cmdName, option) {
		this.commandManager.excuteCommand(cmdName, option);
    },
    
    /**    
     * API Method: registerCommand
     */
    registerCommand: function(command) {
    	this.commandManager.register(command);
    },
    
    /**
     * API Method: unregisterCommand
     * 
     * Paramers:
     * command	-	{String}
     */
    unregisterCommand: function(command) {
    	this.commandManager.unregister(command);
    },
    
    /**
     * APIMethod: updateSize
     */
    updateSize: function() {
		if(this.resizeTimer) {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = null;
		}
		var that = this;
		this.resizeTimer = window.setTimeout(function() {
			that.events.triggerEvent("pageresize");	
		}, 0);	
    },
    
    /**
    * APIMethod: addLayers 
    *
    * Parameters:
    * layers - {Array(<AEF.Layer>)} 
    */    
    addLayers: function (layers) {
    	var i = 0,
    		len = layers.length;
        for ( ; i < len; i++) {
            this.addLayer(layers[i]);
        }
    },
    
    /**
    * APIMethod: addLayer
    *
    * Parameters:
    * layer - {<AEF.Layer>} 
    *
    * Returns:
    * {Boolean} True if the layer has been added to the page.
    */    
    addLayer: function (layer) {
        for(var i = 0, len = this.layers.length; i < len; i++) {
            if (this.layers[i] == layer) {
                return false;
            }
        }
        layer.div.className = "olLayerDiv";
        this.setLayerZIndex(layer, this.layers.length);  
        if(layer.isBaseLayer) {
        	this.div.appendChild(layer.div);  
        } else {
        	this.viewPortDiv.appendChild(layer.div);
        }
        
        this.layers.push(layer);
        layer.setPage(this);
        this.events.triggerEvent("addlayer", {layer: layer});
        layer.events.triggerEvent("added", {page: this, layer: layer});
        layer.afterAdd();
        return true;    
    },        

    /**
     * APIMethod: getLayer
     * Get a layer based on its id
     *
     * Parameters:
     * id - {String} A layer id
     *
     * Returns:
     * {<AEF.Layer>} The Layer with the corresponding id from the page's 
     *                      layer collection, or null if not found.
     */
    getLayer: function(id) {
        var foundLayer = null,
        	i = 0,
        	len = this.layers.length;
        for ( ; i<len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },

    /**
    * Method: setLayerZIndex
    * 
    * Parameters:
    * layer - {<AEF.Layer>} 
    * zIdx - {int} 
    */    
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(
            this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay']
            + zIdx * 5 );
    },

    /**
     * Method: resetLayersZIndex
     * Reset each layer's z-index based on layer's array index
     */
    resetLayersZIndex: function() {
        var i = 0,
        	len = this.layers.length;
        for ( ; i < len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },
    
    /** 
     * APIMethod: setBaseLayer
     * Allows user to specify one of the currently-loaded layers as the Page's
     *     new base layer.
     * 
     * Parameters:
     * newBaseLayer - {<AEF.Layer>}
     */
    setBaseLayer: function(newBaseLayer) {
        
        if (newBaseLayer != this.baseLayer) {
            // ensure newBaseLayer is already loaded
            if (this.layers.indexOf(newBaseLayer) != -1) {

                // set new baselayer
                this.baseLayer = newBaseLayer;

                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }        
        }
    },    

    /** 
     * APIMethod: removeLayer
     * Parameters:
     * layer - {<AEF.Layer>} 
     * setNewBaseLayer - {Boolean} Default is true
     */
    removeLayer: function(layer, setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }

        if (layer.isBaseLayer) {
            this.div.removeChild(layer.div);
        } else {
            this.viewPortDiv.removeChild(layer.div);
        }
        AEF.Util.removeItem(this.layers, layer);
        layer.removePage(this);
        layer.page = null;

        // if we removed the base layer, need to set a new one
        if(this.baseLayer == layer) {
            this.baseLayer = null;
            if(setNewBaseLayer) {
            	var i = 0,
            		len = this.layers.length;
                for( ; i < len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer || this.allOverlays) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }
        this.resetLayersZIndex();
        this.events.triggerEvent("removelayer", {layer: layer});
        layer.events.triggerEvent("removed", {page: this, layer: layer});
    },
    
    /**
     * API Method: getTopZindex
     */
    getTopZindex: function() {
    	var topIndex = {
    			zindex: 0,
    			index: 0
    		},
    		i = 0,
    		len = this.layers.length;
    	for(; i < len; i++) {
    		if(this.layers[i].div.style.zIndex > topIndex.zindex) {
    			topIndex = {
    				zindex: this.layers[i].div.style.zIndex,
    				index: i
    			};
    		}
    	}
    	return topIndex;   	
    },
    
    /**
     * APIMethod: topLayer
     */
    topLayer: function(layer) {
		var topIndex = this.getTopZindex(),
			index = layer.div.style.zIndex;
		if(topIndex == index)	return;
		layer.div.style.zIndex = topIndex.zindex;
		this.layers[topIndex.index].div.style.zIndex = index;
    },
    
    /**
     * APIMethod: toggleLayer
     */
    toggleLayer: function(oLayer, nLayer) {
    	var index = oLayer.div.style.zIndex,
    		_index = nLayer.div.style.zIndex;
    	if(_index > index) {
    		oLayer.div.style.zIndex = _index;
    		nLayer.div.style.zIndex = index;	
    	}
    },
    
    /**
     * APIMethod: getNumLayers
     * 
     * Returns:
     * {Int} The number of layers attached to the map.
     */
    getNumLayers: function () {
        return this.layers.length;
    },    

    /** 
     * APIMethod: getLayerIndex
     *
     * Parameters:
     * layer - {<AEF.Layer>}
     *
     * Returns:
     * {Integer} 
     */
    getLayerIndex: function (layer) {
        return this.layers.indexOf(layer);
    },

    
    /** 
     * APIMethod: setLayerIndex
     *
     * Parameters:
     * layer - {<AEF.Layer>} 
     * idx - {int} 
     */
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            var i = 0,
            	len = this.layers.length;
            for ( ; i < len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer, property: "order"
            });
            if(idx === 0) {
                this.setBaseLayer(layer);
            } else if(this.baseLayer !== this.layers[0]) {
                this.setBaseLayer(this.layers[0]);
            }
        }
    },  
    
    /** 
     * APIMethod: raiseLayer
     * Paremeters:
     * layer - {<OpenLayers.Layer>} 
     * delta - {int} 
     */
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },   

    /**
     * APIMethod: getBy
     * Returns:
     * {Array}
     */
    getBy: function(array, property, match) {
        var test = (typeof match.test == "function");
        var found = AEF.Array.filter(this[array], function(item) {
            return item[property] == match || (test && match.test(item[property]));
        });
        return found;
    },

    /**
     * APIMethod: getLayersBy
     * Get a list of layers with properties matching the given criteria.
     * Returns:
     * {Array(<AEF.Layer>)} A list of layers matching the given criteria.
     *     An empty array is returned if no matches are found.
     */
    getLayersBy: function(property, match) {
        return this.getBy("layers", property, match);
    },

    /**
     * APIMethod: getLayersByName
     * Returns:
     * {Array(<AEF.Layer>)} 
     */
    getLayersByName: function(match) {
        return this.getLayersBy("name", match);
    },

    /**
     * APIMethod: getLayersByClass
     * Returns:
     * {Array(<AEF.Layer>)}
     */
    getLayersByClass: function(match) {
        return this.getLayersBy("CLASS_NAME", match);
    },    
    
    /**
     * APIMethod: getControlsBy
     * Returns:
     * {Array(<AEF.Control>)} 
     */
    /*
    getControlsBy: function(property, match) {
        return this.getBy("controls", property, match);
    },
	*/
    getControlsBy: function(property, match) {
        var len = this.controls.length;
       	for(var i = len; i--; ) {
       		if(this.controls[i][property] == match) {
       			return this.controls[i];
       		}
       	}
       	return null;
    },
    	
    /**
     * APIMethod: getControlsByClass
     * Returns:
     * {Array(<AEF.Control>)}
     */
    getControlsByClass: function(match) {
        return this.getControlsBy("CLASS_NAME", match);
    },    
    
    /**
     * Method: addControlToMap
     * 
     * Parameters:
     * 
     * control - {<AEF.Control>}
     * px - {<AEF.Pixel>}
     */    
    addControlToPage: function (control, px) {
        control.outsideViewport = (control.div != null);
        
        control.setPage(this);
        var div = control.draw(px);
        if (div) {
            if(!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                                    this.controls.length;
                this.viewPortDiv.appendChild( div );
            }
        }
        if(control.autoActivate) {
            control.activate();
        }
    },  
    
    /**
     * APIMethod: addControl
     * Add the passed over control to the page. Optionally 
     *     position the control at the given pixel.
     * 
     * Parameters:
     * control - {<AEF.Control>}
     * px - {<AEF.Pixel>}
     */    
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToPage(control, px);
    }, 
    
    /**
     * APIMethod: getControl
     * 
     * Parameters:
     * id - {String} ID of the control to return.
     * 
     * Returns:
     * {<AEF.Control>}
     */    
    getControl: function (id) {
        var returnControl = null,
        	i = 0,
        	len = this.controls.length;
        for( ; i < len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    
    /** 
     * APIMethod: removeControl
     * Parameters:
     * control - {<AEF.Control>} The control to remove.
     */    
    removeControl: function (control) {
        //make sure control is non-null and actually part of our map
        if ( (control) && (control == this.getControl(control.id)) ) {
            if (control.div && (control.div.parentNode == this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            AEF.Util.removeItem(this.controls, control);
        }
    },            

    CLASS_NAME: "AEF.Page"
});
