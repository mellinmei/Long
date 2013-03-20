/**
 * @author xingyan
 */
var InterFaceMainPage = (function(window) {		
	
	var nav_data = {
		list: [
			{id: 1, title: "首页", mid: "browser_fe_1"},
			{id: 2, title: "文档", mid: "browser_fe_default", children: [{id: 21, title: "翻译文档", mid: "browser_fe_default"}, {id: 22, title: "原创文档", mid: "browser_fe_default"}]},
			{id: 3, title: "工具", current: "true", mid: "browser_fe_default", children: [{id: 31, mid: "browser_fe_default", title: "脚本打包工具"}, {id: 32, mid: "browser_fe_default", title: "吃砖工具"}, {id: 33, title: "生成洪波demo工具", link: "http://www.baidu.com/"}]},
			{id: 4, title: "分享", link: "http://fe.baidu.com/"}	
		]
	};
	
	var testData = {
		"-1": {
			id: "-1",
			mid: "browser_fe_default",
			content: [
				{id: "-11", title: "前端程序员的自我修养"}
			]		
		},
		"1": {
			id: "1",
			mid: "browser_fe_1",
			content: [
				{id: "11",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=3476850634,608248040&fm=24&gp=0.jpg"},
				{id: "12",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=1014942913,3754850701&fm=24&gp=0.jpg"},
				{id: "13",title:"百度浏览器真不好", src:"http://t1.baidu.com/it/u=1788881946,2574796190&fm=24&gp=0.jpg"},
				{id: "14",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=3556084940,2670266765&fm=24&gp=0.jpg"},
				{id: "15",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=1217856857,1733177624&fm=24&gp=0.jpg"},
				{id: "16",title:"百度浏览器真不好", src:"http://t1.baidu.com/it/u=16746201,611640503&fm=24&gp=0.jpg"},
				{id: "17",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=176796163,4087251165&fm=24&gp=0.jpg"},
				{id: "18",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=1014942913,3754850701&fm=24&gp=0.jpg"},
				{id: "19",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=1415295280,3784328448&fm=24&gp=0.jpg"},
				{id: "11",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=1124115808,1237675881&fm=24&gp=0.jpg"},
				{id: "12",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=1778685086,3370887636&fm=24&gp=0.jpg"},
				{id: "13",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=1074312428,42433494&fm=24&gp=0.jpg"},
				{id: "14",title:"百度浏览器真不好", src:"http://t1.baidu.com/it/u=4207660041,2128002786&fm=24&gp=0.jpg"},
				{id: "15",title:"百度浏览器真不好", src:"http://t2.baidu.com/it/u=2275252741,1424052823&fm=24&gp=0.jpg"},
				{id: "16",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=1752009062,1053218894&fm=24&gp=0.jpg"},
				{id: "17",title:"百度浏览器真不好", src:"http://t1.baidu.com/it/u=181925565,1953342911&fm=24&gp=0.jpg"},
				{id: "18",title:"百度浏览器真不好", src:"http://t1.baidu.com/it/u=2967529596,2123868554&fm=24&gp=0.jpg"},
				{id: "19",title:"百度浏览器真不好", src:"http://t3.baidu.com/it/u=1521448151,3315309940&fm=24&gp=0.jpg"}
			]
		},
	}
	
	/**
	 * Method: getNavData
	 * 获取导航菜单数据
	 * 
	 * Parameters:
	 * callback	-	{Function}
	 */
	function getNavData(callback) {
		callback(nav_data);
	}
	
	/**
	 * Method: getDataById
	 * 根据id拉其数据
	 * 
	 * Parameters:
	 * id	-	{String}
	 * callback	-	{Function}
	 */
	function getDataById(id, callback) {
		if(!testData[id]) {
			id = "-1";
		}
		callback(testData[id]);
	}
	
	return {
		getNavData: getNavData,
		getDataById: getDataById
	}
})(window);
