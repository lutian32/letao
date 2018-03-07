/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){

    //  封装商品渲染函数
    function render(){
        //先将商品区内容重置 模拟加载
        $('.product').html('<div class="loading"></div>');

        var obj = {};
        obj.proName = $('.lt-search input').val().trim();
        obj.page = 1;
        obj.pageSize = 100;

        var now = $('.lt-sort li.now');
        if (now.length >= 0){
            var sortName = now.data('type');
            var sortValue = now.find("span").hasClass('fa-angle-down')?2:1;

            obj[sortName] = sortValue;
        }

        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:obj,
            success:function(info){
                setTimeout(function(){
                    $('.product').html( template('tpl',info));
                },2000);
            }
        });
    }

    //  页面首次进入 获取地址参数
    var key = getSearch('key');
    $('.lt-search input').val(key);

    render();

    //点击搜索按钮 重新获取input的value值 进行渲染

    $('.btn-search').on('click',function(){

        //先把所有的排序样式恢复默认
        $(".lt_sort li").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

        render();

        var key = $('.lt-search input').val();

        var arr = JSON.parse(localStorage.getItem('search_list')) || [];

        var index = arr.indexOf(key);

        //判断输入的关键字在历史记录中是否存在，已存在即删除
        if(index != -1){
            arr.splice(index,1);
        }

        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(key);

        localStorage.setItem('search_list',JSON.stringify(arr));

    });

    //给lt-sort下的li注册点击事件
    $('.lt-sort li').on('click',function(){
        if($(this).hasClass('now')){
            $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }else{
            $(this).addClass('now').siblings().removeClass('now');
            $('.lt-sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        render();
    })


});