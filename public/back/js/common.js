/**
 * Created by lt on 2018/3/2.
 */

$(function(){

    //进度环取消
    NProgress.configure({
        showSpinner:false
    });

    //进度条设置
    $(document).ajaxStart(function(){
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        NProgress.done();
    });

    //点击按钮侧边栏隐藏
    $('.icon_menu').on('click',function(){
        $('.lt_main').toggleClass('now');
        $('.lt-aside').toggleClass('now');
    });


    //二级菜单的显示与隐藏
    //思路： 找到二级分类的a标签
    $(".second").prev().on("click", function () {


        //slideToggle
        //fadeToggle
        //toggleClass()
        //toggle()
        $(this).next().slideToggle();

    })

    $(".icon_logout").on("click", function () {
        //显示模态框
        $("#logoutModal").modal("show");

    });

    //不要在事件里面注册事件
    $(".btn_logout").on("click", function () {
        //需要告诉服务器，我需要退出，  让服务器把对应的session销毁

        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            success:function (info) {
                if(info.success) {
                    //退出成功，才跳转到登录页
                    location.href = "login.html";
                }
            }
        })

    });

    //如果不是登录页，发送ajax请求，查询管理员是否登录
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            type:"GET",
            url:"/employee/checkRootLogin",
            success:function (info) {
                //console.log(info);
                //判断，info.error是否是400
                if(info.error === 400) {
                    location.href = "login.html";
                }
            }
        })
    }






});