/**
 * Created by lt on 2018/3/2.
 */

$(function(){

    //���Ȼ�ȡ��
    NProgress.configure({
        showSpinner:false
    });

    //����������
    $(document).ajaxStart(function(){
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        NProgress.done();
    });

    //�����ť���������
    $('.icon_menu').on('click',function(){
        $('.lt_main').toggleClass('now');
        $('.lt-aside').toggleClass('now');
    });


    //�����˵�����ʾ������
    //˼·�� �ҵ����������a��ǩ
    $(".second").prev().on("click", function () {


        //slideToggle
        //fadeToggle
        //toggleClass()
        //toggle()
        $(this).next().slideToggle();

    })

    $(".icon_logout").on("click", function () {
        //��ʾģ̬��
        $("#logoutModal").modal("show");

    });

    //��Ҫ���¼�����ע���¼�
    $(".btn_logout").on("click", function () {
        //��Ҫ���߷�����������Ҫ�˳���  �÷������Ѷ�Ӧ��session����

        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            success:function (info) {
                if(info.success) {
                    //�˳��ɹ�������ת����¼ҳ
                    location.href = "login.html";
                }
            }
        })

    });






});