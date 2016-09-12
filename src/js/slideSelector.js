define([],function(){
    var slideSelector = function(options){

        this.init(options.wrap);
    };
    slideSelector.prototype = {
        init:function(dom){

            if(!document.querySelector('.slide-selector')){
                var _div = document.createElement('div');
                _div.className = 'slide-selector';
                this.wrapper = _div;
                document.querySelector(dom).appendChild(_div);
            }else{
                this.wrapper = document.querySelector('.slide-selector');
            }

            this.bindEvent();
        },
        tpl: '<header class="slide-header"><div class="slide-title">{title}</div><span class="slide-cancel">取消</span></header>'+
        '<div class="slide-options">{content}</div>',
        bindEvent:function(){
            var that = this;

            this.wrapper.addEventListener('click',function(e){
                var ev = e || window.event, target = ev.target || ev.srcElement;
                if(target.tagName.toUpperCase() == "P"){
                    var selectedData = target.getAttribute('data');
                    var txt = target.innerHTML;
                    that.data.callback({
                        selected:selectedData,
                        txt:txt
                    });
                    that.hide();
                    return;
                }
                if(target.className == 'slide-cancel'){
                    that.hide()
                }

            },false)
        },
        show:function(data){
            this.data = data;
            this.render();
            this.wrapper.className = this.wrapper.className+' slide-active';
            document.querySelector('.mask-layer').className
                = document.querySelector('.mask-layer').className+' show';
        },
        render:function(){
            var _data = this.data, str='';
            _data.data.forEach(function(v,i){
                str += '<p class="slide-option" data="'+i+'">'+v+'</p>';
            });
            this.tpl = this.tpl.replace('{title}',_data.title).replace('{content}',str);
            this.wrapper.innerHTML = this.tpl;
        },
        hide:function(){
            this.wrapper.className = this.wrapper.className.replace('slide-active','');
            document.querySelector('.mask-layer').className=document.querySelector('.mask-layer').className.replace('show','');

        }
    };

    return slideSelector;
});