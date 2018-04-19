<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>深圳市协勤实业有限公司-电子元器件供应链管理平台</title>
<link href="/page/login/main.css" rel="stylesheet" type="text/css">
<link href="/page/login/mainLayout.css" rel="stylesheet" type="text/css">

<style>
body {margin:0;padding:0;background:#ffffff;}
#reportSearch{height:13px; width:13px; margin:0px;padding:0px;}
@media print{
body {margin:0;padding:0;}
#headerLogin,#main_copyright_div,#subMenu,hr.subMenuLine{display:none}
}
#loginInput{margin:-40px 0 20px -128px;}
</style>
</head>
<body>

<!-- 登陆页面 -->
<div id="loginWindow" "="">
	<div id="headerLogin">
		<div class="clear"></div>
	</div>
	<div id="logo_main">
		<img src="/page/login/images/logo_holdscm.jpg" height="57" width="188">
	</div>
	<div id="logo"><img src="/page/login/images/logo_xieqin_scm.jpg"></div>
	<div id="loginInput">
		<div id="loginContent">
			<div id="errorPromote" class="red">&nbsp;${errormsg }</div>
			<form id="formLogin" method="post" action="loginok.do">
		
					<table>
						<tbody><tr>
							<td align="right"><label class="login">账号:</label></td>
							<td><input name="username" id="username" redisplay="false" autocomplete="off" class="text3XL" type="text" align="left"><label id="fortxtUserID" class="red"></label></td>
						</tr>
						<tr>
							<td align="right"> <label class="login">密码:</label></td>
							<td><input name="password" id="password" redisplay="false" autocomplete="off" class="text3XL" type="password" align="left"><label id="fortxtPassword" class="red"></label></td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>
									<input class="submitInput" value="提交" id="btnLogin" type="submit">
									<input class="submitInput" value="重置" type="reset">
							</td>
						</tr>
				 </tbody></table>
			  </form>
		</div>
		
	</div>
</div>
<div class="clear"></div><hr>	
<div id="main_copyright_div"><label>Copyright 2000-2017 holdscm.com All rights reserved.</label></div>


</body></html>