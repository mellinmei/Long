/**
 * @requires AEF/BaseTypes/Class.js
 */

/**
 * Class: AEF.File
 * author: XingYan
 */
AEF.File = AEF.Class({
    
    /**
     * APIProperty: rootDir
     * {String}	default	-	"bdbrowser"
     */
    rootDir: "bdbrowser",
    
    /**
     * APIProperty: selfQuota
     * {Number}	default	-	1024 * 1024 * 10 
     */
    selfQuota: 1024 * 1024 * 10,
    
    /**
     * APIProperty: grantedBytes 
     * {Number}
     */
    grantedBytes: 0,
    
    /**
     * APIProperty: storeType
     * {Object}	default	-	window.PERSISTENT 
     */
    storeType: window.PERSISTENT,

    /**
     * Private Property: rfs
     * {Object} 
     */
    rfs: window.requestFileSystem || window.webkitRequestFileSystem,
    
    /**
     * Private Property: sif
     * {Object}
     */
    sif: window.storageInfo || window.webkitStorageInfo,
    
    /**
     * Private Property: fileSystem
     * {<FileSystem Object>}	-	that obj include tow properties root && name 
     * root	-	A read-only DirectoryEntry representing the root of the filesystem
     * name	-	A unique name for the filesystem, assigned by the browser
     */
    fileSystem: null,
    
    /**
     * Private Property: dirEntry
     * {<DirectoryEntry Object>}	-	that obj include properties
     * 
     * Property:
     * isFile: {Boolean} True if the entry is a file.
     * isDirectory: {Boolean} True if the entry is a directory.
     * name: {DOMString} The name of the directory, excluding the path leading to it.
     * fullPath: {DOMString} The full absolute path from the root to the directory.
     * filesystem: {FileSystem} The filesystem on which the directory resides. 
     * 
     * Methods:
     * getMetadata (successCallback, opt_errorCallback): Looks up metadata about this directory.
     * moveTo (parentDirEntry, opt_newName, opt_successCallback, opt_errorCallback): Moves the 
     * 			directory to a different location on the filesystem.
     * copyTo (parentDirEntry, opt_newName, opt_successCallback, opt_errorCallback): Copies the 
     * 			directory to a different parent on the filesystem. Directory copies are always recursive. 
     * 			It is an error to copy a directory inside itself or to copy it into its parent if a new name 
     * 			is not provided.
     * toURL (): Returns a filesystem: URL that can be used to identify this directory.
     * remove (successCallback, opt_errorCallback): Deletes a file or directory. It is an error to attempt to 
     * 			delete the root directory of a filesystem or a directory that is not empty.
     * getParent (successCallback, opt_errorCallback): Returns the parent DirectoryEntry containing this 
     * 			directory. If this directory is the root directory, its parent is itself.
     * createReader (): Creates a new DirectoryReader to read entries relative to this DirectoryEntry.
     * getFile (path, optionsObj, opt_successCallback, opt_errorCallback): Creates or looks up a FileEntry. The 
     * 			first argument is a path representing and absolute or relative path from this directory. The 
     * 			second argument is an object literal describing the behavior of this method if the file does not 
     * 			exist. If create: true and exclusive: true, and error is thrown if the file already exists at path. 
     * 			If create: true and exclusive: false, the file will be created. If it already exists, no error will 
     * 			be thrown. Lastly, if create: false the file is returned if it exists, and an error is thrown if 
     * 			it does not. When fetching a file, the exclusive flag is ignored. If success, a FileEntry in returned 
     * 			in the callback.
     * getDirectory (path, optionsObj, opt_successCallback, opt_errorCallback): Creates or looks up a DirectoryEntry. 
     * 			The semantics of this method are the same as getFile(), with the difference being a DirectoryEntry 
     * 			is passed to the success callback.
     * removeRecursively (successCallback, opt_errorCallback): Recursively deletes this directory and all of its 
     * 			contents. An error is thrown if you try to remove the root directory of a filesystem. If an error 
     * 			occurs while this method is in progress, some of the directory’s contents might not be deleted.
     * 
     */
    dirEntry: null,
    
    /**
     * APIMethod: events
     * {<AEF.Events>} 
     */
    events: null,
    
    /**
     * APIMethod: eventListeners
     * {Object} 
     */
    eventListeners: null,
    
    /**
     * Constructor: AEF.File
     * Create a new AEF.File instance
     *
     * Parameters:
     * options	-	{Object}
     * 
     * Returns:
     * An instance of AEF.File
     */
    initialize: function(options) {
    	if(!this.rfs || !this.sif) {
    		this.noSupport();
    		return;
    	}
    	options = AEF.Util.extend({}, options);
    	this.addOptions(options);
    	this.events = new AEF.Events(this);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        } 
        //this.sif.requestQuota(this.storeType, this.selfQuota, this.grantedFS, this.onError);   	
    },
    
    /**
     * Private Method:
     * 
     * Parameters:
     * e	-	{Object}
     *  
     */
    onError: function(e) {
    	var msg = "Error: ";
    	if(AEF.File.CONST_ERROR_CODE[e.code] != undefined) {
        	msg += AEF.File.CONST_ERROR_CODE[e.code];
    	} else {
        	msg += 'Unknown Error';
    	}
    	var code = (e.code > 12) ? 13 : e.code;  
    	this.events.triggerEvent("onerror", {"data": msg, "code": code});
    	throw new Error(msg);
    },
    
    /**
     * Private Method:
     * 
     * Parameters:
     * bytes	-	{Number} 
     */
    grantedFS: function(bytes) {
    	this.grantedBytes = bytes;
    	this.events.triggerEvent("ongrantedbytes", {"data": bytes});
    	this.rfs(this.storeType, bytes, this.initFS, this.onError);
    },
    
    /**
     * Private Method:
     * 
     * Parameters:
     * fs	-	{<FileSystem Object>}
     *  
     */
    initFS: function(fs) {
    	this.fileSystem = fs;
    	fs.root.getDirectory(this.rootDir, {create: true}, this.createDirectory, this.onError);
    },
    
    /**
     * Private Method: createDirectory 
     */
    createDirectory: function(dirEntry) {
    	this.events.triggerEvent("oncreatedirectory");
    	this.dirEntry = dirEntry;
    },
    
    /**
     * APIMethod: on
     * 
     * Parameters:
     * type	-	{String}
     * handler	-	{Function}
     *  
     */
    on: function() {
    	this.events.register(type, this, handler);
    },
    
    /**
     * APIMethod: un
     * 
     * Parameters:
     * type	-	{String}
     * handler	-	{Function}
     *  
     */
    un: function() {
    	this.events.unregister(type, this, handler)
    },
    
    /**
     * Method: noSupport 
     */
    noSupport: function() {
    	var msg = "Error: Your browser do not support Files System!";
    	this.events.triggerEvent("onerror", {"data": msg, "code": -1});
    	throw new Error(msg)
    },

	/**
	 * Private Method: addOptions
	 * 
	 * Parameters:
	 * newOptions - {Object}
	 * 
	 */
	addOptions: function (newOptions) {
	    if (this.options == null) {
	        this.options = {};
	    }
	    AEF.Util.extend(this, newOptions);
	},

    CLASS_NAME: "AEF.File"
});

/**
 * AEF.File.CONST_ERROR_CODE
 * 
 * FileError.NOT_FOUND_ERR	-	1
 * FileError.SECURITY_ERR	-	2
 * FileError.ABORT_ERR	-	3
 * FileError.NOT_READABLE_ERR	-	4
 * FileError.ENCODING_ERR	-	5
 * FileError.NO_MODIFICATION_ALLOWED_ERR	-	6
 * FileError.INVALID_STATE_ERR	-	7
 * FileError.SYNTAX_ERR	-	8
 * FileError.INVALID_MODIFICATION_ERR	-	9
 * FileError.QUOTA_EXCEEDED_ERR	-	10
 * FileError.TYPE_MISMATCH_ERR	-	11
 * FileError.PATH_EXISTS_ERR	-	12
 * 
 */
AEF.File.CONST_ERROR_CODE = {
	1: "File or directory not found",
	2: "Insecure or disallowed operation",
	3: "Operation aborted",
	4: "File or directory not readable",
	5: "Invalid encoding",
	6: "Cannot modify file or directory",
	7: "Invalid state",
	8: "Invalid line-ending specifier",
	9: "Invalid modification",
	10: "Storage quota exceeded",
	11: "Invalid filetype",
	12: "File or directory already exists at specified path"
};