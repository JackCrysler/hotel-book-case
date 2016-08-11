define(['jquery','swiper','js/plugin','data/citydata'],function($,swiper,plugin,cities){
    new swiper('.swiper-container',{
        loop:true,
        autoplay:4000
    });








    var City = function(){
        plugin.apply(this,[{showClass:null}]);

        var allCity = cities.cityList;
        var obj = {

        };
        var alphabet = [];
        allCity.forEach(function(v,i){
            if(!obj[v[1].charAt(0).toUpperCase()]){
                obj[v[1].charAt(0).toUpperCase()] = [];
                alphabet.push(v[1].charAt(0).toUpperCase());
            }
            obj[v[1].charAt(0).toUpperCase()].push(v);

        });
        this.obj = obj;
        this.alphabet = alphabet.sort();
        this.init();
    };
    City.prototype = plugin.prototype;
    City.prototype.init = function(){
        this.render();
        this.bindEvt();
    };
    City.prototype.render=function(){
        var str ='';
        this.alphabet.forEach(function(v,i){
            str += '<li data="'+v+'">'+v+'</li>';
        });
        $('.alphabet').find('ol').html(str);
    };
    City.prototype.bindEvt=function(){
        var that = this;
        $('.alphabet').on('click','li',function(){
            var tag = $(this).attr('data');
            var str = '<p class="cont-title">'+tag+'</p>';
            that.obj[tag].forEach(function(v,i){
                str+='<span>'+v[0]+'</span>'
            });
            $('.city-detail').html(str)
        })
    };
    var city = new City();

    $('.local-place').on('click',function(){
        city.show();
    })

});