/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
    //��ʼ�� swiper�ֲ�ͼ
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay:{
            delay:2000
        },
        // �����Ҫ��ҳ��
        pagination: {
            el: '.swiper-pagination',
        }
    });

    //��ʼ�� mui�������
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });
});