/**
 * @author xingyan
 */
var Startpage = (function(window) {		
	
	var NEWS_DATA = {
		"focus_image" : [
		{
		    "m_title" : "梅西获金球奖 4连冠成历史第一人",
		    "m_url" : "http:\/\/sports.huanqiu.com\/pictures\/list\/2013-01\/2679090.html",
		    "m_image_url" : "http:\/\/g.hiphotos.baidu.com\/news\/pic\/item\/7dd98d1001e939015663bdfa7bec54e737d19694.jpg"
		},{
		    "m_title" : "江西种粮大户给农民发百万年终奖",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-08\/163662.shtml#nextpage",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/83025aafa40f4bfb1628ae90034f78f0f636187d.jpg"
		},{
		    "m_title" : "美国前州长和谷歌总裁到达朝鲜",
		    "m_url" : "http:\/\/news.ifeng.com\/photo\/hdnews\/detail_2013_01\/08\/20942777_0.shtml#p=1",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/d52a2834349b033b15bbce1e15ce36d3d439bdc6.jpg"
		},{
		    "m_title" : "河南市民送廉政锦旗遭政府拒接",
		    "m_url" : "http:\/\/photo.eastday.com\/hdqxb2013\/20130108_3\/index.html",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/503d269759ee3d6d4903aa0f43166d224e4ade28.jpg"
		},{
		    "m_title" : "越南新娘：望乡路远",
		    "m_url" : "http:\/\/photo.gmw.cn\/2013-01\/07\/content_6285058.htm#Content_Title",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-08\/69fe41e918e20e3a3fdbf59ac55e43c3.jpg"
		},{
		    "m_title" : "动姐摆\"动车style\"迎蛇年春运",
		    "m_url" : "http:\/\/news.cnwest.com\/content\/2013-01\/07\/content_8186183.htm",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/fd039245d688d43f9e5b12317d1ed21b0ff43b06.jpg"
		},{
		    "m_title" : "北京地铁10号线成最拥挤线路",
		    "m_url" : "http:\/\/news.xinhuanet.com\/city\/2013-01\/07\/c_124198960.htm",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/b64543a98226cffc52e93e71b9014a90f703ea36.jpg"
		},{
		    "m_title" : "2013央视蛇年春晚主持群确定",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-07\/163508.shtml#nextpage",
		    "m_image_url" : "http:\/\/g.hiphotos.baidu.com\/news\/pic\/item\/d53f8794a4c27d1ee87296071bd5ad6edcc43898.jpg"
		},{
		    "m_title" : "胡耀邦铜像在浙江大陈岛揭幕",
		    "m_url" : "http:\/\/www.ccdy.cn\/xinwen\/wenhua\/xinwen\/201301\/t20130107_520855.htm",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-07\/6b923a9fdc7448e1f46b2976f184792e.jpg"
		},{
		    "m_title" : "大雾致成彭高速20多辆车连环追尾",
		    "m_url" : "http:\/\/news.xinmin.cn\/shehui\/2013\/01\/07\/18007771.html",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-07\/af6a98fd77ed76dc79edb03729d6defb.jpg"
		},{
		    "m_title" : "美国会议员合影 后排4人系PS加入",
		    "m_url" : "http:\/\/world.huanqiu.com\/well_read\/2013-01\/3453672.html",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-07\/db0e56d2ebb7b3cfc6d55c06ff189b31.jpg"
		},{
		    "m_title" : "江苏太仓窄道两侧建两所豪华公厕",
		    "m_url" : "http:\/\/finance.china.com.cn\/news\/photo\/20130107\/3389.shtml?pic=2",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-07\/dfeb2bf21bcee6a568748a721ef9f06a.jpg"
		},{
		    "m_title" : "国足队员佩戴红领巾参加校园活动",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-07\/163447.shtml#nextpage",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-07\/a9c3b171a058ce86e9418e52bfc69176.jpg"
		},{
		    "m_title" : "山西长治苯胺泄漏 触目惊心",
		    "m_url" : "http:\/\/pic.news.sohu.com\/911195\/911297\/group-406970.shtml#0",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/a8773912b31bb051dd2a63ea367adab44bede0e2.jpg"
		},{
		    "m_title" : "江苏媒体刊登胡锦涛回乡考察照片",
		    "m_url" : "http:\/\/news.ifeng.com\/photo\/hdnews\/detail_2013_01\/06\/20854266_0.shtml#p=1",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/29381f30e924b899dda8e4fa6e061d950b7bf658.jpg"
		},{
		    "m_title" : "朝鲜内部一瞥:金正恩领导的朝鲜",
		    "m_url" : "http:\/\/world.gmw.cn\/2013-01\/06\/content_6269998.htm#Content_Title",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/d62a6059252dd42aa2ccfc69033b5bb5c8eab82f.jpg"
		},{
		    "m_title" : "杭州动物园游客持雪球砸狮子取乐",
		    "m_url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/06\/content_27601301.htm",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/8326cffc1e178a8283218262f603738da877e8d7.jpg"
		},{
		    "m_title" : "河北邯郸民众因水污染抢购矿泉水",
		    "m_url" : "http:\/\/life.gmw.cn\/2013-01\/06\/content_6264864.htm",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/37d3d539b6003af3e9e460a2352ac65c1138b692.jpg"
		},{
		    "m_title" : "成都机场大雾 上万名旅客滞留 ",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-06\/162961.shtml#nextpage",
		    "m_image_url" : "http:\/\/g.hiphotos.baidu.com\/news\/pic\/item\/4e4a20a4462309f721e913d0720e0cf3d6cad66a.jpg"
		},{
		    "m_title" : "济南一路段1公里设10组红绿灯",
		    "m_url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/06\/content_27595674.htm",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/a8ec8a13632762d0ab03417ea0ec08fa513dc636.jpg"
		},{
		    "m_title" : "特写：奥巴马的2012",
		    "m_url" : "http:\/\/news.xinhuanet.com\/photo\/2013-01\/06\/c_124189526.htm",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/8cb1cb1349540923f48d2ebc9258d109b2de490f.jpg"
		},{
		    "m_title" : "朝鲜民众发誓贯彻金正恩所提任务",
		    "m_url" : "http:\/\/pic.news.sohu.com\/group-406776.shtml#0",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/9d82d158ccbf6c81b34d6e2abc3eb13532fa40fd.jpg"
		},{
		    "m_title" : "哈尔滨国际冰雪节开幕 如梦似幻",
		    "m_url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/06\/content_27596034.htm",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/d50735fae6cd7b89c34888410f2442a7d8330ecf.jpg"
		},{
		    "m_title" : "中国海监飞机新年首次靠近钓鱼岛",
		    "m_url" : "http:\/\/mil.huanqiu.com\/photo_china\/2013-01\/2678763.html",
		    "m_image_url" : "http:\/\/d.hiphotos.baidu.com\/news\/pic\/item\/c8ea15ce36d3d5393c93ea023a87e950342ab041.jpg"
		},{
		    "m_title" : "昆明机场近万人滞留冲突不断",
		    "m_url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/05\/content_27591779.htm",
		    "m_image_url" : "http:\/\/e.hiphotos.baidu.com\/news\/pic\/item\/63d9f2d3572c11dfd33624e2632762d0f603c208.jpg"
		},{
		    "m_title" : "深圳首对“拉拉”公开恋情摆婚宴",
		    "m_url" : "http:\/\/news.ycwb.com\/2013-01\/05\/content_4184688.htm",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/d52a2834349b033b8274b51b15ce36d3d439bd77.jpg"
		},{
		    "m_title" : "日本新驻华大使首次出席公开活动",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-05\/162753.shtml#nextpage",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/dc54564e9258d10955d82373d158ccbf6c814d3c.jpg"
		},{
		    "m_title" : "香港反梁派举殖民时期旗帜游行",
		    "m_url" : "http:\/\/news.china.com\/zh_cn\/hd\/11127798\/20130105\/17613550.html",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/cb8065380cd7912365b9d9b5ad345982b3b78092.jpg"
		},{
		    "m_title" : "61岁老人四战考研",
		    "m_url" : "http:\/\/news.cn.yahoo.com\/newspic\/news\/30169\/#1",
		    "m_image_url" : "http:\/\/a.hiphotos.baidu.com\/news\/pic\/item\/0823dd54564e9258f0cc302f9c82d158cdbf4e72.jpg"
		},{
		    "m_title" : "兰考民办弃婴所失火 现场曝光",
		    "m_url" : "http:\/\/news.qq.com\/a\/20130104\/001676.htm#p=1",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/ac6eddc451da81cb5d6ac30c5266d01608243166.jpg"
		},{
		    "m_title" : "菲律宾发生枪击案致9死11伤",
		    "m_url" : "http:\/\/news.cnwest.com\/content\/2013-01\/05\/content_8152298.htm",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/3bf33a87e950352a282761c95343fbf2b3118ba9.jpg"
		},{
		    "m_title" : "韩国示威者切腹抗议日本特使访韩",
		    "m_url" : "http:\/\/pic.news.sohu.com\/group-406511.shtml#0",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/d1160924ab18972bbb8e440be6cd7b899f510abe.jpg"
		},{
		    "m_title" : "\"史上最严\"研考开考 武警查证件",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-05\/162490.shtml#nextpage",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/3bf33a87e950352a0fa886c95343fbf2b3118b22.jpg"
		},{
		    "m_title" : "河南村支书指挥百人深夜强拆民房",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AP0001\/30778.html?frp10",
		    "m_image_url" : "http:\/\/e.hiphotos.baidu.com\/news\/pic\/item\/d31b0ef41bd5ad6e6bf3712b81cb39dbb7fd3cec.jpg"
		},{
		    "m_title" : "火灾前的兰考弃婴收养所",
		    "m_url" : "http:\/\/news.qq.com\/a\/20130104\/001074.htm#p=1",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/5d6034a85edf8db1e63638a50923dd54574e74d2.jpg"
		},{
		    "m_title" : "考研大军“临阵磨枪”紧张备考",
		    "m_url" : "http:\/\/news.youth.cn\/gn\/201301\/t20130104_2774378.htm",
		    "m_image_url" : "http:\/\/e.hiphotos.baidu.com\/news\/pic\/item\/7c1ed21b0ef41bd50fdbee3551da81cb38db3d62.jpg"
		},{
		    "m_title" : "暗拍深圳收教所医生敲诈失足女",
		    "m_url" : "http:\/\/news.china.com\/zh_cn\/hd\/11127798\/20130104\/17611523.html",
		    "m_image_url" : "http:\/\/g.hiphotos.baidu.com\/news\/pic\/item\/fcfaaf51f3deb48fece8a61ff01f3a292cf57869.jpg"
		},{
		    "m_title" : "“201314”各地掀结婚潮",
		    "m_url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-04\/162131.shtml#nextpage",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/21a4462309f79052ac157bff0cf3d7ca7acbd5ec.jpg"
		},{
		    "m_title" : "河南兰考一弃婴收养场所失火",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AP0001\/30773.html#p=8KCIBQ2P00AP0001&from=slt",
		    "m_image_url" : "http:\/\/b.hiphotos.baidu.com\/news\/pic\/item\/80cb39dbb6fd52663afdfbd4ab18972bd5073618.jpg"
		},{
		    "m_title" : "深圳打假倡廉武工队劝贪官自首",
		    "m_url" : "http:\/\/news.cqnews.net\/html\/2013-01\/04\/content_23146198.htm",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/d53f8794a4c27d1e250bd5041bd5ad6edcc438c5.jpg"
		},{
		    "m_title" : "武汉建\"遮羞墙\"隔开城中村与马路",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AP0001\/30756.html#p=8KC0ILUE00AP0001&from=slt",
		    "m_image_url" : "http:\/\/a.hiphotos.baidu.com\/news\/pic\/item\/500fd9f9d72a60595b3106da2834349b023bbac9.jpg"
		},{
		    "m_title" : "广州居民因施工扰民与工队爆冲突",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AP0001\/30770.html#p=8KCALNQV00AP0001&from=photoPrev",
		    "m_image_url" : "http:\/\/a.hiphotos.baidu.com\/news\/pic\/item\/d1a20cf431adcbeffd99a3c6acaf2edda2cc9f45.jpg"
		},{
		    "m_title" : "江苏昆山一会所取名\"白宫\"引争议",
		    "m_url" : "http:\/\/www.fjsen.com\/h\/2013-01\/03\/content_10257659.htm",
		    "m_image_url" : "http:\/\/e.hiphotos.baidu.com\/news\/pic\/item\/503d269759ee3d6d33c57c0b43166d224e4adeeb.jpg"
		},{
		    "m_title" : "7500名旅客因大雾滞留昆明机场",
		    "m_url" : "http:\/\/china.zjol.com.cn\/05china\/system\/2013\/01\/04\/019060653.shtml#p=1",
		    "m_image_url" : "http:\/\/c.hiphotos.baidu.com\/news\/pic\/item\/b7fd5266d0160924bba759dbd40735fae7cd346b.jpg"
		},{
		    "m_title" : "印度议员夜闯民宅强奸女性被殴打",
		    "m_url" : "http:\/\/news.sun0769.com\/photo\/international\/201301\/t20130104_1720890.shtml",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/962bd40735fae6cda0dc96a00fb30f2443a70f82.jpg"
		},{
		    "m_title" : "金正恩夫人身形消瘦亮相或已生产",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AO0001\/30743.html?frp10#p=8K9Q9FJ700AO0001&from=slt",
		    "m_image_url" : "http:\/\/news.baidu.com\/z\/resource\/r\/image\/2013-01-03\/1079be08f7b06b50b8323707d75b86a7.jpg"
		},{
		    "m_title" : "温州一皮革厂突发大火",
		    "m_url" : "http:\/\/news.163.com\/photoview\/00AN0001\/30742.html#p=8K9N27QK00AN0001&from=slt",
		    "m_image_url" : "http:\/\/f.hiphotos.baidu.com\/news\/pic\/item\/cc11728b4710b9126237dd3ec3fdfc039345227f.jpg"
		},{
		    "m_title" : "山东滨州1吨金条铺成\"黄金大道\"",
		    "m_url" : "http:\/\/news.qq.com\/a\/20130103\/000056.htm#p=1",
		    "m_image_url" : "http:\/\/g.hiphotos.baidu.com\/news\/pic\/item\/cc11728b4710b91264e4df3ec3fdfc03934522cc.jpg"
		},{
		    "m_title" : "图片故事：岗位上的元旦假期",
		    "m_url" : "http:\/\/news.qq.com\/a\/20130103\/000152.htm#p=1",
		    "m_image_url" : "http:\/\/h.hiphotos.baidu.com\/news\/pic\/item\/dc54564e9258d1093b068172d158ccbf6d814d0c.jpg"
		},{
		    "m_title" : "新年钟声敲响 “北京之光”点亮",
		    "m_url" : "http:\/\/bj.yzdsb.com.cn\/system\/2013\/01\/03\/012269972.shtml",
		    "m_image_url" : "http:\/\/a.hiphotos.baidu.com\/news\/pic\/item\/9213b07eca806538401f8dd397dda144ac34827c.jpg"
		}
	]};
	
	var FAVORITE_DATA_TRUE = 
		[{
			id: '1',
			title: '百度',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/baidu.jpg',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/baidu.jpg',
			url: 'http://www.baidu.com',
			isStore: 'true',
			canClose: false
		}, {
			id: '2',
			title: '我的首页 新浪微博-随时随地分享身边的新鲜事儿',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/sina.jpg',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/sina.jpg',
			url: 'http://t.sina.com'
		}, {
			id: '3',
			title: '京东商城-中国专业的电脑,手机,数码,家电,日用百货网上购物商城',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/jd.jpg',
			//icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/jd.jpg',
			url: 'http://www.360buy.com'
		}, {
			id: '4',
			title: '163网易免费邮--中文邮箱第一品牌',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/163.jpg',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/163.jpg',
			url: 'http://mail.163.com'
		}, {
			id: '5',
			title: '在线翻译_在线词典_金山词霸_爱词霸英语',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/iciba.jpg',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/iciba.jpg',
			url: 'http://www.iciba.com'
		}, {
			id: '6',
			title: '黑暗军团 - DFT论坛 PPC手机SYS&XIP&ROM&软件调整免费下载,机型厨房移植教材教程,网盘导航汉化绿色版 - Powered By DFT',
			thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/dft.jpg',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/dft.jpg',
			url: 'http://www.darkforcesteam.com.cn/'
		}, {
			id: '7'
		},
		{
			id: '8',
			title: '豆瓣电台-Beta',
			thumbnail: '',
			icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/doubanfm.jpg',
			url: 'http://douban.fm',
			isStore: 'true'
		}],
		
		FAVORITE_DATA_FALSE = 
		[
				{ id: '1', title: '我的收藏', isdefaultApp: "true", className: "app-bookmarks", thumbnail: '', icon: '', url: 'http://www.baidu.com/', isStore: '' }, 
				{ id: '2', title: '看新闻', isdefaultApp: "true", className: "app-news", thumbnail: '', icon: '', url: 'http://www.qq.com/' }, 
				{ id: '3', title: '看视频', isdefaultApp: "true", className: "app-video", thumbnail: '', url: 'http://www.taobao.com/' }, 
				{ id: '4', title: '163网易免费邮--中文邮箱第一品牌', thumbnail: 'http://fe.baidu.com/~shichunhua/tabpageIcon/163.jpg', icon: 'http://fe.baidu.com/~shichunhua/tabpageIcon/fav/163.jpg', url: 'http://mail.163.com'},
				{ id: '5', title: '', thumbnail: '', icon: '', url: '' }, 
				{ id: '6', title: '', thumbnail: '', icon: '', url: '' }, 
				{ id: '7'},
				{ id: '8', title: '', thumbnail: '', icon: '', url: '', isStore: ''}
		];
	
	
	
	
	
	/**
	 * Method: getDataFromNews
	 * 向新闻要数据
	 * Parameters: 
	 * callback	-	{Function}	拉新闻接口的回调
	 */
	function getDataFromNews(callback) {
		callback(NEWS_DATA);
	}
	
	/**
	 * Method: getFavoriteData
	 * 从浏览器拉八宫格数据
	 * Parameters:
	 * callback	-	{Function}	拉取浏览器八宫格数据回调
	 */
	function getFavoriteData(callback) {
		callback(FAVORITE_DATA_FALSE);
	}
	
	/**
	 * Method: onFavoriteDataPush
	 * 监听八宫格推送
	 * Parameters:
	 * callback
	 */
	function onFavoriteDataPush(callback) {
		
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
	 * 打开指定url
	 * Parameters:
	 * url	-	{String}
	 */
	function openPage(url) {
		window.open(url, "_blank");
	}
	
	/**
	 * Method: openBookmarks
	 */
	function openBookmarks() {
		window.open("http://www.baidu.com/", "_blank");
		document.focus();		
	}
	
	/**
	 * Method: report
	 */
	function report(action) {
		console.log(action);
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
		getFaviconURL: getFaviconURL,
		openPage: openPage,
		openBookmarks: openBookmarks,
		report: report
	}
	
})(window);
