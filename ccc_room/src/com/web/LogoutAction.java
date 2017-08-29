package com.web;



import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.UserInfo;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.AllService;
import com.web.interceptor.AuthenticationInterceptor;

public class LogoutAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String username;
	private HttpSession session = ServletActionContext.getRequest().getSession();
	
	public String execute() throws Exception {
		// ��session��ȡ��user
		UserInfo user = (UserInfo)session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY);
		if(user != null) {
			System.out.print("ע���û� -> " + user.getUsername());
			// ��session��ɾ��user
			//session.removeAttribute(AuthenticationInterceptor.USER_SESSION_KEY);
			// ��������Ա��ɾ��user
			//getAllService().remove_online_people(user.getUsername());
			session.invalidate();
			System.out.println(" -> ע���û��ɹ�");
		}
		// ����ֻ�����
//		getAllService().remove_online_people(getUsername());
//		System.out.println(getUsername() + " -> ע���û��ɹ�");
		
		return SUCCESS;
	}
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public AllService getAllService() {
		return new AllService();
	}

}
