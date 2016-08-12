define([],function(){
    var Plugin = function(option){
        this._class = {
            showClass: option.showClass || 'plugin-active',
            hideClass: option.hideClass || 'plugin-hide'
        };
        var plu = document.querySelector('.plugin');
        if(plu){
            this.pluginDom = plu;
            plu.className = plu.className+' '+this._class.hideClass;
        }else{
            var div = document.createElement('div');
            div.className = 'plugin '+this._class.hideClass;
            document.querySelector('.container').appendChild(div);
            this.pluginDom = div;
        }
        this.bindEvent();
    };
    Plugin.prototype = {
        show:function(targetEle){
            this.targetEle = targetEle;
            this.pluginDom.className = this.pluginDom.className+' '+this._class.showClass;
            this.afterShow();
        },
        hide:function() {
            this.pluginDom.className = this.pluginDom.className.replace(this._class.showClass,'');
            this.afterHide();
        },
        afterShow:function(){
            return false;
        },
        afterHide:function(){
            return false;
        },
        bindEvent:function(){
            var that = this;
            this.pluginDom.addEventListener('click',function(e){
                var target = e.target || e.srcElement;
                if(target.className.indexOf('back')>-1){
                    that.hide();
                }
            },false)
        }
    };

    return Plugin;
});