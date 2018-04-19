<%@ page language="java"  pageEncoding="UTF-8"%>
<script src="/page/js/jquery/jQuery-2.2.0.min.js"></script>
<script src="/page/js/jquery/jQuerySession.js"></script>
<script type="text/javascript" src="/page/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="/page/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap/css/bootstrap-theme.css" />
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-table/bootstrap-table.css" />
<script src="/page/js/bootstrap/js/bootstrap.min.js"></script>
<script src="/page/js/bootstrap-table/bootstrap-table.js"></script>
<script src="/page/js/bootstrap-table/bootstrap-table_CH.js"></script>
<script type="text/javascript" src="/page/comm/common.js"></script>
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-validator/css/bootstrapValidator.min.css" />
<script src="/page/js/bootstrap-validator/js/bootstrapValidator.min.js"></script>
<!--<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-datetimepicker/bootstrap-datetimepicker.css" />
<script src="/page/js/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
--><!--<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-select/bootstrap-select.css" />
<script src="/page/js/bootstrap-select/bootstrap-select.js"></script>
-->
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-editable/css/bootstrap-editable.css" />
<link rel="stylesheet" type="text/css" href="/page/js/bootstrap-ladda/ladda-themeless.css" />
<script src="/page/js/bootstrap-editable/js/bootstrap-editable.js"></script>
<script src="/page/js/bootstrap-editable/js/bootstrap-table-editable.js"></script>
<link rel="stylesheet" type="text/css" href="/page/css/publicFontStyle.css" />
<script src="/page/js/jquery/jquery-kono-0.0.1.js"></script>
<script type="text/javascript" src="http://www.gbtags.com/gb/networks/uploads/44b0c6e7-0395-4825-bff4-5914e6153ee0/js/spin.js"></script>
	<script type="text/javascript" src="http://www.gbtags.com/gb/networks/uploads/44b0c6e7-0395-4825-bff4-5914e6153ee0/js/ladda.js"></script>
<style>
    .myPanel{
        background-color: #ECF0F5;
        height: 100%;
    }
</style>
<script>
    //页面关闭之后执行的方法


    window.onbeforeunload = function(){
        var wn = '<%=request.getParameter("wn")%>';
        if(wn != '' && wn != undefined && wn != null && wn != 'null'){
        	var win = window.open('', wn);
            defaultBeforeUnload(win);
        }
    };

    //获取上一个页面的window对象
    function getWin(callback){
        var wn = '<%=request.getParameter("wn")%>';
        if(wn != '' && wn != undefined && wn != null && wn != 'null'){
            var win = window.open('', wn);
            callback(win);
        }
    }

    //关闭页面执行的方法(默认)，有特殊需求请重写此方法


    function defaultBeforeUnload(win){
        win._main.searchInfo();
    }


    /**
     * 跳转url
     * @param url
     */
    function openUrl(url, wn){
        if(wn == undefined){
            wn = window.name;
        }
        window.open(url + (url.indexOf("?") > 0 ? "&" : "?") + "wn=" + wn);
    }
</script>