/**
 * @author xingyan
 */
var GLOBAL_MAIN_NAV = null,
	WINDOW_ONLOAD = false,
	GLOBAL_INIT_DATA = null;
	
/**
 * 
 */

InterFaceMainPage.getNavData(initializeNav);

function initializeNav(data) {
	window.setTimeout(function() {
		GLOBAL_MAIN_NAV = data;
		checkWindowDone();		
	}, 1200);
}

window.addEventListener("load", function() {
	WINDOW_ONLOAD = true;
	checkWindowDone();
})

function checkWindowDone() {
	if(GLOBAL_MAIN_NAV == null || !WINDOW_ONLOAD)	return;
	var navmenu = new AEF.Control.NavMenu({
		id: "browser_page_navmenu",
		data: GLOBAL_MAIN_NAV
	});
	
	var bgLayer = new AEF.Layer.BackgroundLayer("browser-page-bg", {
			id: "browser_fe_bglayer"
		}),
		contentLayer = new AEF.Layer.ContentLayer("browser-page-content", {
			id: "browser_fe_contentlayer"
		});
	
	var changedNavCommand = new AEF.Command.ChangedNavCommand("ChangedNav");
	var mainPage = new AEF.Page.MainPage("browser_fe_page", {
		id: "browser_fe_page_container",
		controls: [navmenu],
		layers: [bgLayer, contentLayer],
		commands: [changedNavCommand],
		viewCss: "overflow: hidden; position: relative; z-index: 1; background: #FFFFFF"
	});
}