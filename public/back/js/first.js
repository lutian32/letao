/**
 * Created by Administrator on 2018/3/5.
 */
$(function () {

    //��Ⱦ�б����ҳ
    var page = 1;
    var pageSize = 5;

    //��Ⱦ����
    var render = function () {
        $.ajax({
            type: "GET",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var html = template("tpl", info);
                $("tbody").html(html);

                //��Ⱦ��ҳ
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        //���õ�ǰ
                        page = p;
                        //������Ⱦ
                        render();
                    }
                });
            }
        })
    }

    render();



    //��ӷ��๦��
    $(".btn_add").on("click", function () {
        $("#firstModal").modal("show");
    });



    //��ʼ����У��
    var $form = $("form");
    $form.bootstrapValidator({

        //Сͼ��
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //У�����
        fields:{
            categoryName: {
                validators:{
                    notEmpty:{
                        message:'һ����������Ʋ���Ϊ��'
                    }
                }
            }
        }

    });


    //����ע��У��ɹ����¼�
    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            type:"POST",
            url:"/category/addTopCategory",
            data: $form.serialize(),
            success:function (info) {

                if(info.success) {
                    //�ر�ģ̬��
                    $("#firstModal").modal("hide");

                    //���ñ�����ʽ������
                    $form.data("bootstrapValidator").resetForm(true);

                    //������Ⱦ��һҳ
                    page = 1;
                    render();
                }

            }
        });
    })

});