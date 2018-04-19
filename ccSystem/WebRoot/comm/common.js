var tbid;
$(function(){
	/**
	 * 
	 * 获取操作按钮
	 * 
	 */
	getoperation();
	
	//回车触发条件查询
    $('#formSearch :input').keydown(function(e){
	if(e.keyCode==13){
	   searchInfo(); //处理事件
	}
	});
  //隐藏弹出时执行一些动作...
    $('#mymodal').on('hidden.bs.modal', function () {
    	try{
    	   if(FormValidation && typeof(FormValidation) == "function"){
    		   $('#formedit').data("bootstrapValidator").resetForm();  //重置表单验证
    	   }
    	  }catch(e){
    		  console.log("方法不存在");		  
    	  }
    	
    	//清除表单元素
    	$("#formedit :input").val('');
    });
	
	
});
//关闭当前页面
function closePanel(){
	window.close();
}
//普通表格
function Inittable(tb,url,clm){
		tbid = tb;
        $(tb).bootstrapTable({
            url: url,         //请求后台的URL（*）
            dataType: "JSON",
            method: 'POST',                      //请求方式（*）
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            clickToSelect: true,                //是否启用点击选中行
            toolbar: '#toolbar',  //工具按钮用哪个容器
            //striped: true, //是否显示行间隔色
            //showRefresh: true,     //刷新
            height: (window.innerHeight * 0.74) < 450 ? 450 : (window.innerHeight * 0.74),   //动态获取高度值，可以使表格自适应页面
            queryParams: queryParams,//传递参数（*）
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求 
            contentType:"application/x-www-form-urlencoded",   //传递参数格式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageList: [8, 10, 15],        //可供选择的每页的行数（*）
            pageSize: 10,                       //每页的记录行数（*）
            pageNumber: 1,
            singleSelect: true,					//复选框只能选择一条记录
            paginationLoop: true,			//分页循环
            columns: clm,
            onClickRow:selectonClick,     //单击行发生
            onLoadSuccess:Controlbutton		//数据加载成功后发生
        });
}
//普通表格（详情,不分页）
function detailstable(tb,url,clm,params){
        $(tb).bootstrapTable({
            url: url,         //请求后台的URL（*）
            dataType: "JSON",
            method: 'POST',                      //请求方式（*）
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            clickToSelect: true,                //是否启用点击选中行
            //striped: true, //是否显示行间隔色
            queryParams: params,//传递参数（*）
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求 
            contentType:"application/x-www-form-urlencoded",   //传递参数格式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageList: [5, 10, 15],        //可供选择的每页的行数（*）
            pageSize: 8,                       //每页的记录行数（*）
            singleSelect: true,					//复选框只能选择一条记录
            pageNumber: 1,
            columns: clm
        });
}
//普通表格（详情,分页）
function detailstablepage(tb,url,clm,params){
        $(tb).bootstrapTable({
            url: url,         //请求后台的URL（*）
            dataType: "JSON",
            method: 'POST',                      //请求方式（*）
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            clickToSelect: true,                //是否启用点击选中行
            //striped: true, //是否显示行间隔色
            queryParams: params,//传递参数（*）
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求 
            contentType:"application/x-www-form-urlencoded",   //传递参数格式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageList: [5, 10, 15],        //可供选择的每页的行数（*）
            pageSize: 10,                       //每页的记录行数（*）
            singleSelect: true,					//复选框只能选择一条记录
            pageNumber: 1,
            columns: clm,
            formatNoMatches: function(){
              return "没有相关的匹配结果";
            },
            formatLoadingMessage: function(){
              return "请稍等，正在加载中。。。";
            },
            onLoadSuccess:function(data){
            	if($showLoading != "undefined"){
	            	$showLoading.css("display","none");
					load.stop();
            	}
            }
        });
}
//普通表格（选择客户）
function cutable(tb,url,clm,params){
        $(tb).bootstrapTable({
            url: url,         //请求后台的URL（*）
            dataType: "JSON",
            method: 'POST',                      //请求方式（*）
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            clickToSelect: true,                //是否启用点击选中行
            //striped: true, //是否显示行间隔色
            queryParams: params,//传递参数（*）
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求 
            contentType:"application/x-www-form-urlencoded",   //传递参数格式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageList: [5, 10, 15],        //可供选择的每页的行数（*）
            pageSize: 8,                       //每页的记录行数（*）
            singleSelect: true,					//复选框只能选择一条记录
            pageNumber: 1,
            columns: clm
        });
}
//可编辑表格
function InittableEidt(tb,url,clm,params,savaurl){
    $(tb).bootstrapTable({
        url: url,         //请求后台的URL（*）
        dataType: "JSON",
        method: 'POST',                      //请求方式（*）
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        //pagination: true,                   //是否显示分页（*）
        //clickToSelect: true,                //是否启用点击选中行
        //toolbar: '#toolbar',  //工具按钮用哪个容器
        //showRefresh: true,
        striped: true, //是否显示行间隔色
        height: (window.innerHeight * 0.74) < 450 ? 450 : (window.innerHeight * 0.74),   //动态获取高度值，可以使表格自适应页面
        queryParams: params,//传递参数（*）
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求 
        contentType:"application/x-www-form-urlencoded",   //传递参数格式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        //pageSize: 8,                       //每页的记录行数（*）
        //pageNumber: 1,
        //singleSelect: true,					//复选框只能选择一条记录
        columns: clm,
        onEditableSave: function (field, row, oldValue, $el) {
            $.ajax({
                type: "post",
                url: savaurl,
                data: row,
                dataType: 'JSON',
                success: function (data, status) {
                    if (status == "success") {
                    	console.log("提交成功");
                    }
                },
                error: function () {
                    alert('编辑失败');
                },
                complete: function () {

                }

            });
        }
    });
}

