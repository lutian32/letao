/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){

    //初始化 swiper轮播图
    function swiperInit(){
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay:{
                delay:2000
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination'
            }
        });
    }

    //渲染函数封装
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetail',
            data:{id:productId},
            success:function(info){
                console.log(info);
                $('.mui-scroll').html( template('tpl',info) );
                swiperInit();
                mui('.mui-numbox').numbox();
                var minNum = info.size.split('-')[0];
                var maxNum = info.size.split('-')[1];

                var str = "尺码：";
                for( var i = minNum ; i <= maxNum ; i++){
                    str += '<span>'+i+'</span>  ';
                }
                $('.size').html(str);
            }
        });
    }

    var productId = getSearch('productId');
    render();
});