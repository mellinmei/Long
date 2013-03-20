(function(){

	var requestCallbackMap = {}; //回调函数映射表
	var dispatchMethodName = null; //内部统一分发函数映射名
	/**
	 * 字符串处理时需要转义的字符表
	 * @private
	 */
	var escapeMap = {
		"\b": '\\b',
		"\t": '\\t',
		"\n": '\\n',
		"\f": '\\f',
		"\r": '\\r',
		'"': '\\"',
		"\\": '\\\\'
	};
	
    /**
     * 空函数
     */
    function emptyFunction(){
    }
	
	/**
	 * 字符串序列化
	 * @private
	 */
	function encodeString(source){
		if (/["\\\x00-\x1f]/.test(source)) {
			source = source.replace(/["\\\x00-\x1f]/g, function(match){
				var c = escapeMap[match];
				if (c) { return c; }
				c = match.charCodeAt();
				return "\\u00" +
				Math.floor(c / 16).toString(16) +
				(c % 16).toString(16);
			});
		}
		return ['"', source, '"'].join("");
	}
	
	/**
	 * 数组序列化
	 * @private
	 */
	function encodeArray(source, encodeConfig){
		var result = ["["], l = source.length, preComma, i, item;
		
		for (i = 0; i < l; i++) {
			item = source[i];
			
			switch (typeof item) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (preComma) {
						result.push(',');
					}
					result.push(jsonEncode(item, encodeConfig));
					preComma = 1;
			}
		}
		result.push("]");
		return result.join("");
	}
	
	/**
	 * 日期序列化
	 * @private
	 */
	function encodeDate(source){
		return ['"', +source, '"'].join("");
	}
	/**
	 * json编码，客户端需要全部处理成字符串
	 * @param {Object} value
	 */
	function jsonEncode(value, encodeConfig){
		encodeBool = true;
		switch (typeof value) {
			case 'undefined':
				return '""';
			case 'number':
				return ['"', value, '"'].join("");
			case 'string':
				return encodeString(value);
			case 'boolean':
				return encodeConfig.encodeBool ? ['"', value, '"'].join("") : value;
			default:
				if (value === null) { return '""'; }
				else if (value instanceof Array) { return encodeArray(value, encodeConfig); }
				else if (value instanceof Date) { return encodeDate(value); }
				else {
					var result = ['{'], preComma, item;
					
					for (key in value) {
						if (value.hasOwnProperty(key)) {
							item = value[key];
							switch (typeof item) {
								case 'undefined':
								case 'unknown':
								case 'function':
									break;
								default:
									if (preComma) {
										result.push(',');
									}
									preComma = 1;
									result.push(jsonEncode(key) + ':' + jsonEncode(item, encodeConfig));
							}
						}
					}
					result.push('}');
					return result.join('');
				}
		}
	}
	/**
	 * 根据字符串自动生成命名空间
	 * @param {String} namespace 用"."分割
	 */
	function ns(namespace, owner){
		var names = namespace.split(".");
		owner = owner || window;
		
		for (var i = 0, len = names.length; i < len; i++) {
			var packageName = names[i];
			owner[packageName] = (owner[packageName] || {});
			owner = owner[packageName];
		}
		
		return owner;
	}
	
	function bindFunc(cmd, func){
	
		var parts = cmd.split(".");
		var last = parts.pop(), nsStr = parts.join(".");
		var namespace = ns(nsStr);
		
		namespace[last] = (function(_cmd){
		
			return function(){
				var args = [_cmd];
				for (var i = 0, l = arguments.length; i < l; i++) {
					args.push(arguments[i]);
				}
				func.apply(this, args);
				
			}
		})(cmd);
	}
	
	/**
	 * 从浏览器内部获取版本
	 */
	function getVersion(){
		return window.external.GetVersion("bd");
	}
	
	/**
	 * 向浏览器内部发送请求
	 * @param {Object} nReqID
	 * @param {Object} strCmd
	 * @param {Object} strCallBack
	 * @param {Object} strArgs
	 * @param {Object} strLog
	 */
	function startRequest(nReqID, strCmd, strCallBack, strArgs, strLog){
		var pdispWnd = window;
		if (window.external.StartRequest) {
			return window.external.StartRequest(nReqID, strCmd, strCallBack, strArgs, pdispWnd, strLog);
		}
	}
	
	/**
	 * 从浏览器内部获得唯一编号数字
	 */
	function getNextReqID(){
		var nID;
		if (window.external.GetNextReqID) {
			nID = window.external.GetNextReqID("getid");
		};
		return nID;
	}
	
	/**
	 * 初始化window下dispatch方法的名称，且将该方法挂载到window上
	 */
	function initDispatcher(){
	
		if (!dispatchMethodName) {
			dispatchMethodName = "__browser_dispatcher_" + new Date().getTime().toString(36);
			window[dispatchMethodName] = dispatch;
		}
		
	}
	
	/**
	 * 接受浏览器内部响应统一分发方法
	 * @param {Number} nReqID
	 * @param {String} strResult
	 */
	function dispatch(nReqID, strResult){
	
		var handler = requestCallbackMap[nReqID];
		
		if (handler && typeof(handler) == "function") {
			try {
				var data = eval("(" + strResult + ")");
				
				if (data.result == "ok") {
					handler(data.content);
				}
				else {
					handler({
						result: "error",
						errorMessage: strResult
					});
				}
			} 
			catch (ex) {
				//alert(ex.message);
			}
			finally {
			}
		}
	}
	
	/**
	 * 向浏览器内部发送请求统一入口
	 * @param {String} strCmd
	 * @param {Function} callback
	 * @param {Arrays|Object} args
	 * @param {String} strLog
	 */
	function doRequest(strCmd, callback, args, strLog, encodeConfig){
		if(!encodeConfig) encodeConfig = {};
		
		encodeConfig.encodeBool = encodeConfig.encodeBool  === undefined ? true: encodeConfig.encodeBool;
	
		args = args || {};
		strLog = strLog || "";
		
		var nReqID = getNextReqID();
		requestCallbackMap[nReqID] = callback;
		
		startRequest(nReqID, strCmd, dispatchMethodName, jsonEncode(args, encodeConfig), strLog);
		
	}
	
	
	/**
	 * 构建上层API接口
	 */
	function buildAPIInterface(){
		for (var key in cmdPool) {
			bindFunc(key, cmdPool[key]);
		}
	}
	
	
	/**
	 * API接口池
	 */
	var cmdPool = {
		"bdbrowser.extension.onNotify.addListener": function(_cmd, callback){
			doRequest(_cmd, function(content){
				callback(content);
			}, {});
		},		
		"bdbrowser.extension.cmdToLibEx":function(_cmd, details, callback){
			callback = callback || emptyFunction;
			doRequest(_cmd, function(content){
				callback(content);
			}, details);
		},
		"bdbrowser.extension.onSpecialNotify.addListener": function(_cmd, details, callback){
			doRequest(_cmd, function(content){
				callback(content);
			}, details);
		},
		"bdbrowser.global.report": function(_cmd, details, callback){
			callback = callback || emptyFunction;
			doRequest(_cmd, function(content){
				callback(content);
			}, details);
		},
		"bdbrowser.extension.notify":function(_cmd, details, callback){
			callback = callback || emptyFunction;
			doRequest(_cmd, function(){
				callback();
			}, details);
		},
		"bdbrowser.pageextension.getframetabid": function(_cmd, items, callback){
			callback = callback || emptyFunction;
			doRequest(_cmd, function(content){
				callback(content);
			}, items || {});
		}									
	};
	
	initDispatcher();
	buildAPIInterface();
})();