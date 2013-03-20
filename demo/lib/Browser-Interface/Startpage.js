/**
 * @author xingyan
 */
var global = this,
	/**
	 * Method: DATA_FROMENEWS_COMPLETED
	 * 新闻数据回来时的回调函数
	 */
	DATA_FROMENEWS_COMPLETED = AEF.Function.Void,
	
	/**
	 * Method: DATA_FAVORITEFROMBROWSER_COMPLETED
	 * 八宫格数据推送的默认callback
	 */
	DATA_FAVORITEFROMBROWSER_COMPLETED = AEF.Function.Void;

var Startpage = (function(window) {		
	
	/**
	 * Method: 向浏览器发送一条命令，换取一条回调。
	 * Parameters:
	 * name {String} 命令名.
	 * params {Object} 出卖的参数，逼着我离开，最后知道真相的我眼泪掉下来
	 * callbackName {String} 事先约定好的回调函数名
	 * callback {Function} 这次的回调
	 */
	function chromeSend(name, params, callbackName, callback) {
		var old = global[callbackName];
		global[callbackName] = function() {
			global[callbackName] = old;
			var args = Array.prototype.slice.call(arguments);
			return callback.apply(global, args);
		};
  		chrome.send(name, params);
	}
	
	/**
	 * Method: getDataFromNews
	 * 向新闻要数据
	 * Parameters: 
	 * callback	-	{Function}	拉新闻接口的回调
	 */
	function getDataFromNews(callback) {
		chromeSend("StartPage-DataFromBaiduNews", [], "DATA_FROMENEWS_COMPLETED", callback)
	}
	
	/**
	 * Method: getFavoriteData
	 * 从浏览器拉八宫格数据
	 * Parameters:
	 * callback	-	{Function}	拉取浏览器八宫格数据回调
	 */
	function getFavoriteData(callback) {
		chromeSend("StartPage-FavoriteDataFromBaiduBrowser", [], "DATA_FAVORITEFROMBROWSER_COMPLETED", callback)
	}
	
	/**
	 * Method: onFavoriteDataPush
	 * 监听八宫格推送
	 * Parameters:
	 * callback
	 */
	function onFavoriteDataPush(callback) {
		global["DATA_FAVORITEFROMBROWSER_COMPLETED"] = function() {
			var args = Array.prototype.slice.call(arguments);
			return callback.apply(global, args);			
		};
	}
	
	/**
	 * Method: getDataFromServer
	 * 拉取一大堆预制信息
	 * Parameters:
	 * callback
	 */
	function getDataFromServer(callback) {
		callback(STARTPAGE_STORE_DATA);
	}	
	
	/**
	 * Method: openPage
	 * 打开指定页面
	 * Parameters:
	 * url	-	{String}
	 */
	function openPage(url) {
		chrome.send("openPage", [url]);
	}
	
	/**
	 * Method: openBookmarks
	 * 打开书签页
	 */
	function openBookmarks() {
		chrome.send("showBookmarkManager");
	}
	
	/**
	 * Method: report
	 * 统计日志上报
	 * Parameters:
	 * action	-	{String}
	 */
	function report(action) {
		chrome.send("metricsHandler:recordAction", [action]);		
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
	
	return {
		getDataFromNews: getDataFromNews,
		getFavoriteData: getFavoriteData,
		onFavoriteDataPush: onFavoriteDataPush,
		getDataFromServer: getDataFromServer,
		openPage: openPage,
		getFaviconURL: getFaviconURL,
		openBookmarks: openBookmarks,
		report: report
	}
	
})(window);
