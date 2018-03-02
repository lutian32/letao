/**
 * Created by lt on 2018/3/2.
 */

$(function(){
    NProgress.configure({
        showSpinner:false
    });

    $(document).ajaxStart(function(){
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        NProgress.done();
    })



});