define(['jquery','js/util','js/plugin'],function($,util,plugin){
    var Calendar = function(){
        this.initDate = new Date();
        this.n = -1;
        plugin.call(this,'');
        this.tpl = '<div class="calendar"><div class="header"><em class="left-arrow back"></em><span>选择日期</span></div>' +
            '<p class="cal-week clear"><span>天</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></p><div class="calendar-date" data="{YM}">{content}</div></div>';
    };
    Calendar.prototype = new plugin();
    Calendar.prototype.getDays = function(date){
         var year = date.getFullYear(),
             month = date.getMonth()+1;
        var arr = [1,3,5,7,8,10,12],
            arr2 = [4,6,9,11];
        //闰年
        /*if($.inArray(month,arr)>-1){
            return 31;
        }else if($.inArray(month,arr2)>-1){
            return 30;
        }else if(year%4 == 0 && year%100 != 0 || year%400 == 0){
            return 29;
        }else{
            return 28;
        }*/
        if(util.inArray(month,arr)){
            return 31;
        }else if($.inArray(month,arr2)){
            return 30;
        }else if(year%4 == 0 && year%100 != 0 || year%400 == 0){
            return 29;
        }else{
            return 28;
        }
    };
    Calendar.prototype.getYearMonth = function(n){
        var m = this.initDate.getMonth()+n,
            y = this.initDate.getFullYear();
        var resetDate = this.resetDate = new Date(y,m,1);
        this.resetYear = resetDate.getFullYear();
        this.resetMonth = resetDate.getMonth();

    };
    Calendar.prototype.getStartIndex = function(){
        return new Date(this.resetYear,this.resetMonth,1).getDay();
    };
    Calendar.prototype.render = function(){
        this.getYearMonth(this.n);
        var startIndex = this.getStartIndex();
        var days = this.getDays(this.resetDate);
        var prevDays = this.getDays(new Date(this.resetYear,this.resetMonth-1,1));

        var str = '';

        for(var i=0; i<42; i++){
            if(i< startIndex){
                str += '<span class="cal-item to-gray">'+(prevDays-startIndex+i+1)+'</span>'
            }else if(i>=(startIndex + days)){
                str += '<span class="cal-item to-gray">'+ (i- (startIndex + days -1) ) +'</span>';
            }else{
                str += '<span class="cal-item">'+ (i-startIndex+1) +'</span>';
            }
        }

        this.tpl = this.tpl.replace('{YM}',this.resetYear+'-'+(this.resetMonth+1)).replace('{content}',str);

        this.pluginDom.innerHTML = this.tpl;

    };
    Calendar.prototype.show = function(targetEle,callback){
        this._show_();
        this.render();
        this.targetEle = targetEle;
        this.bindEvent();
        this.callback = callback;
    };
    Calendar.prototype.hide = function(){
        this._hide_();
        var that = this;
        $(this.pluginDom).one(util.transitionEnd,function(){
            //that.callback && that.callback();
            $(this).trigger('hide');
        })
    };
    Calendar.prototype.bindEvent = function(){
        var that = this;
        $('.calendar-date').on('click','.cal-item',function(){
            var day = $(this).text();
            that.targetEle.html($(this).parent().attr('data')+'-'+day);
            that.hide();
        });
        $(this.pluginDom).off().on('hide',function(){
            that.callback && that.callback();
        })

    };


    return new Calendar();
});