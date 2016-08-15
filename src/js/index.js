define(['jquery','swiper','js/city','js/calendar'],function($,swiper,city,calendar){
    new swiper('.swiper-container',{
        loop:true,
        autoplay:4000
    });


    $('.local-city').on('click',function(){
        city.show($(this));
    });


    //判断时间是否符合规范
    function checkDate(){
        var dateIn = $('.date-in').text();
        var dateOut = $('.date-out').text();
        if((new Date(dateOut) - new Date(dateIn))/(1000*60*60*24)<0){
            alert('时间不符合')
        }
    }
    $('.local-time').on('click',function(){
        calendar.show($('.date-in'),function(){
            checkDate()
        });
    });
    $('.leave-time').on('click',function(){
        calendar.show($('.date-out'),function(){
            checkDate();
        });
    });
});