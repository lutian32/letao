/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){

    //��Ⱦһ������
    $.ajax({
       type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            $('.first').html(template('tmpFirst',info));

            secondRender(info.rows[0].id);
        }
    });

    //��Ⱦ��������
    function secondRender(id){
        $.ajax({
            type:'get',
            data:{id:id},
            url:'/category/querySecondCategory',
            success:function(info){
                $('.second').html(template('tmpSecond',info));
            }
        });
    }

    //�¼�ί�� һ������ĵ���¼�
    $('.first').on('click','li',function(){
        //now�����������
        $(this).addClass("now").siblings().removeClass("now");

        //��ȡһ������id ������Ӧ�����������Ⱦ
        var id = $(this).data('id');
        secondRender(id);
        //������������µ�0��0��λ��
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);

    })

});

