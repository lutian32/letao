/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){

    //封装函数 获取localStorage中search_list值
    function getHistory(){
        var arr = JSON.parse(localStorage.getItem('search_list')) || [];
        return arr;
    }

    //封装数据渲染函数
    function render(){

        var arr = getHistory();

        $('.lt-history').html( template('tpl',{arr:arr}) );

    }

    render();

    //清空记录按钮点击事件
    $('.lt-history').on('click','.btn_empty',function(){
        //弹出一个确认框
        mui.confirm("你确定要清空所有的历史记录吗？","温馨提示", ["是", "否"], function (e) {
            //通过e.index就可以知道点击了那个按钮
            if(e.index === 0){
                //删除缓存
                localStorage.removeItem('search_list');

                //重新渲染
                render();
            }

        });
    });


    //点击删除某条记录按钮点击事件
    $('.lt-history').on('click','.btn_delete',function(){
        var index = $(this).data('index');

        var arr = getHistory();

        arr.splice(index,1);

        localStorage.setItem('search_list',JSON.stringify(arr));

        render();
    });


    //搜索按钮点击事件
    $('.btn-search').on('click',function(){
        var key = $('.lt-search input').val().trim();
        $('.lt-search input').val('');

        if(key == ''){
            mui.toast("请输入搜索关键字");
            return;
        }

        var arr = getHistory();

        var index = arr.indexOf(key);

        //判断输入的关键字在历史记录中是否存在，已存在即删除
        if(index != -1){
            arr.slice(index,1);
        }

        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(key);

        localStorage.setItem('search_list',JSON.stringify(arr));

        location.href = "searchList.html?key="+key;

    })










});