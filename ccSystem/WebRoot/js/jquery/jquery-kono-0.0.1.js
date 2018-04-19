$.fn.extend({
    /**
     * kono-name：用于封装参数的name（必）

     * kono-msg：有kono-msg属性表示需要进行非空验证，
     *           kono-msg属性的值为空后的提示语（选），

     *          默认提示语：‘此处不能为空’；
     * 例：<input kono-name="param1" kono-msg="param1不能为空" />
     *
     * @param successCallBack 成功后执行的方法 （必）

     * @param errorCallBack 失败后执行的方法 （选）
     */
    'notEmpty': function (successCallBack, errorCallBack) {
        var flag = true;
        $(this).find("[kono-msg]").each(function () {
            if ($.isEmpty(this.value)) {
                $(this).focus();
                var msg = $.isEmpty($(this).attr("kono-msg")) ? "此处不能为空" : $(this).attr("kono-msg");
                layer.msg(msg, {icon: 0, time: 2000});
                flag = false;
                return false;//用于退出当前each循环
            }
        });
        var param = $(this).getParam();
        flag ? successCallBack(param) : ($.type(errorCallBack) == 'function' ? errorCallBack() : "");
    },
    //多个验证同时提示
    'notEmptyMutli': function (successCallBack, errorCallBack) {
        var flag = true;
        $(this).find("[kono-msg]").each(function () {
            if ($.isEmpty(this.value)) {
                //var msg = $.isEmpty($(this).attr("title")) ? "此处不能为空" : $(this).attr("kono-msg");
                $(this).tooltip('show');
            	$(this).tooltip('hide');
				$(this).css("border-color","red");
                if(flag)
                	flag = false;
            }else
            	$(this).css("border-color","#ccc");
        });
        if(flag){
        	var param = $(this).getParam();
            flag ? successCallBack(param) : ($.type(errorCallBack) == 'function' ? errorCallBack() : "");
        }
    },
    'doSubmit': function(successCallBack, errorCallBack){
        var flag = true;
        $(this).find("[kono-msg]").each(function () {
            if ($.isEmpty(this.value)) {
                $(this).focus().val("");
                var msg = $.isEmpty($(this).attr("kono-msg")) ? "此处不能为空" : $(this).attr("kono-msg");
                layer.msg(msg, {icon: 0, time: 2000});
                flag = false;
                return false;//用于退出当前each循环
            }
        });
        if(flag){
            $(this).find("input[type=number]").each(function(){
                try{
                    parseFloat($(this).val());
                }catch (e){
                    $(this).focus();
                    layer.msg("格式错误", {icon: 0, time: 2000});
                    flag = false;
                    return false;//用于退出当前each循环
                }
            });
        }
        if(flag){
            $(this).find("input[type=number][kono-number]").each(function () {
                var v = $(this).val(), codes = $(this).attr("kono-number"), $ele = $(this);
                if(codes.indexOf(";") < 0){
                    codes += ";";
                }
                if((codes.indexOf("int") >= 0) && !$.isInteger(v)){
                    $ele.focus();
                    layer.msg("必须是整数", {icon: 0, time: 2000});
                    flag = false;
                    return false;//用于退出当前each循环
                }
                var arrayCode = codes.split(";");
                for(var i = 0; i < arrayCode.length; i++){
                    if(arrayCode[i].indexOf("value") >= 0){
                        if(!eval(arrayCode[i].replace("value", v))){
                            $ele.focus();
                            layer.msg(arrayCode[i].replace("value", "值必须"), {icon: 0, time: 2000});
                            flag = false;
                            return false;//用于退出当前for循环
                        }
                    }
                }
                if(!flag){
                    return false;//用于退出当前each循环
                }
            });
        }
        var param = $(this).getParam();
        flag ? successCallBack(param) : ($.type(errorCallBack) == 'function' ? errorCallBack() : "");
    },
    'getParam': function () {
        var param = {};
        $(this).find("[kono-param]").each(function () {
            if ($(this).is(":input")) {
                var type = ($(this).attr("type") + "").toLowerCase();
                if (type == "checkbox" || type == "radio") {
                    $(this).is(":checked") ? param[$(this).attr("name")] = this.value : "";
                } else {
                    param[$(this).attr("name")] = this.value;
                }
            } else {
                param[$(this).attr("name")] = $(this).text();
            }
        });
        return param;
    },
    'setValue': function (data) {
        $(this).find("[name]").each(function () {
            var n = $(this).attr("name"), tagName = this.tagName.toLowerCase(), v;
            v = eval("data." + n);//data.n
            var json = $(this).attr("kono-data");
            try {
                if (!$.isEmpty(json)) {
                    var dataJson = $.parseJSON(json);
                    v = dataJson[v];
                }
            } catch (e) {
            }
            if (tagName == 'input' || tagName == 'select' || tagName == 'textarea') {//select textarea
                var type = ($(this).attr("type") + "").toLowerCase();
                if (type == "checkbox" || type == "radio") {
                    $(this).val() == v ? this.checked = true : this.checked = false;
                } else {
                    $(this).val(v);
                }
            } else {
                $(this).text(v);
            }
        });
    },
    'setOption': function (data) {
        var v = $(this).attr("kono-option-value"), t = $(this).attr("kono-option-text"),
            f = $(this).attr("kono-option-data"), json = {};
        $(this).html("");
        try {
            json = $.parseJSON(f);
        } catch (e) {
        }
        if (!$.isEmpty(data) && data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                json[data[i][v]] = data[i][t];
            }
        }
        for (var key in json) {
            $.isEmpty(key) ? "" : $(this).append('<option value="' + key + '">' + json[key] + '</option>');
        }
    }
});

$.extend({
    'isEmpty': function (v) {
        return (v == '' || v == undefined || v == null || v == 'null');
    },
    'isInteger': function(v){
        return parseInt(v) === parseFloat(v);
    },
    //防止多次请求
    'kono': {
        'submitState': true,
        'post': function(url, paramJson, cb){
            if($.kono.submitState){
                $.kono.submitState = false;
                $.post(url, paramJson, function(data){
                    cb(data);
                    $.kono.submitState = true;
                });
            }
        }
    }
});

