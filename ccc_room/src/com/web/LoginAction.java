package com.web;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.*;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.*;
import com.web.interceptor.AuthenticationInterceptor;

public class LoginAction extends ActionSupport {
	private static final long serialVersionUID = 1L;	
	private String username = "";
	private String password = "";
	private HttpSession session = ServletActionContext.getRequest().getSession(); 

	public String execute() {
		UserInfo u = getAllService().isValidUser(getUsername(), getPassword());
		System.out.print("用户登录 -> " + getUsername());
		if(u != null) {
			// 验证浏览器上是否有用户登录
			if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) != null) {
				if(((UserInfo)(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY))).getUsername().equals(username)) {
					getAllService().set_online_people(username);
					System.out.println(" -> 登录成功 ");
					return SUCCESS;
				}
				addFieldError("BrowserExists", "该浏览器上已有账户登录！请注销掉该浏览器上其他账号或者用其他浏览器登录！");
				System.out.println(" -> 登录失败 ");
				return ERROR;
			}
			// 验证用户是否已经在别处登录
			if(!getAllService().set_online_people(username)) {
				// 如果是在本浏览器上登录的就跳转到聊天页面（session未过期的情况下）
				if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) == null) {
					addFieldError("userelsewhere", "此用户已在别处登录！若是本人，请在原登录处注销，再到此处登录！");
					System.out.println(" -> 登录失败 ");
					return ERROR;
				}
				System.out.println(" -> 登录成功 ");
				return SUCCESS;
			}
			session.setAttribute(AuthenticationInterceptor.USER_SESSION_KEY, u);
			session.setMaxInactiveInterval(60*1);	// session生命周期设置为1分钟
			System.out.println(" -> 登录成功 ");
			System.out.println("lastMessageId -> " + getAllService().take_last_messageID());
			return SUCCESS;
		} else {
			System.out.println(" -> 登录失败 ");
			addFieldError("username", "用户名不存在，或者密码错误！");
			return ERROR;
		}
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void validate() {
		if(getUsername().length() == 0) {
			addFieldError("username", getText("username.required"));
		}
		if(getPassword().length() == 0) {
			addFieldError("password", getText("password.required"));
		}
	}
	
	public synchronized AllService getAllService() {
		return new AllService();
	}
	
	
}
