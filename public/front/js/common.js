/**
 * Created by Administrator on 2018/3/5.
 */


    //��ʼ�� mui�������
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });


    //��װ���� ��ȡ��ַ���д��ݵĲ������ɶ���
    function getSearch(key) {

        //1. ��ȡ������
        var search = location.search;

        //2. �Բ����б���н���
        search = decodeURI(search);

        //3. ȥ��?
        search = search.slice(1);

        //4. ���ַ�������&�и������
        var arr = search.split("&");

        //5. ��������
        var obj = {};
        arr.forEach(function(element, index){

            var k = element.split("=")[0];
            var v = element.split("=")[1];

            obj[k] = v;
        });

        return obj[key];
    }
