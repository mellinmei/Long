/**
 * Class: AEF.ChildrenLayer.TextChildrenLayer
 */
AEF.ChildrenLayer.FirstPageChildrenLayer = AEF.Class(AEF.ChildrenLayer, {

    /**
     *
     */
    firstPageWrap: null,

    mousePos: null,

    file: null, //所有文件

    mousePos: null,

    hasResizeHover: false,
	
    /**
     * Constructor: AEF.Layer.TextChildrenLayer
     *
     * Parameters:
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(options) {
        AEF.ChildrenLayer.prototype.initialize.apply(this, arguments);
        console.log(options);
        var that = this;
        this.file = [];
        this.mousePos = {};
        this.buildDom(options)
 //       InterFaceMainPage.getDataById(1,that.buildDom);
    },
    buildDom: function(result){
        var data = result.content;

        /* start build dom */
        this.firstPageWrap = document.createElement("div");
        AEF.Element.addClass(this.firstPageWrap,"firstPageWrap");
        this.firstPageShow = document.createElement("ul");
        this.firstPageWrap.appendChild(this.firstPageShow);       
        this.div.appendChild(this.firstPageWrap);
        for(var i=0,file;file=data[i];i++){
            this.addFile(file);
        }
        var that = this;
        setTimeout(function(){
            that.resizeFile();
            that.initevents();
        },0)
        /* end build dom */
    },
    addFile: function(file){
        var file = AEF.Util.clone(file);
        this.file.push(file);

        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = file.src;
        var hoverMask = document.createElement("div");
        AEF.Element.addClass(hoverMask,"hover-mask");
        var title = document.createElement("span");
        AEF.Element.addClass(title,"title");
        title.innerText = file.title;
        hoverMask.appendChild(title);
        li.appendChild(img);
        li.appendChild(hoverMask);
        this.addSlideHover(li);
        this.firstPageShow.appendChild(li);

        file.dom = li;
    },
    bindEvents: function(el,ev,fn){
        var context = this;
        el.addEventListener(ev,function(){
            fn.apply(context,arguments)
        },false);
    },
    _resizeHover: function(){

    },
    initevents: function(){


        this.bindEvents(window,"mousemove",function(e){
            this.mousePos.x = this.mousePos.preX;
            this.mousePos.y = this.mousePos.preY;
            this.mousePos.preX = e.clientX;
            this.mousePos.preY = e.clientY;
        });

        var changeTimer;
        var hasResizeHover = false;
        this.bindEvents(window,"resize",function(e){

            var that = this;
            if(!that.hasResizeHover){
                console.error(hasResizeHover)
                that.hasResizeHover = true;
                that.currentDom = null;
                for(var i=0,img;img=that.file[i];i++){
                    that.tool.setStyles(img.dom.getElementsByClassName("hover-mask")[0],{
                        left: "9999px",
                        top: "9999px",
                        WebkitTransition: ""
                    });
                    
                }
            }

            if(changeTimer){
                clearTimeout(changeTimer);
                changeTimer = null;
            } 
            changeTimer = setTimeout(function(e){
                that.resizeFile();
                clearTimeout(changeTimer);
                changeTimer=0;
            },200);
        })
    },
    _removeMask: function(target,e){
        var that = this;
        var width=target.offsetWidth,height=target.offsetHeight;
        var hover = target.getElementsByClassName("hover-mask")[0];
        var pos = target.getBoundingClientRect();
        var left = pos.left,right=left+width,
            top = pos.top,bottom=top+height;
        var x=e.clientX,y=e.clientY;

        if(x>left&&x<right&&y>top&&y<bottom){
            return;
        }

        var direction={};
        if(x<left){
            direction.left=-width;
            direction.top=0;
        }else{
            if(x>=right){
                direction.left=width;
                direction.top=0;
            }else{
                if(y<top){
                    direction.left=0;
                    direction.top=-height;
                }else{
                    direction.left=0;
                    direction.top=height;
                }
            }
        }

        that.currentDom = null;
        setTimeout(function(){
            that.tool.setStyles(hover,{
                left: direction.left+"px",
                top: direction.top+"px"
            });
        },0)              
    },
    _dragable: function(file){
        
    },
    _addMask: function(target,e){
        var hover = target.getElementsByClassName("hover-mask")[0];
        var width=target.offsetWidth,height=target.offsetHeight;
        var pos = target.getBoundingClientRect();
        var left = pos.left,right=left+width,
            top = pos.top,bottom=top+height;

        this.currentDom = target;

        var direction={};
        if(this.mousePos.x<left){
            direction.left=-width;
            direction.top=0;
        }else{
            if(this.mousePos.x>=right){
                direction.left=width;
                direction.top=0;
            }else{
                if(this.mousePos.y<top){
                    direction.left=0;
                    direction.top=-height;
                }else{
                    direction.left=0;
                    direction.top=height;
                }
            }
        }


        this.tool.setStyles(hover,{
            left: direction.left+"px",
            top: direction.top+"px",
            WebkitTransition: ""
        });
        var that = this;
        setTimeout(function(){
            that.tool.setStyles(hover,{
                left: 0,
                top: 0,
                WebkitTransition: "all .2s linear"
            });
        },0)
    },
    _onMouseOverAddMask: function(target,e) {
        if(this.currentDom){
            if(this.currentDom == target){
                return;
            }
            var dom = this.currentDom;
            this.currentDom = null;
            this._removeMask(dom,e);
        }
        this._addMask(target,e);
    },

    addSlideHover: function(dom){
        var that = this;

        dom.addEventListener('mouseover', function(e){
            if(that.hasResizeHover){
                that.hasResizeHover = false;
            }
            that._onMouseOverAddMask(this,e)
        }, false);

        var outTimer;
        dom.addEventListener('mouseout', function(e){
            if(outTimer) clearTimeout(outTimer);
            outTimer = setTimeout(function(){
                if(that.currentDom&&(that.currentDom == dom)){
                    that._removeMask(dom,e);
                    return;
                }

            },0);
        }, false);

    },
    resizeFile: function(){
        var MAXWIDTH = 530,
            MAXHEIGHT = 320;
        var wrapWidth = this.firstPageWrap.clientWidth,
            wrapHeight = this.firstPageWrap.clientHeight,
            wrapArea = wrapWidth*wrapHeight;

        var horizonNumber = Math.floor(wrapWidth/MAXWIDTH)+1,   
            verticalNumber = Math.ceil(this.file.length/horizonNumber);
        //var tempNumber = Math.floor(wrapArea/fileArea)%horizonNumber);
        var fileWidth = wrapWidth/horizonNumber,
            fileHeight = (fileWidth*MAXHEIGHT)/MAXWIDTH,
            fileArea = fileWidth*fileHeight;
        var tempNumber = Math.floor((wrapArea/fileArea)/horizonNumber);

        //文件占用的面积大于容器所能给的面积，需要加滚动条，重新计算宽高
        if(verticalNumber > tempNumber){    
            this.tool.setStyles(this.firstPageShow,{
                height: 9999+"px"
            });
            var newWrapWidth = this.firstPageWrap.clientWidth;

            fileWidth = newWrapWidth/horizonNumber,
            fileHeight = (fileWidth*MAXHEIGHT)/MAXWIDTH;
        }
        fileWidth = Math.ceil(fileWidth);
        fileHeight = Math.ceil(fileHeight)
        this.tool.setStyles(this.firstPageShow,{
            height: (fileHeight*verticalNumber) + "px" 
        });
        var currentHorizon = 0,
            currentVertical = -1;
        for(var i=0,img;img=this.file[i];i++){

            if(currentVertical>=horizonNumber-1){
                currentVertical = -1;
                currentHorizon++;
            }
            currentVertical++;              
            this.tool.setStyles(img.dom,{
                width: fileWidth+"px",
                height: fileHeight+"px",
                //left: Math.floor(currentVertical*fileWidth)+"px",
                //top: Math.floor(currentHorizon*fileHeight)+"px"
                WebkitTransform:"translate("+Math.floor(currentVertical*fileWidth)+"px,"+
                    Math.floor(currentHorizon*fileHeight)+"px)"
            });
        }
    },
	tool: {
        setStyles: function(el,args){
            for(var key in args){
                el.style[key] = args[key];
            }
        }
    },
	CLASS_NAME: "AEF.ChildrenLayer.FirstPageChildrenLayer"
});
