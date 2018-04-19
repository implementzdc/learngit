package com.cc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

	
	@RequestMapping("/login")
	public void login(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(defaultValue = "") String username,
			@RequestParam(defaultValue = "") String password, Model model)throws Exception {
		
//		if (StringUtils.isBlank(username) || StringUtils.isBlank(password)){
//			throw new Exception("用户名或密码不能为空!");
//		}
		
		
		response.sendRedirect("/main.jsp");
	}
	
}
