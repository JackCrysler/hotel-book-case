define(['jquery','swiper','js/city'],function($,swiper,city){
    new swiper('.swiper-container',{
        loop:true,
        autoplay:4000
    });









    $('.local-city').on('click',function(){
        city.show($(this));
    })

});