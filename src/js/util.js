define([],function(){
    return {
        transitionEnd:function (){
            var ele = document.createElement('bootstrap');
            var obj = {
                WebkitTransform : 'webkitTransitionEnd',
                MozTransform : 'TransitionEnd',
                MsTransform : 'msTransitionEnd',
                OTransform : 'oTransitionEnd',
                Transform : 'transitionEn'
            };

            for(var i in obj){
                if(ele.style[i] !== undefined ){
                    return obj[i];
                }
            }

        }(),
        inArray : function(target, arr){
            if(typeof target=='object' || typeof target=='function' || typeof target== 'NaN' || typeof target== 'null' || typeof target == 'undefined'){
                return false
            }else{
                for(var i=0; i<arr.length; i++){
                    if(target == arr[i]){
                        return true
                    }
                }
            }
            return false;
        }
    }
});