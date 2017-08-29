package com.web;

import java.io.Serializable;

import com.opensymphony.xwork2.ActionSupport;
import com.utils.AllService;
import com.utils.Constants;

public class UsernameVerify extends ActionSupport implements Serializable {
	private String username;
	private int isExist;
	
	public String checkLogin() {
		if(getAllService().isValidUsername(username)) {
			setIsExist(Constants.USER_VALID);	// 用户名存在
		} else {
			setIsExist(Constants.USER_NOT_VALID);	// 可以注册
		}
		return SUCCESS;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getIsExist() {
		return isExist;
	}
	public void setIsExist(int isExist) {
		this.isExist = isExist;
	}
	public AllService getAllService() {
		return new AllService();
	}
	
}
