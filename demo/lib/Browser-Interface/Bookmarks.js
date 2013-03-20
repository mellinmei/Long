/**
 * @author xingyan
 */
var Bookmarks = (function(window) {		
	var bookmarks = chrome.bookmarks;
	
	/**
	 * Method: add
	 * 创建一条收藏
	 * 
	 * Parameters: 
	 * bookmark	-	{Object}
	 * callback	-	{Function}
	 */
	function add(bookmark, callback) {
		bookmarks.create(bookmark, callback);
	}
	
	/**
	 * Method: get
	 * 获取收藏
	 * 
	 * Parameters:
	 * idOrIdList(收藏条目的id)	-	{String or array of String}
	 * callback	-	{Function}
	 */
	function get(idOrIdList, callback) {
		bookmarks.get(idOrIdList, callback);
	}
	
	/**
	 * Method: getChildren
	 * 获取指定id收藏的子节点
	 * 
	 * Parameters:
	 * id	-	{String}
	 * callback	-	{Function}
	 */
	function getChildren(id, callback) {
		bookmarks.getChildren(id, callback);
	}
	
	/**
	 * Method: getRecent
	 * 获得最近添加的收藏
	 * 
	 * Parameters:
	 * numberOfItems	-	{Number}
	 * callback	-	{Function}
	 */
	function getRecent(numberOfItems, callback) {
		bookmarks.getRecent(numberOfItems, callback);
	}
	
	/**
	 * Method: getSubTree
	 * 获得指定节点的子树
	 * 
	 * parameters:
	 * id	-	{String}
	 * callback	-	{Function}
	 */
	function getSubTree(id, callback) {
		bookmarks.getSubTree(id, callback);
	}
	
	/**
	 * Method: getTree
	 * 获得整棵收藏树
	 * 
	 * Parameters:
	 * callback	-	{Function}
	 */
	function getTree(callback) {
		bookmarks.getTree(callback);
	}
	
	/**
	 * Method: move
	 * 移动收藏
	 * Parameters:
	 * id ( string )
	 * destination ( object )
     * 		parentId ( string )
	 * 		index ( optional integer )
	 * callback ( optional function )
	 */
	function move(id, destination, callback) {
		bookmarks.move(id, destination, callback);
	}
	
	/**
	 * Method: remove
	 * 删除指定收藏
	 * Parameters:
	 * id 	-	{String}
	 * callback	-	{Function}
	 */
	function remove(id, callback) {
		bookmarks.remove(id, callback);
	}
	
	/**
	 * Method: removeTree
	 * 删除指定树
	 * Parameters:
	 * id	-	{String}
	 * callback	-	{Function}
	 */
	function removeTree(id, callback) {
		bookmarks.removeTree(id, callback);
	}
	
	/**
	 * Method: search
	 * 查找
	 * Parameters:
	 * query	-	{String}
	 * callback	-	{Function} 
	 */
	function search(query, callback) {
		bookmarks.search(query, callback);
	}
	
	/**
	 * Method: update
	 * 修改收藏
	 * Parameters:
	 * id	-	{string}
	 * changes	-	{object}
	 * 		title ( optional string )
	 * 		url ( optional string )
	 * callback	-	{Function}
	 * 
	 */
	function update(id, changes, callback) {
		bookmarks.update(id, changes, callback);
	}
	
	/**
	 * Event: onChanged
	 * 收藏被修改时触发
	 * 
	 * Parameters:
	 * callback	-	{Function}
	 * 
	 * return
	 * id	-	{String}
	 * changedinfo	-	{Object}
	 * 		title (String)
	 * 		url (String)
	 */
	function onChanged(callback) {
		bookmarks.onChanged.addListener(callback);
	}
	
	/**
	 * Event: onCreated
	 * 添加收藏时触发
	 * 
	 * Parameters: 
	 * callback	-	{Function}
	 * 
	 * return
	 * id	-	{String}
	 * obj	-	{Object}
	 */
	function onCreated(callback) {
		bookmarks.onCreated.addListener(callback);
	}
	
	/**
	 * Events: onRemoved
	 * 删除时触发
	 * 
	 * Parameters:
	 * callback	-	{Function}
	 * 
	 * return
	 * id ( string )
	 * removeInfo ( object )
	 *		parentId ( string )
	 *		index ( integer )
	 */
	function onRemoved(callback) {
		bookmarks.onRemoved.addListener(callback);
	}
	
	/**
	 * Events: onMoved
	 * 移动时触发
	 * 
	 * Parameters:
	 * callback	-	{Function}
	 * 
	 * return
	 * id ( string )
	 * moveInfo ( object )
	 *		parentId ( string )
	 *		index ( integer )
	 *		oldParentId ( string )
	 *		oldIndex ( integer )
	 */
	function onMoved(callback) {
		bookmarks.onMoved.addListener(callback);
	}
	
	/**
	 * Method: on
	 * 增加事件监听
	 * 
	 * Prameters:
	 * type	-	{String}
	 * callback	-	{Function}
	 */
	function on(type, callback) {
		switch(type) {
			case "changed":
				onChanged(callback);
				break;
			case "created":
				onCreated(callback);
				break;
			case "removed":
				onRemoved(callback);
				break;
			case "moved":
				onMoved(callback);
			default:
				break;
		}
	}
	
	/**
	 * Creates a new URL for a favicon request.
	 * @param {string} url The url for the favicon.
	 * @param {number=} opt_size Optional preferred size of the favicon.
	 * @return {string} Updated URL for the favicon.
	 */
	function getFaviconURL(url, opt_size) {
	  var size = opt_size || 16;
	  return 'bee://favicon/size/' + size + '@' +
	      window.devicePixelRatio + 'x/' + url;
	}	
	
	function openBack(url) {
		bookmarks.backOpenUrl(url);
	}
	
	function addToScreen(id) {
		bookmarks.fixedStartScreen(id);
	}
	
	function returnToScreen() {
		bookmarks.backNavigator();
	//	chrome.tabs.getCurrent(function(tab){chrome.tabs.remove(tab.id);});
	}
	
	function openPage(url) {
		bookmarks.backOpenUrl(url);
		bookmarks.backNavigator();
	//	chrome.send("openPage", [url]);
	}
	
	function isExistScreen(id, callback) {
		bookmarks.get(id, callback)
	//	bookmarks.isExistScreen(id, callback);
	}
	
	function report(action) {
		bookmarks.recordAction(action)	
	}
	
	return {
		add: add,
		get: get,
		getChildren: getChildren,
		getRecent: getRecent,
		getSubTree: getSubTree,
		getTree: getTree,
		move: move,
		remove: remove,
		removeTree: removeTree,
		search: search,
		update: update,
		on: on,
		getFaviconURL: getFaviconURL,
		openBack: openBack,
		addToScreen: addToScreen,
		returnToScreen: returnToScreen,
		openPage: openPage,
		isExistScreen: isExistScreen,
		report: report
	}
	
})(window);
