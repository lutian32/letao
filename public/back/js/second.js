/**
 * Created by Administrator on 2018/3/5.
 */
$(function () {


    //��Ⱦ���������б��Լ���ҳ
    var page = 1;
    var pageSize = 8;

    var render = function () {
        $.ajax({
            type:'GET',
            url:"/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success:function (info) {
                //console.log(info);
                $("tbody").html( template("tpl", info) );

                //��Ⱦ��ҳ
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                });

            }
        })
    };

    render();


    //��ӷ���Ĺ���
    //1. �����ӷ��࣬��ʾģ̬��, ����һ�����������
    $(".btn_add").on("click", function () {
        $("#secondModal").modal("show");


        $.ajax({
            type:'GET',
            url:"/category/queryTopCategoryPaging",
            data: {
                page:1,
                pageSize:100
            },
            success:function (info) {
                console.log(info);

                $(".dropdown-menu").html( template("tpl2",info) );
            }
        });

    });


    //2. ��dropdown-menu�µ����е�
    $(".dropdown-menu").on("click", "a", function () {

        var text = $(this).text();
        $(".dropdown_text").text(text);

        var id = $(this).parent().data("id");

        $("[name='categoryId']").val(id);

        //��categoryId��У��ͨ��
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });


    //3. ��ʼ��ͼƬ�ϴ�
    //3.1 ����js�ļ� ��jquery�� ui.widgt.js ��fileupload��
    //3.2 ׼��һ��input:file���ı���   name��data-url
    //3.3 ��ʼ��  fileupload

    $("#fileupload").fileupload({
        dataType: 'json',
        //ͼƬ�ϴ������󣬻���õĻص�����
        done:function (e, data) {
            //�ϴ����ͼƬ��ַ
            var pic = data.result.picAddr;

            //��ʾ����
            $(".img_box img").attr("src", pic);

            //��hidden����һ��value
            $("[name='brandLogo']").val(pic);

            //��brandLogoУ��ɹ�
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });



    //4. ��У�鹦��
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
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'��ѡ��һ������'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'������Ʒ�Ƶ�����'
                    }
                }
            },
            brandLogo: {
                validators:{
                    notEmpty:{
                        message:'���ϴ�Ʒ�Ƶ�ͼƬ'
                    }
                }
            }
        },
        excluded:[]
    });


    //5. ��Ӷ�������
    $form.on("success.form.bv", function (e) {
        e.preventDefault();


        $.ajax({
            type:'POST',
            url:"/category/addSecondCategory",
            data: $form.serialize(),
            success:function (info) {
                if(info.success) {
                    //�ر�ģ̬��
                    $("#secondModal").modal("hide");
                    //������Ⱦ��һҳ
                    page = 1;
                    render();

                    //������ʽ
                    $form.data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("��ѡ��һ������");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        })
    })
});