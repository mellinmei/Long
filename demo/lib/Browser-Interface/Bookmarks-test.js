/**
 * @author xingyan
 */
var Bookmarks = (function(window) {		
	
	var data = [{
		children: [{
				id: "1",
				children: [
					{
					    "id": "21",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "20",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "19",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "18",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "17",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "16",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "15",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "14",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "13",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "12",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "11",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "10",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "9",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "8",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "7",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "6",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "5",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "4",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "3",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					},{
					    "id": "2",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					},{
					    "id": "1",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "d5308054aadc468586005a46bb6bdd25",
					    "title": "百度一下，你就知道",
					    "url": "http://www.baidu.com/",
					    "note": "",
					    "parentId": "",
					    "type": "leaf",
					    "accesstime": "1304590424",
					    "icon": "bdbrowser://SysData/FavIconFiles/695460e94ecf5160c66eaf4dd5e1e875.ico",
					    "thumbnail": "bdbrowser://SysData/ThumbnailFiles/d3e5ecefc48bc9274cdf9644663a0394.jpg",
					    "iconid": "2",
					    "children": []
					}, {
					    "id": "0ba7f26661a3e64b873467dcf2e4b222",
					    "title": "新文111件夹",
					    "url": "",
					    "note": "",
					    "parentId": "",
					    "type": "trunk",
					    "accesstime": "1305032027",
					    "icon": "",
					    "thumbnail": "",
					    "iconid": "0",
					    "children": []
					}, {
					    "id": "a14f69c20cd61a4badca9e5e5a1c0b20",
					    "title": "新文件夹",
					    "url": "",
					    "note": "",
					    "parentId": "",
					    "type": "trunk",
					    "accesstime": "1304947746",
					    "icon": "",
					    "thumbnail": "",
					    "iconid": "0",
					    "children": []
					}, {
				    "id": "cb1e439cebf847d883b956ed2ba877ec",
				    "title": "hao123－－我的上网主页",
				    "url": "http://www.hao123.com/",
				    "note": "ddd",
				    "parentId": "",
			        "type": "leaf",
			        "accesstime": "1304947752",
			        "icon": "bdbrowser://SysData/FavIconFiles/bf1f9841a7143fbc7d425d9a78f10217.ico",
			        "thumbnail": "bdbrowser://SysData/ThumbnailFiles/c74bf8e2ee94df67df9bcc968294473c.jpg",
			        "iconid": "1",
			        "children": []
				    }, {
				        "id": "b19f3ef09330e947b7747937075f2eec",
				        "title": "tstest02使用指南",
				        "url": "http://fe.baidu.com/doc/duoyi/note/tstest02.text",
				        "note": "",
				        "parentId": "",
				        "type": "leaf",
				        "accesstime": "1305014863",
				        "icon": "bdbrowser://SysData/FavIconFiles/1049ff9c520cd0cc003b7af13bd6a92b.ico",
				        "thumbnail": "",
				        "iconid": "0",
				        "children": []
				    }, {
				        "id": "2a6e7e75abb26246892e2b6fec74663e",
				        "title": "[转]HTML5设计原理 at 献给2015的萝莉们",
				        "url": "http://remember2015.info/blog/?p=637878",
				        "note": "",
				        "parentId": "",
				        "type": "leaf",
				        "accesstime": "1305099482",
				        "icon": "",
				        "thumbnail": "",
				        "iconid": "0",
				        "children": []
					}, {
					    "id": "fdb3eca2cf5c75499c1973976486da37",
					    "title": "IE收藏20110510",
					    "url": "",
					    "note": "",
					    "parentId": "",
					    "type": "trunk",
					    "accesstime": "1305014807",
					    "icon": "",
					    "thumbnail": "",
					    "iconid": "0",
					    "children": [{
					        "id": "200bc7b43605664d97c634863618e159",
					        "title": "QQLive-影视、综艺、体育、直播，尽在QQLive！",
					        "url": "http://live.qq.com/?ADTAG=BROWSER.FAV",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "leaf",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }, {
					        "id": "169cdc54a930824a9d56598b46b2fc58",
					        "title": "云翻译",
					        "url": "javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('src','http://csdntools.googlecode.com/svn/trunk/translation/index.js');document.body.appendChild(e);})())",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "leaf",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }, {
					        "id": "9a7302df4123cc4287d4a365f5d5ac01",
					        "title": "启用云编码",
					        "url": "javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('src','http://csdntools.googlecode.com/svn/trunk/base64/index.js');document.body.appendChild(e);})())",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "leaf",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }, {
					        "id": "0b6c9ba8e7862a4aafd943a42075e816",
					        "title": "学习",
					        "url": "",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "trunk",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": [{
					            "id": "9d6b9a8ffbfc5546810fe1ce2f04b5e9",
					            "title": "Conduit – Edit and Add Toolbar Apps",
					            "url": "http://accounts.conduit.com/toolbar/apps/?ref=frg",
					            "note": "",
					            "parentId": "0b6c9ba8e7862a4aafd943a42075e816",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "ebd756c987b2e64da1564534fd620cf9",
					            "title": "Dreamer’s Blog » Scalable JavaScript Application Architecture",
					            "url": "http://www.zhuoqun.net/html/y2009/1412.html",
					            "note": "",
					            "parentId": "0b6c9ba8e7862a4aafd943a42075e816",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "15929cb6246af24bb5bc8065b96cf660",
					            "title": "O'Reilly Velocity China 2010, Web 性能和运维大会 - O'Reilly 会议",
					            "url": "http://velocity.oreilly.com.cn/index.php?func=slidesvideos",
					            "note": "",
					            "parentId": "0b6c9ba8e7862a4aafd943a42075e816",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }]
					    }, {
					        "id": "6aa054a23f309140816e33232a4b289c",
					        "title": "常用目录",
					        "url": "",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "trunk",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }, {
					        "id": "a1523d8a5441b646a7857f4ee22e40f0",
					        "title": "王宇航的主页_百度身边",
					        "url": "http://www.baidu.com/member/1e39eef4b837d39fa1eb2815",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "leaf",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }, {
					        "id": "2c7af1f20726a74493629f547222bed0",
					        "title": "链接",
					        "url": "",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "trunk",
					        "accesstime": "1305014807",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": [{
					            "id": "07d324c8ece6c348b12845382b748f4f",
					            "title": "firebug",
					            "url": "javascript:(function(){vard=document,s=d.getElementById('firebug-lite');if(s!=null)return;s=d.createElement('script');s.type='text/javascript';s.src='https://getfirebug.com/firebug-lite.js';d.body.appendChild(s);})();void(0);",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "5bd97feab2520549b7d32a7d65984a0a",
					            "title": "启用异常监视器",
					            "url": "javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('src','http://csdntools.googlecode.com/svn/trunk/debug/index.js');document.body.appendChild(e);})())",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "6ecd35e54c7c924389e27c02f2031820",
					            "title": "建议网站",
					            "url": "https://www.baidu.com/#ieslice",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "88a01ef72109774591baf2a51ebe75b6",
					            "title": "灯火阑珊",
					            "url": "http://st.baidu.com/bbs/index.php",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305032060",
					            "icon": "http://st.baidu.com/favicon.icon",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "38d763364c344b4d9eb0f55af219fe31",
					            "title": "爱百度，上内网",
					            "url": "http://www.baidu.com/core/index.jsp",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "6c6be88f97d1e748aa28f9ee189c79e7",
					            "title": "用户访问质量平台",
					            "url": "http://www.baidu.com/",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }, {
					            "id": "3609fd85453fb2409b274275d030c3ba",
					            "title": "网页快讯库",
					            "url": "http://go.microsoft.com/fwlink/?LinkId=121315",
					            "note": "",
					            "parentId": "2c7af1f20726a74493629f547222bed0",
					            "type": "leaf",
					            "accesstime": "1305014807",
					            "icon": "",
					            "thumbnail": "",
					            "iconid": "0",
					            "children": []
					        }]
					    }, {
					        "id": "13632e17201d954490785143bd27ee3c",
					        "title": "WordPress",
					        "url": "http://wpo.bae.baidu.com/wp-admin/",
					        "note": "",
					        "parentId": "fdb3eca2cf5c75499c1973976486da37",
					        "type": "leaf",
					        "accesstime": "1305099470",
					        "icon": "",
					        "thumbnail": "",
					        "iconid": "0",
					        "children": []
					    }]
			    }]
			}],
    	id: "1"
	}];
	
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
	//	callback([{children: [{id: "1", children: []}]}]);
		callback(data);
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
	//	bookmarks.update(id, changes, callback);
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
		return;
		callback();
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
		return;
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
		return;
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
		return;
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
	  return 'resources/themes/default/images/defaultfav.png';
	}
	
	function openPage(url) {
		window.open(url, "_blank");
	}	
	
	/**		
	 * Method: isExistScreen
	 */
	function isExistScreen(id, callback) {
		callback(true);
	}
	
	/**
	 * Method: report
	 */
	function report(action) {
		console.log(action);
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
		openPage: openPage,
		isExistScreen: isExistScreen,
		report: report
	}
	
})(window);
