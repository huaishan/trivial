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
		System.out.print("�û���¼ -> " + getUsername());
		if(u != null) {
			// ��֤��������Ƿ����û���¼
			if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) != null) {
				if(((UserInfo)(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY))).getUsername().equals(username)) {
					getAllService().set_online_people(username);
					System.out.println(" -> ��¼�ɹ� ");
					return SUCCESS;
				}
				addFieldError("BrowserExists", "��������������˻���¼����ע������������������˺Ż����������������¼��");
				System.out.println(" -> ��¼ʧ�� ");
				return ERROR;
			}
			// ��֤�û��Ƿ��Ѿ��ڱ𴦵�¼
			if(!getAllService().set_online_people(username)) {
				// ������ڱ�������ϵ�¼�ľ���ת������ҳ�棨sessionδ���ڵ�����£�
				if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) == null) {
					addFieldError("userelsewhere", "���û����ڱ𴦵�¼�����Ǳ��ˣ�����ԭ��¼��ע�����ٵ��˴���¼��");
					System.out.println(" -> ��¼ʧ�� ");
					return ERROR;
				}
				System.out.println(" -> ��¼�ɹ� ");
				return SUCCESS;
			}
			session.setAttribute(AuthenticationInterceptor.USER_SESSION_KEY, u);
			session.setMaxInactiveInterval(60*1);	// session������������Ϊ1����
			System.out.println(" -> ��¼�ɹ� ");
			System.out.println("lastMessageId -> " + getAllService().take_last_messageID());
			return SUCCESS;
		} else {
			System.out.println(" -> ��¼ʧ�� ");
			addFieldError("username", "�û��������ڣ������������");
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
