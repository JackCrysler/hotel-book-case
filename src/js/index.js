define(['jquery','swiper','js/city','js/calendar','js/dialog'],function($,swiper,city,Calendar,Dialog){
    if(window.location.href.indexOf('index.html')==-1) return;
    //查看历史记录，是否存在搜索记录，如果存在就给页面默认展示上次的搜索记录
    var searchHistory = localStorage.getItem('search-history');
    if(searchHistory){
        searchHistory = JSON.parse(searchHistory);
        $('.local-city').text(searchHistory.city);
        $('.date-in').text(searchHistory.inDate);
        $('.date-out').text(searchHistory.outDate);
    }else{
        var cur = new Date();
        $('.date-in').text(cur.getFullYear()+'-'+(cur.getMonth()+1)+'-'+cur.getDate());
        $('.date-out').text(cur.getFullYear()+'-'+(cur.getMonth()+1)+'-'+(cur.getDate()+2))
    }

    //实例化日历组件
    var calendar = new Calendar({
        startDate:new Date()
    });
    //实例化dialog组件
    var dialog = new Dialog();

    //调用idangerou.s swiper 首页轮播
    new swiper('.swiper-container',{
        loop:true,
        autoplay:4000
    });
    //选择城市区域绑定事件
    var page = $('#index');
    //page.find('.local-city');
    $('.local-city', page).on('click',function(){
        city.show($(this));
    });


    $('.location').on('click',function(){
        console.log(window.navigator.geolocation);
        var geo = window.navigator.geolocation;
        geo.getCurrentPosition(function(data){
            console.log(data);
        });
        $.ajax({
            url:'http://apis.map.qq.com/ws/location/v1/ip?key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp',
            type:'get',
            dataType:'jsonp'
        })
        .done(function(data){
            console.log(data)
        })
    });


    //判断时间是否符合规范
    function checkDate(){
        var dateIn = $('.date-in').text();
        var dateOut = $('.date-out').text();
        if((new Date(dateOut) - new Date(dateIn))/(1000*60*60*24)<0){
            dialog.alert('时间不符合',function(){
                setTimeout(function(){
                    $('.date-in').click();
                },350)
            })
        }
    }
    $('.local-time').on('click',function(){
        calendar.show($('.date-in'),function(){
            checkDate();
        });
    });
    $('.leave-time').on('click',function(){
        calendar.show($('.date-out'),function(){
            checkDate();
        });
    });


    $('.search-btn').on('click',function(){
        var city = $.trim($('.local-city').text()),
            inDate = $.trim($('.date-in').text()),
            outDate = $.trim($('.date-out').text());
        if(city=='' || inDate=='' || outDate == ''){
            alert('请填写完整信息')
        }else{
            var obj={
                city:city,
                inDate:inDate,
                outDate:outDate
            };

            var ls = window.localStorage;
            ls.setItem('search-history',JSON.stringify(obj));

            var url = 'list.html?'+'city='+city+'&indate='+inDate+'&outdate='+outDate

            window.location.href = encodeURI(url);
        }
    })

});