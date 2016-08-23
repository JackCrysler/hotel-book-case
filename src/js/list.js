define(['jquery','template','js/util','tpl/listTpl'],function($,tpl,util,tplFile){
    if(location.href.indexOf('list.html')== -1) return;
    var listDom = $('.hotel-lists');

    var render = tpl.compile(tplFile.tpl);
    var tempData = null;
    util.startLoading(listDom[0]);
    $.when($.ajax('../data/hotel.json'))
    .then(function(data){
        var html = render(data.result);
        tempData = data.result.hotel_list;
        listDom.html(html).trigger('rendered');
    },function(err){
        console.log(err)
    });


    var urlData = util.getUrlParam();
    var tmpInDate = urlData.indate.split('-'),
        tmpOutDate = urlData.outdate.split('-');
    $('.in-date').html('入住：'+tmpInDate[1]+'月'+tmpInDate[2]+'日');
    $('.out-date').html('离店：'+tmpOutDate[1]+'月'+tmpOutDate[2]+'日');

    //底部导航
    var screenDom = $('.screen');
    $('.footer').on('click','span',function(){
        screenDom.show();
        var ml = $('body')[0].querySelector('.mask-layer');
        if(!ml){
            var dom = document.createElement('div');
            dom.setAttribute('class','mask-layer');
            $('body')[0].appendChild(dom);
        }else{
            $(ml).show();
        }

        if($(this).hasClass('high')){
            $(this).removeClass('high');
            screenDom.hide();
            $(ml).hide();
        }else{
            $(this).addClass('high').siblings().removeClass('high');
        }

        var idx = $(this).index();
        var width = screenDom.width();
        var screenWrapper = $('.screen-wrapper',screenDom);
        screenWrapper.css('margin-left',-idx*width+'px');
    });

    //排序、筛选功能
    //获取所有列表
    var listArr = [];
    listDom.on('rendered',function(){
        tempData.sort(function(a,b){
            if(a.distance>b.distance){
                return 1
            }else if(a.distance<b.distance){
                return -1
            }else{
                return 0
            }
        });


        /*var allLists = $('.hotel-lists dl');
        allLists.each(function(i,v){
            var listObj = {};
            listObj['dom']= v;
            listObj['distance'] = $(v).attr('distance');
            listArr.push(listObj)
        });

        listArr.sort(function(a,b){
             if(Number(a.distance)>Number(b.distance)){
                 return 1
             }else if(Number(a.distance)<Number(b.distance)){
                 return -1
             }else{
                 return 0
             }
        });
*/
    });


//实现距离排序的功能
    $('.distance',screenDom).on('click','span',function(){
        if($(this).hasClass('checked')){
            $(this).parent().siblings().find('.checkbox').removeClass('checked');
        }else{
            $(this).addClass('checked').parent().siblings().find('.checkbox').removeClass('checked');

            if($(this).prev().text() == '由远到近'){
                listDom.html(render({hotel_list:tempData.reverse()}));
                tempData.reverse();
            }else{
                listDom.html(render({hotel_list:tempData}));
            }

        }
    });


//range 区域功能
    $('.range',screenDom).on('click','span',screenCheck);
    $('.price',screenDom).on('click','span',screenCheck);
    $('.brand',screenDom).on('click','span',screenCheck);

    function screenCheck(){
        if($(this).prev().hasClass('no-limit')){
            $(this).addClass('checked').parent().siblings().find('.checkbox').removeClass('checked');
        } else{
            $(this).parents('.screen-child').find('.no-limit').next().removeClass('checked');
            if($(this).hasClass('checked')){
                $(this).removeClass('checked');
            }else{
                $(this).addClass('checked');
            }
        }
        var str='';
        $(this).parents('.range').find('.checked').each(function(i,v){
            //str += $(this).parent().attr('stars') + ' ';
            //[stars="二星"],[stars="三星"]
            if($(this).parent().attr('stars') == 0){
                str='[stars],'
            }else{
                str += '[stars="'+$(this).parent().attr('stars')+'"],'
            }
        });

        filter(str.substr(0,str.length-1));
    }

    function filter(str){
        console.log(str);
        var dls = $('.hotel-lists dl').show();
        dls.not(str).hide()
    }


    //列表区域滚动事件的帧听
    listDom.on('scroll',function(){
        var scrHeight = $(this).scrollTop();
        var winHeight = $(this).height();
        var docHeight = $(this).children().height()*$(this).children().length
        //console.log(scrHeight+","+winHeight+","+docHeight);
        if(scrHeight>docHeight-30){
            console.log('到底了');
            //ajax('')
        }
    });


    //跳转到详情页
    listDom.on('click','dl',function(){
        var _id = $(this).attr('h_id');
        location.href = 'detail.html?'+'hotel_id='+_id;
    })
});