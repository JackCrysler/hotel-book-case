define(['js/util'],function(util){
    var iSwiper = function(cls,callback) {
        this.win = document.querySelector(cls);
        this.itemsWrap = this.win.querySelector('.iSwiper-wrap');
        this.item = this.itemsWrap.querySelectorAll('.iSwiper-item');
        this.len = this.item.length;
        this.init();
        this.bindEvent();
        this.callback = !!callback ? callback : function (index) {

        }
    };
    iSwiper.prototype = {
        init:function(){
            this.winWidth = this.win.offsetWidth;
            this.itemsWrap.style.width = this.winWidth*this.len+'px';
            var that = this;
            this.item.forEach(function(v,i){
                v.style.width = that.winWidth+'px';
                v.style.background = 'url("'+v.getAttribute('dsrc')+'")';
                v.style.backgroundSize = 'cover';
            })
        },
        stopDefault:function (e) {
            e = e || window.event;
            if (e && e.preventDefault) {
                //e.preventDefault();
                e.stopPropagation();
            } else  {
                window.event.returnValue = false;
                e.cancelBubble = true;
                window.event.cancelBubble = true;
            }
            return false;
        },
        bindEvent:function(){
            var that = this;
            this.histSpan = 0;
            this.index = 0;
            this.itemsWrap.addEventListener('touchstart',function(e){
                that.stopDefault(e);
                that.initX = e.touches[0].clientX;
                that.itemsWrap.className = that.itemsWrap.className.replace('tst','').replace(/(^\s+|\s+$)/,'');
            },false);

            this.itemsWrap.addEventListener('touchmove',function(e){
                that.stopDefault(e);

                that.moveX = e.touches[0].clientX;

                that.spanX = that.moveX-that.initX;

                that.itemsWrap.style.transform = 'translate3d('+(that.spanX+that.histSpan)+'px,-50%,0)';
            },false);
            this.itemsWrap.addEventListener('touchend',function(e){

                if(Math.abs(that.spanX)>that.winWidth/3){
                    if(that.spanX>0){
                        that.index--;
                        if(that.index<0){
                            that.index=0
                        }
                    }else{
                        that.index++;
                        if(that.index>=that.len){
                            that.index = that.len-1;
                        }
                    }
                }

                that.itemsWrap.className = that.itemsWrap.className+' tst';
                that.moveTo(that.index);

                that.histSpan = getComputedStyle(that.itemsWrap).transform.split(',')[4]*1;
            },false);
            this.itemsWrap.addEventListener(util.transitionEnd,function(){
                that.histSpan = getComputedStyle(that.itemsWrap).transform.split(',')[4]*1;

                that.callback(that.index);
            },false)
        },
        moveTo:function(idx){
            this.itemsWrap.style.transform = 'translate3d('+(-this.winWidth*idx)+'px,-50%,0)';
            this.index = idx;
        }
    };

    return iSwiper;
});