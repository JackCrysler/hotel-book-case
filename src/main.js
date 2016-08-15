require.config({
    paths:{
        'jquery':'lib/jquery',
        'swiper':'lib/swiper',
        'fastclick':'lib/fastclick'
    }
});

require(['fastclick','js/index'],function(FastClick,index){
    FastClick.attach(document.body,{});
});