define(['js/iSwiper'],function(sw){
    if(location.href.indexOf('detail.html')== -1) return;
    var iswiper;
    $('.pic span').on('click',function(){
        $('.pics').removeClass('none');
        $('.mask-layer').removeClass('none');

        if(typeof iswiper == 'undefined'){

            iswiper = new sw('.iSwiper',{
                callback:function(idx){
                    $('.nav-dots').find('span').removeClass('active')
                        .eq(idx).addClass('active');
                },
                navWrapClass: '.self-dots'
            });
        }
    });

    $('.pics').on('click',function(){
        $('.pics').addClass('none');
        $('.mask-layer').addClass('none');
    });


    $('.nav-dots').on('click','span',function(e){
        e.stopPropagation();
        $(this).addClass('active').siblings().removeClass('active');
        iswiper.moveTo($(this).index());
    })






});