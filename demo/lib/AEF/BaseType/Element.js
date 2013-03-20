/**
 * @requires AEF/Util.js
 * @requires AEF/BaseTypes.js
 */

/**
 * Namespace: AEF.Element
 */
AEF.Element = {

    /**
     * APIFunction: visible
     * 
     * Parameters: 
     * element - {DOMElement}
     * 
     * Returns:
     * {Boolean} Is the element visible?
     */
    visible: function(element) {
        return AEF.Util.getElement(element).style.display != 'none';
    },

    /**
     * APIFunction: toggle
     * Toggle the visibility of element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    toggle: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = AEF.Util.getElement(arguments[i]);
            var display = AEF.Element.visible(element) ? 'none' 
                                                              : '';
            element.style.display = display;
        }
    },

    /**
     * APIFunction: remove
     * Remove the specified element from the DOM.
     * 
     * Parameters:
     * element - {DOMElement}
     */
    remove: function(element) {
        element = AEF.Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    /**
     * APIFunction: getHeight
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Returns:
     * {Integer} The offset height of the element passed in
     */
    getHeight: function(element) {
        element = AEF.Util.getElement(element);
        return element.offsetHeight;
    },

    /**
     * Function: hasClass
     * Tests if an element has the given CSS class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to search for.
     *
     * Returns:
     * {Boolean} The element has the given class name.
     */
    hasClass: function(element, name) {
        var names = element.className;
        return (!!names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    
    /**
     * Function: addClass
     * Add a CSS class name to an element.  Safe where element already has
     *     the class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to add.
     *
     * Returns:
     * {DOMElement} The element.
     */
    addClass: function(element, name) {
        if(!AEF.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },

    /**
     * Function: removeClass
     * Remove a CSS class name from an element.  Safe where element does not
     *     have the class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to remove.
     *
     * Returns:
     * {DOMElement} The element.
     */
    removeClass: function(element, name) {
        var names = element.className;
        if(names) {
            element.className = AEF.String.trim(
                names.replace(
                    new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "
                )
            );
        }
        return element;
    },

    /**
     * Function: toggleClass
     * Remove a CSS class name from an element if it exists.  Add the class name
     *     if it doesn't exist.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to toggle.
     *
     * Returns:
     * {DOMElement} The element.
     */
    toggleClass: function(element, name) {
        if(AEF.Element.hasClass(element, name)) {
            AEF.Element.removeClass(element, name);
        } else {
            AEF.Element.addClass(element, name);
        }
        return element;
    },

    /**
     * APIFunction: getStyle
     * 
     * Parameters:
     * element - {DOMElement}
     * style - {?}
     * 
     * Returns:
     * {?}
     */
    getStyle: function(element, style) {
        element = AEF.Util.getElement(element);

        var value = null;
        if (element && element.style) {
            value = element.style[AEF.String.camelize(style)];
            if (!value) {
                if (document.defaultView && 
                    document.defaultView.getComputedStyle) {
                    
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[AEF.String.camelize(style)];
                }
            }
        
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera &&
                (AEF.Util.indexOf(positions,style) != -1) &&
                (AEF.Element.getStyle(element, 'position') == 'static')) { 
                value = 'auto';
            }
        }
    
        return value == 'auto' ? null : value;
    },
    
	contains: function (container, contained) {
    	container = AEF.Util.getElement(container);
    	contained = AEF.Util.getElement(contained);
	
    	//fixme: 无法处理文本节点的情况(IE)
    	return container.contains
        	? container != contained && container.contains(contained)
        	: !!(container.compareDocumentPosition(contained) & 16);
	}
};
