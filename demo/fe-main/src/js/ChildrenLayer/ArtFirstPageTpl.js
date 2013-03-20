/**
 * Created with JetBrains WebStorm.
 * User: zhaolong
 * Date: 13-3-14
 * Time: 下午5:07
 * To change this template use File | Settings | File Templates.
 */
var Tpls = {
    ArtiFirstPageTpl : {
        mainpage:"<div id='module-container-holder'>"+
                         "<div id='module-arti-vertical' class='module-arti-vertical shadow-side-right'>"+
                            "<div id='module-arti-preview-holder' style='display: none;'>"+
                                 "<div id='module-arti-preview-container' style='top: 0px'>"+
                                       "<div id='arti-preview-controls'>"+
                                           "<div class='arti-preview-counter'><span>3/6</span></div>"+
                                            "<div class='arti-preview-backward' onclick='getPreItem()'>"+
                                                "<div class='arti-preview-backg'  style='background-color: rgb(63, 63, 63);'></div>"+
                                                "<div class='arti-preview-backward-sign'></div>"+
                                            "</div>"+
                                            "<div class='arti-preview-close' onclick='returnArtiList()' style='opacity: 1;'>"+
                                                "<div class='arti-preview-backg' style='background-color: rgb(63, 63, 63);'></div>"+
                                                "<div class='arti-preview-close-sign'></div>"+
                                            "</div>"+
                                            "<div class='arti-preview-forward' onclick='getNextItem()'>"+
                                                "<div class='arti-preview-backg' style='background-color: rgb(63, 63, 63);'></div>"+
                                                "<div class='arti-preview-forward-sign'></div>"+
                                            "</div>"+
                                       "</div>"+
                                        "<div id='itemList'></div>"+
                                 "</div>"+
                            "</div>"+
                        "</div>"+
                   "</div>",
        artiNav:    "<div id='module-arti-vertical-container' style='top: 0px'>"+
                        "<div id='title-holder' class='title-holder'>"+
                            "<span class='title-text_normal'>Article</span>"+
                        "</div>"+
                    "</div>",
        artiNavItem:"<div class='custom-separator'></div>"+
                    "<div class='arti-item-vertical' onclick='showDetail(this)' data-index={{index}} data-id='{{id}}'>"+
                        "<div class='arti-item-vertical-title'>{{title}}}</div>"+
                        "<div class='media-holder-arti-vertical'>"+
                            "<img src={{imgURL}} width='100%' style='opacity: 1;'>"+
                        "</div>"+
                        "<div class='main-text-holder'> <p>{{maintext}} </p></div>"+
                        "<div class='arti-item-vertical-read-more'><span>Read More</span></div>"+
                    "</div>",
        artiList:"<div class='custom-separator-preview-news'></div>"+
                 "<div class = 'title-holder'>"+
                    "<span class='title-text_normal'>{{title}}</span>"+
                 "</div>"+
                 "<div class='media-holder-news-preview' data-src={{datasrc}} style='height: 300px;'>"+
                    "<img width='100%' src={{url}}  style='opacity: 1;'></div>"+
                 "<div class='main-text-holder'>{{maintext}}</div>"
    }
}