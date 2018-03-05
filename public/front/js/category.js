/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){

    //渲染一级分类
    $.ajax({
       type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            $('.first').html(template('tmpFirst',info));

            secondRender(info.rows[0].id);
        }
    });

    //渲染二级分类
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

    //事件委托 一级分类的点击事件
    $('.first').on('click','li',function(){
        //now类的排他代码
        $(this).addClass("now").siblings().removeClass("now");

        //获取一级分类id 进行相应二级分类的渲染
        var id = $(this).data('id');
        secondRender(id);
        //让区域滚动重新到0，0的位置
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);

    })

});

