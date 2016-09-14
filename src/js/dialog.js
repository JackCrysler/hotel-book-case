define([],function(){
    var Dialog = function (parent) {
        var parentDom = parent == undefined? document.body:document.querySelector(parent);

        if(!parentDom.querySelector('.dialog-mask')){
            var mask = document.createElement('div');
            mask.className = 'dialog-mask';
            parentDom.appendChild(mask);
            this.mask = mask;
        }
        if(!parentDom.querySelector('.dialog')){
            var dialog = document.createElement('div');
            dialog.className = 'dialog';
            parentDom.appendChild(dialog);
            this.dialog = dialog;
        }

        this.title = '提示信息';
        /*'<span class="dialog-btn certain">确定</span>' +
         '<span class="dialog-btn cancel">取消</span>' +*/
    };
    Dialog.prototype = {
        tpl: '<div class="dialog-wrap">' +
        '<div class="dialog-title">{title}</div>' +
        '<div class="dialog-content">' +
        '<header class="dialog-info">{msg}</header>' +
        '<div class="dialog-action">{btn}</div></div></div>',
        alert: function (msg, callback, title) {
            if(arguments.length == 3){
                this.title = title;
            }
            this.tpl = this.tpl.replace('{btn}','<span class="dialog-btn certain">确定</span>')
                .replace('{msg}',msg).replace('{title}',this.title);

            this.dialog.innerHTML = this.tpl;
            this.callback = callback!=undefined ? callback:function(){};
            this.show();
        },
        confirm: function (msg, callback, title) {
            if(arguments.length == 3){
                this.title = title;
            }
            this.tpl = this.tpl.replace('{btn}','<span class="dialog-btn certain">确定</span><span class="dialog-btn cancel">取消</span>')
                .replace('{msg}',msg).replace('{title}',this.title);
            this.dialog.innerHTML = this.tpl;

            this.callback = callback!=undefined ? callback:function(){};
            this.show();
        },
        bindEvent:function(){
            this.dialog.querySelector('.certain').addEventListener('click',function(){
                this.hide();
                this.callback();
            }.bind(this),false);
            if(this.dialog.querySelector('.cancel')){
                this.dialog.querySelector('.cancel').addEventListener('click',function(){
                    this.hide();
                }.bind(this),false);
            }

        },
        show: function () {
            this.mask.className = this.mask.className+' mask-show';
            this.dialog.className = this.dialog.className+' dialog-show';
            setTimeout(function(){
                this.mask.style.opacity = '0.8';
            }.bind(this),0);
            this.bindEvent();
        },
        hide: function () {
            var classNames = this.mask.classList;
            this.mask.className = classNames[0];
            this.mask.style='';
            classNames = this.dialog.classList;
            this.dialog.className = classNames[0];

        }
    };

    return Dialog;
});