//加载按钮
function getoperation(){
	$("#toolbar").html('');
	$.ajax({
        type: "post",
        url: "/getsplitMenu.do",
        data: {"menuUrl":$.session.get('menuUrl')},
        dataType: 'html',
        success: function (data) {
        	$("#toolbar").append(data);
        },
        error: function () {
            
        }
    });
};

//选择客户
function getCustomerName(num){
	$("#customername").val('');
	$("#customeraddress").val('');
	$("#whichCu").val(num);
	$('#getculist').modal('show');
	TableCustomer();
	$('#tb_culist').bootstrapTable('refresh');
};
//初始化客户列表
var TableCustomer = function () {
    var oTableInit = new Object();
    //初始化Table
    var clm=[ {
        checkbox: true
		    }, {
		        field: 'id',
		        title: '序号',
		    	formatter:function(value,row,index){ 
		    		return index+1;
		    	}    
		    },
               {
                field: 'name',
                title: '名字'
            }, {
                field: 'type',
                title: '类型'
            }, {
                field: 'id',
                title: 'CUID'
            }, {
                field: 'reserve1',
                title: 'CU-CODE'
            }
            , {
                field: 'address',
                title: '地址'
            }
             ];
    oTableInit.Init = cutable('#tb_culist','/customer/list.do',clm,queryParamsCustomer); 			    
    return oTableInit;   
};
//客户查询参数
var queryParamsCustomer = function (params) {
	 var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		 pageSize: params.limit, //页面大小
		 pageNum: params.offset, //页码
		 name: $("#customername").val(),
		 address: $("#customeraddress").val()
	 };
	 return temp;
};
function queryTbCustomer(){
	$('#tb_culist').bootstrapTable('refresh');
};
//选择客户
function ChoiceCustomer(){
	var a= $('#tb_culist').bootstrapTable('getSelections');
	if(a.length!=1){
		layer.msg("请选择一条数据操作",{icon:1,time:1000});
		return;
	}
	var cuname = a[0].name;
	var cuid = a[0].id;
	var whichCu1 = $("#whichCu").val();
	if(whichCu1 != null && whichCu1 != ''){
		if(whichCu1 == 1){
			$("#cuname").val(cuname);  
			$("#cuid").val(cuid);
		}else if(whichCu1 == 2){
			$("#po_cuname").val(cuname);  
			$("#po_cuid").val(cuid);
		}else if(whichCu1 == 3){
			$("#formSearchcuname").val(cuname);  
			$("#formSearchcuid").val(cuid);
		}else if(whichCu1 == 4){
			$("#formSearchpo_cuname").val(cuname);  
			$("#formSearchpo_cuid").val(cuid);
		}else if(whichCu1 == 5){
			$("#cuname").val(cuname);  
			$("#cuid").val(cuid);
			$.post("/order/getCuCode.do",{cuid:$("#cuid").val()},function(result){
				$("#cucode option").remove();
				list =result.split(","); 
				list.pop()
				for(var i in list){
					$("#cucode").append("<option value='"+list[i]+"'>"+list[i]+"</option>"); 
					}
			})	
			$.post("/order/getServiceRole.do",{cuid:$("#cuid").val()},function(result){
				if(result!=""){
				list =result.split(","); 
				$("#payway").val(list[0])
				$("#recetime").val(list[1])
					}
			})	
		}else if(whichCu1 == 6){
			//根据客户得到供应商
			$("#addInfoCuname").val(cuname);  
			$("#addInfoCuid").val(cuid);
			
			$.ajax({
				type: 'POST',
				url: '/expedm/ifhavesup.do',
				data: { 
					cuid: cuid
				},
				dataType: 'json',
				success: function(data){
					$("#h_veid option").remove();
					if(data.result == "ok"){
						var map = data.map;
						$.each(map,function(i,v){
							$("#h_veid").append("<option value='"+i+"' style=\"width:'150px';\">"+v+"</option>"); 
						});
					}			
				},
			});
			
		}else if(whichCu1 == 7){
			//根据客户得到供应商
			$("#addInfo_Cuname").val(cuname);  
			$("#addInfo_Cuid").val(cuid);
			//alert(cuname+"=="+cuid+"=="+$("#addInfoCuid").val());
			$.ajax({
				type: 'GET',
				url: '/expetm/edit.do',
				dataType: 'json',
				data: { 
					 method: "loadInfo",
					 cuid: cuid
				 },
				success: function(data){
					var s_sendCustIdList = data.SENDCUSTS;//派送方List
					sendCustIdHtml = "<option value='' selected>全部</option>";
					$.each(s_sendCustIdList,function(i,v){
						sendCustIdHtml = sendCustIdHtml + "<option value='"+v.id+"'>"+v.name+"</option>";
					});
					$("#e_sendCustId").html(sendCustIdHtml);
					
					var s_cusList = data.cus;//申报抬头List
					cusHtml = "";
					$.each(s_cusList,function(i,v){
						cusHtml = cusHtml + "<option value='"+v.id+"'>"+v.name+"</option>";
					});
					$("#e_sbtt").html(cusHtml);
					
					/*var s_invtypeList = data.DECLARRISE;//操作模式List
					invtypeHtml = "";
					$.each(s_invtypeList,function(i,v){
						invtypeHtml = invtypeHtml + "<option value='"+v.code+"'>"+v.cname+"</option>";
					});
					$("#e_invtype").html(invtypeHtml);

					var s_cusList = data.cus;//申报抬头List
					cusHtml = "";
					$.each(s_cusList,function(i,v){
						cusHtml = cusHtml + "<option value='"+v.id+"'>"+v.name+"</option>";
					});
					$("#e_sbtt").html(cusHtml);*/
			 	}
			});
		} else if (whichCu1 == 8) {
            $("#add_cuid").val(cuid);
            $("#add_cuname").val(cuname);
            $("#pdmBgttCuid").append('<option value="' + cuid + '">' + cuname + '</option>');
        } else {//其他情况，把whichCu1当作是一个id，进行赋值
            $(whichCu1 + "_cuname").val(cuname);
            $(whichCu1 + "_cuid").val(cuid);
        }
	}
    $('#getculist').modal('hide');
    $("#formCulist :input").val('');
    cuidChange();
    $('#formedit').data("bootstrapValidator").resetForm();  //重置表单验证
};

