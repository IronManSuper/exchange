/**
 * Created by Administrator on 2016/12/16.
 */

$(document).ready(function () {
    var windHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var panelAlert=$('#panelAlert');
    var hintMessage=$('#hintMessage');
    var submitForm=$('#submit-form');
    panelAlert.css('line-height',windHeight+'px');
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    var time = 60;
    submitForm.on('tap',submitMessage);

    function submitMessage(e) {
        e.preventDefault();
        e.stopPropagation();
        var phone = $('#phone').val().trim();
        var code = $('#code').val().trim();
        if (phone != '' && code != '') {
            if (mobile.test(phone) && phone.length == 11) {
                submitForm.off('tap',submitMessage).css('background-color','#B8B8B8');
                var interval = setInterval(function () {
                    //submitForm.html('立即兑换'+(time--) + ' s');
                    if (time == 0) {
                        clearInterval(interval);
                        time = 60;
                        submitForm.on('tap', submitMessage);
                    }
                }, 1000);
                $.ajax({
                    type: 'post',
                    url: 'http://rf.mmang.com.cn/raffle/Raffle',
                    data: {'phone':phone,'code':code},
                    dataType: 'json',
                    timeout:1000,
                    success: function (data) {
                        if(data.Status=='success'){
                            switch(data.PrizeNo){
                                case 1:
                                    hintMessage.append('<img src="./images/tc-success.jpg"/>');
                                    break;
                                case 2:
                                    hintMessage.append('<img src="./images/1217-success.jpg"/>');
                                    break;
                                case 3:
                                    hintMessage.append('<img src="./images/zs-success.jpg"/>');
                                    break;
                            }
                            panelAlert.animate({
                                '-webkit-transform':'scale(1)',
                                '-moz-transform':'scale(1)',
                                '-ms-transform':'scale(1)',
                                '-o-transform':'scale(1)',
                                'transform': 'scale(1)'
                            },200,function(){
                                time=60;
                                clearInterval(interval);
                                submitForm.on('tap',submitMessage).removeAttr("style");
                            });
                        }else{
                            hintMessage.append('<em class="context">'+data.Message+'</em>');
                            panelAlert.animate({
                                '-webkit-transform':'scale(1)',
                                '-moz-transform':'scale(1)',
                                '-ms-transform':'scale(1)',
                                '-o-transform':'scale(1)',
                                'transform': 'scale(1)'
                            },200,function(){
                                time=60;
                                clearInterval(interval);
                                submitForm.on('tap',submitMessage).removeAttr("style");
                            });
                        }
                    },
                    complete:function(XMLHttpRequest,status){
                        if(status=='timeout'){
                            hintMessage.append('<em class="context">服务器请求超时</em>');
                            panelAlert.animate({
                                '-webkit-transform':'scale(1)',
                                '-moz-transform':'scale(1)',
                                '-ms-transform':'scale(1)',
                                '-o-transform':'scale(1)',
                                'transform': 'scale(1)'
                            },200,function(){
                                time=60;
                                clearInterval(interval);
                                submitForm.on('tap',submitMessage).removeAttr("style");
                            });
                        }
                    },
                    error: function () {
                        return false;
                    }
                });
            } else {
                hintMessage.append('<em class="context">请输入正确的手机号</em>');
                panelAlert.animate({
                    '-webkit-transform':'scale(1)',
                    '-moz-transform':'scale(1)',
                    '-ms-transform':'scale(1)',
                    '-o-transform':'scale(1)',
                    'transform': 'scale(1)'
                },200,function(){});
                return;
            }
        } else {
            hintMessage.append('<em class="context">请输入手机号或兑换码</em>');
            panelAlert.animate({
                '-webkit-transform':'scale(1)',
                '-moz-transform':'scale(1)',
                '-ms-transform':'scale(1)',
                '-o-transform':'scale(1)',
                'transform': 'scale(1)'
            },200,function(){});
            return;
        }
    }

    $('#gainExchange').on('tap', gainExchange);

    function gainExchange(e) {
        e.preventDefault();
        /*e.stopPropagation();*/
        var self = $(this);
        var phone = $('#phone').val();
        if (mobile.test(phone) && phone.length == 11) {
            self.off('tap');
            $.ajax({
                type: 'post',
                url: 'http://rf.mmang.com.cn/raffle/getcode',
                data: 'phone=' + phone,
                dataType: 'json',
                timeout:1000,
                success: function (data) {
                    console.log(data);
                    if(data.Status=='success'){
                        hintMessage.append('<em class="context">'+data.Message+'</em>');
                        panelAlert.animate({
                            '-webkit-transform':'scale(1)',
                            '-moz-transform':'scale(1)',
                            '-ms-transform':'scale(1)',
                            '-o-transform':'scale(1)',
                            'transform': 'scale(1)'
                        },200,function(){

                        });
                    }else{
                        hintMessage.append('<em class="context">'+data.Message+'</em>');
                        panelAlert.animate({
                            '-webkit-transform':'scale(1)',
                            '-moz-transform':'scale(1)',
                            '-ms-transform':'scale(1)',
                            '-o-transform':'scale(1)',
                            'transform': 'scale(1)'
                        },200,function(){});
                    }
                },
                complete:function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        hintMessage.append('<em class="context">服务器请求超时</em>');
                        panelAlert.animate({
                            '-webkit-transform':'scale(1)',
                            '-moz-transform':'scale(1)',
                            '-ms-transform':'scale(1)',
                            '-o-transform':'scale(1)',
                            'transform': 'scale(1)'
                        },200,function(){});
                    }
                },
                error: function () {
                    return false;
                }
            });
            var interval = setInterval(function () {
                self.html((time--) + ' s');
                if (time == 0) {
                    clearInterval(interval);
                    time = 60;
                    self.html('获取兑换码');
                    self.on('tap', gainExchange);
                }
            }, 1000);
        } else {
            hintMessage.append('<em class="context">请输入正确的手机号</em>');
            panelAlert.animate({
                '-webkit-transform':'scale(1)',
                '-moz-transform':'scale(1)',
                '-ms-transform':'scale(1)',
                '-o-transform':'scale(1)',
                'transform': 'scale(1)'
            },200,function(){

            });
        }
    }


    $('#cleanPanel').on('tap',function(e){
        e.preventDefault();
        e.stopPropagation();
        panelAlert.animate({
            '-webkit-transform':'scale(0)',
            '-moz-transform':'scale(0)',
            '-ms-transform':'scale(0)',
            '-o-transform':'scale(0)',
            'transform': 'scale(0)'
        },200,function(){
            hintMessage.empty();
        });/*hide(100);*/
    })
});

