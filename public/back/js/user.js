/**
 * Created by Administrator on 2018/3/5.
 */

$(function () {

    //����ajax���󣬻�ȡ�û����ݣ���Ⱦ��ҳ����
    var page = 1;
    var pageSize = 8;

    function render() {
        $.ajax({
            type:'GET',
            url:'/user/queryUser',
            data: {
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                //console.log(info);

                //3. ׼�����ݣ���ȡ��������info��
                //4. ģ�� + ���� = html�ṹ  ��ģ��������
                //��һ��������ģ��id   �ڶ�����������
                //��ģ��������֮����ģ���п���ֱ��ʹ�ö�����������ԡ�
                var html = template("tpl", info);
                //5. ��Ⱦ����
                $("tbody").html(html);


                //6. ��Ⱦ��ҳ
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, //���ʹ����bootstrap3�汾������ָ��
                    currentPage: page,  //���õ�ǰҳ
                    totalPages: Math.ceil(info.total/info.size),//������ҳ��
                    numberOfPages:5,// ������ʾ����ҳ
                    //��ҳ�뱻�����ʱ�򴥷�
                    onPageClicked: function (a,b,c,p) {
                        //�޸�һ��page��ֵ
                        page = p;
                        //������Ⱦ
                        render();
                    }

                });

            }
        })
    }

    render();



    //���ý����û�
    $("tbody").on("click",".btn", function () {

        //��ʾģ̬��
        $("#userModal").modal("show");

        //��ȡ������İ�ť���ڵ��û���id
        var id = $(this).parent().data("id");

        var isDelete = $(this).hasClass("btn-success")?1:0;

        $(".btn_confirm").off().on("click", function () {

            //����ajax����
            $.ajax({
                type:"POST",
                url:"/user/updateUser",
                data: {
                    id:id,
                    isDelete: isDelete
                },
                success:function (info) {
                    if(info.success) {
                        //�ر�ģ̬��
                        $("#userModal").modal('hide');
                        //������Ⱦ
                        render();
                    }
                }
            });


        });
    });




});