//选择客户最后发生的事件
function cuidChange() {

}

//通用保存
function sava(url){
	var fields = $("#formedit :input").serializeArray();
	$.ajax({
		type: 'POST',
		url: url,
		data:fields,
		dataType: 'json',
		success: function(data){
			$('#mymodal').modal('hide');
			layer.msg(data.msg,{icon:1,time:1000});
			searchInfo();	//刷新
		},
		error:function(data) {
			console.log(data.msg);
		},
	});	
};


// 通用查询的参数
var queryParams = function (params) {
	var pageNums;
	if(temppage)
		pageNums = 1;
	else
		pageNums = params.offset; 
	temppage = false;
	var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		 pageSize: params.limit, //页面大小
		 pageNum: pageNums //页码
	 };
	 var pas = $("#formSearch :input").serializeArray();
	 for(var i in pas){
		 temp[pas[i].name]=pas[i].value;
	 }
	 return temp;
};
var temppage;
//查询刷新列表
function searchInfo(isNotFirst){
	
	if("" == isNotFirst)
		temppage = true;
    $(tbid).bootstrapTable('refresh');
};
//重置
function formReset(){
	$("#formSearch :input").val('');
	searchInfo();
};
//控制按钮显示
function Controlbutton(){
	var listrow = $(tbid).bootstrapTable('getAllSelections');
	if(listrow.length==1){
		selectonClick(listrow[0]);
	}
};

