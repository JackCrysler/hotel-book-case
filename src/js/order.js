define(['jquery','js/slideSelector'],function($,selector){
    if(location.href.indexOf('order.html')== -1) return;

    var select = new selector({
        wrap:'body'
    });

    var result;
    $.when($.ajax('../data/userhistory.json'),{"name":"123"})
    .done(function(data){
        var res = data[0];
        if(res.success){
            result = res.data;
        }else{
            alert('您的网络异常，请稍后再试')
        }
    })
    .fail(function(){});

    var personStr = '<div class="inputs"><p><label>姓名<input type="text" value="name" placeholder="每个房间只需填写一个姓名"></label></p><p><label>证件<input type="number" value="cardNum" placeholder="入住人身份证号/护照号" maxlength="18"></label></p></div>';
    $('.room-count').on('click',function(){
        select.show({
            title:'房价数量',
            init: 2,
            data:[1,2,3,4,5,6,7,8,9],
            callback:function(selected){
                var str='';

                $('.room-num').html(selected.txt);

                for(var i=0; i<selected.txt*1; i++){
                    if(i<result.length){
                        str+=personStr.replace('name',result.personList[i].name)
                            .replace('cardNum',result.personList[i].cardNumber);
                    }else{
                        str+=personStr.replace('name','').replace('cardNum','');
                    }
                }

                $('.persons').html(str);

            }
        })
    });




    $('.room-time').on('click',function(){
        var _this = $(this);
        select.show({
            title:'入住时间',
            data:['19:00','20:00','21:00','22:00'],
            callback:function(data){
                console.log(data);
                _this.find('.room-time').html(data.txt);

            }
        })
    })
});