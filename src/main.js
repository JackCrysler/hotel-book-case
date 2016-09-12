require.config({
    paths:{
        'jquery':'lib/jquery',
        'swiper':'lib/swiper',
        'fastclick':'lib/fastclick',
        'template':'lib/template-native'
    }
});

require(['fastclick','js/index','js/list','js/detail','js/order'],function(FastClick,index){
    FastClick.attach(document.body,{});
});