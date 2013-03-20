/**
 * @requires AEF/BaseTypes/Class.js
 * @author xingyan
 */

/**
 * Class: AEF.Layer
 */
AEF.Layer = AEF.Class({
    
    /**
     * APIProperty: id
     * {String}
     */
    id: null,
    
    /** 
     * APIProperty: name
     * {String}
     */
    name: null,    

    /** 
     * APIProperty: div
     * {DOMElement}
     */
    div: null,
    
    /**
     * APIProperty: cssText
     * {String}
     */
    cssText: null,
    
    /**
     * APIProperty: events
     * {<AEF.Events>}
     *
     * Register a listener for a particular event with the following syntax:
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     * 
     */
    events: null,   
    
    /**
     * APIProperty: page
     * {<AEF.page>} This variable is set when the layer is added to 
     *     the page, via the accessor function setPage().
     */
    page: null,    
    
    /**
     * APIProperty: isBaseLayer
     * {Boolean} Whether or not the layer is a base layer. This should be set 
     *     individually by all subclasses. Default is false
     */
    isBaseLayer: false,     
    
    /** 
     * APIProperty: displayInLayerSwitcher
     * {Boolean} Display the layer's name in the layer switcher.  Default is
     *     true.
     */
    displayInLayerSwitcher: true,

    /**
     * APIProperty: visibility
     * {Boolean} The layer should be displayed in the page.  Default is true.
     */
    visibility: true,
    
    /** 
     * Property: options
     * {Object} An optional object whose properties will be set on the layer.
     *     Any of the layer properties can be set as a property of the options
     *     object and sent to the constructor when the layer is created.
     */
    options: null,    
    
    /**
     * Property: metadata
     * {Object} This object can be used to store additional information on a
     *     layer object.
     */
    metadata: null,    
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <AEF.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,    
        
    /**
     * Constructor: AEF.Layer
     *
     * Parameters:
     * name - {String} The layer name
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {
        this.metadata = {};
        var options = AEF.Util.extend({}, options);
        this.addOptions(options);
        this.name = name;
        if (this.id == null) {
            this.id = AEF.Util.createUniqueID(this.CLASS_NAME + "_");
        }		
        this.div = AEF.Util.createDiv(this.id);
        this.div.style.cssText = this.cssText || "";
        this.div.dir = "ltr";
        this.events = new AEF.Events(this, this.div);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }        
    },

   /**
    * Method: clone
    *
    * Parameters:
    * obj - {<AEF.Layer>} The layer to be cloned
    *
    * Returns:
    * {<AEF.Layer>} An exact clone of this <AEF.Layer>
    */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new AEF.Layer(this.name, this.getOptions());
        }
        
        // catch any randomly tagged-on properties
        AEF.Util.applyDefaults(obj, this);
        
        // a cloned layer should never have its page property set
        //  because it has not been added to a page yet. 
        obj.page = null;
        
        return obj;
    },
    
    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     *
     * Parameters:
     * setNewBaseLayer - {Boolean} Set a new base layer when this layer has
     *     been destroyed.  Default is true.
     */
    destroy: function(setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.page != null) {
            this.page.removeLayer(this, setNewBaseLayer);
        }
        this.page = null;
        this.name = null;
        this.div = null;
        this.options = null;

        if (this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },    
    
    /**
     * Method: getOptions
     * Extracts an object from the layer with the properties that were set as
     *     options, but updates them with the values currently set on the
     *     instance.
     * 
     * Returns:
     * {Object} the <options> of the layer, representing the current state.
     */
    getOptions: function() {
        var options = {};
        for(var o in this.options) {
            options[o] = this[o];
        }
        return options;
    },    
    
   /**
    * APIMethod: addOptions
    * 
    * Parameters:
    * newOptions - {Object}
    * reinitialize - {Boolean} If set to true, and if resolution options of the
    *     current baseLayer were changed, the map will be recentered to make
    *     sure that it is displayed with a valid resolution, and a
    *     changebaselayer event will be triggered.
    */
    addOptions: function (newOptions, reinitialize) {
        if (this.options == null) {
            this.options = {};
        }
        // update our copy for clone
        AEF.Util.extend(this.options, newOptions);
        // add new options to this
        AEF.Util.extend(this, newOptions);
    },    
    
    /**
     * Method: setPage
     * Set the page property for the layer. This is done through an accessor
     *     so that subclasses can override this and take special action once 
     *     they have their page variable set. 
     * 
     *     Here we take care to bring over any of the necessary default 
     *     properties from the page. 
     * 
     * Parameters:
     * page - {<AEF.Page>}
     */
    setPage: function(page) {
        if (this.page == null) {
            this.page = page;
        }
    },

    removePage: function(map) {
        //to be overridden by subclasses
    },    
    
    /**
     * Method: getZIndex
     * 
     * Returns: 
     * {Integer} the z-index of this layer
     */    
    getZIndex: function () {
        return this.div.style.zIndex;
    },
    
    /**
     * Method: afterAdd
     * Called at the end of the page.addLayer sequence.  At this point, the page
     *     will have a base layer.  To be overridden by subclasses.
     */
    afterAdd: function() {
    },    

    /**
     * Method: setZIndex
     * 
     * Parameters: 
     * zIndex - {Integer}
     */    
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },        

    CLASS_NAME: "AEF.Layer"
});
