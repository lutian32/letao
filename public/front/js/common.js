/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
    //初始化 swiper轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay:{
            delay:2000
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        }
    });

    //初始化 mui区域滚动
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });
});