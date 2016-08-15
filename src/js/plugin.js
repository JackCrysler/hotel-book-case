define([],function(){
    var Plugin = function(option){
        if(typeof option == 'undefined') option = {};
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
        this._bindEvent_();
        this.pluginDom.className = this.pluginDom.className.replace('none','');
    };
    Plugin.prototype = {
        _show_:function(){
            if(this.pluginDom.className.indexOf(this._class.showClass)>-1) return;

            this.pluginDom.className = this.pluginDom.className+' '+this._class.showClass;

            this.afterShow();
        },
        _hide_:function() {
            this.pluginDom.className = this.pluginDom.className.replace(this._class.showClass,'').replace(/^(\s+)|(\s+)$/,'');
            this.afterHide();
        },
        afterShow:function(){
            return false;
        },
        afterHide:function(){
            return false;
        },
        _bindEvent_:function(){
            var that = this;
            this.pluginDom.addEventListener('click',function(e){
                var target = e.target || e.srcElement;
                if(target.className.indexOf('back')>-1){
                    that._hide_();
                }
            },false)
        }
    };

    return Plugin;
});