function selectonClick(row){ //row：点击行的数据
	try{
	   if(Buttondisplay && typeof(Buttondisplay) == "function"){
		   $('#toolbar button').hide();
		   Buttondisplay(row);
	   }
	  }catch(e){
		  console.log("方法不存在");
		  
	  }
};

//打开Excel导入弹窗
function openExcelModel(title){
	$('#Importtitle').text(title);
	$('#ExcelImport').modal('show');
};
//关闭Excel导入弹窗
function closeExcelModel(){
	$("#formImport :input").val('');
	$('#ExcelImport').modal('hide');
};

//Excel导入
function ExcelImport(url){
    var form = new FormData(document.getElementById("formImport"));
    $.ajax({
        url:url,
        type:"post",
        data:form,
        dataType: 'json',
        async: false,
        processData:false,
        contentType:false,
        success:function(data){
    		layer.msg(data.msg,{icon:1,time:1000});
    		closeExcelModel();
        },
        error:function(e){
        	console.log("导入出错");
        }
    });        
};

//打开Excel导入弹窗
function openExcelModel2(title){
	$('#Importtitle2').text(title);
	$('#ExcelImport2').modal('show');
};
//关闭Excel导入弹窗
function closeExcelModel2(){
	$("#formImport2 :input").val('');
	$('#ExcelImport2').modal('hide');
};

//Excel导入
function ExcelImport2(url){
    var form = new FormData(document.getElementById("formImport2"));
    $.ajax({
        url:url,
        type:"post",
        data:form,
        dataType: 'json',
        async: false,
        processData:false,
        contentType:false,
        success:function(data){
    		layer.msg(data.msg,{icon:1,time:1000});
    		closeExcelModel();
        },
        error:function(e){
        	console.log("导入出错");
        }
    });        
};
//获取n天前的时间
function findDate(n) {
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + n);
    var year = date2.getFullYear();
    var month = date2.getMonth() + 1;
    var day = date2.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    var time = year + "-" + month + "-" + day;
    return time;
}
//jQuery扩展方法
$.fn.extend({
    /**
	 * 错误提示框
     * @param title 标题
     * @param msg 内容
     */
    'errorAlert': function(title, msg){
        var _html = '<div class="alert alert-danger">' +
            '            <a href="#" class="close" data-dismiss="alert">&times;</a>' +
            '            <strong></strong><span></span>' +
            '        </div>';
        var $div = $(_html);
        $div.find("strong:first").text(title);
        $div.find("span:first").text(msg);
        $(this).html($div);
    }
});

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}