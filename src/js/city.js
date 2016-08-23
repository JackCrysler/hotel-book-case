define(['jquery','js/plugin','data/citydata'],function($,plugin,cities){
    var City = function(){
        plugin.apply(this,[{showClass:null}]);
        this.tpl =
            '<div class="city">'+
            '<div class="header"><em class="left-arrow back"></em><span>城市选择</span></div>'+
            '<div class="city-content">'+
            '<div class="search-area"><p class="cont-title">搜索</p>' +
            '<div>'+
            '<section><input class="search-msg" type="text" placeholder="请输入beijing/bj/北京"></section>'+
            '</div>'+
            '</div>'+
            '<div class="hot-city clear">'+
            '<p class="cont-title">热门</p>'+
            '<div></div>'+
            '</div>'+
            '<div class="alphabet">'+
            '<p class="cont-title">更多</p>'+
            '<ol class="clear"></ol>'+
            '</div>'+
            '<div class="city-detail clear"></div>'+
            '</div>'+
            '</div>'+
            '<div class="search-result"></div>';
        var allCity = this.allCity = cities.cityList;
        var obj = {};
        var alphabet = [];
        var tmp =null;
        allCity.forEach(function(v,i){
            tmp = v[1].charAt(0).toUpperCase();
            if(!obj[tmp]){
                obj[tmp] = [];
                alphabet.push(tmp);
            }
            obj[tmp].push(v);

        });
        this.obj = obj;
        this.alphabet = alphabet.sort();
    };
    City.prototype = new plugin();
    City.prototype.init = function(){
        this.pluginDom.innerHTML = this.tpl;
        this.render();
        this.bindEvt();

        //默认展示A开头的城市
        $('.alphabet').find('li[data=A]').click();
    };
    City.prototype.render=function(){
        var str ='';
        this.alphabet.forEach(function(v,i){
            str += '<li data="'+v+'">'+v+'</li>';
        });
        $('.alphabet').find('ol').html(str);

        str='';
        cities.hotList.forEach(function(v,i){
            str += '<span>'+v[0]+'</span>';
        });
        $('.hot-city div').html(str);
    };
    City.prototype.bindEvt=function(){
        var that = this;
        this.wrapper = $('.city');
        $('.alphabet').on('click','li',function(){
            var tag = $(this).attr('data');
            var str = '<p class="cont-title">'+tag+'</p>';
            that.obj[tag].forEach(function(v,i){
                str+='<span>'+v[0]+'</span>'
            });
            $('.city-detail').html(str);
        });
        $(this.pluginDom).on('click','span',function(){
            var name = $(this).text();
            that.targetEle.text(name);
            that.hide();
        });

        this.wrapper.find('.search-msg').on('input propertychange',function(){
            that.match($(this).val());
        })
    };
    City.prototype.match = function(_key){
        var len = _key.length;
        var domWrap = $(this.pluginDom);
        if(len>0){
            domWrap.find('.search-result').show();
        }else{
            domWrap.find('.search-result').hide();
        }
        var arr = [];
        this.allCity.forEach(function(v,i){
            if(v[0].substr(0,len) == _key || v[1].substr(0,len) == _key ||v[2].substr(0,len) == _key){
                arr.push(v);
            }
        });

        var str = '';
        arr.forEach(function(v,i){
            str+='<span>'+v[0]+'</span>';
        });
        $('.search-result').html(str);
    };
    City.prototype.show = function(targetEle){
        this.init();
        this._show_();

        this.targetEle = targetEle;
    };
    City.prototype.hide = function(){
        this._hide_();
    };
    City.prototype.afterShow = function(){
        this.wrapper.scrollTop(0);
    };
    City.prototype.afterHide = function(){
        $(this.pluginDom).find('.search-result').hide();
        $(this.pluginDom).find('.search-msg').val('');
    };
    return new City();

});