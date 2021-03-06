package com.web.message;

import java.io.Serializable;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.UserInfo;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.AllService;
import com.utils.Constants;
import com.web.interceptor.AuthenticationInterceptor;

public class SendMessageAction extends ActionSupport implements Serializable {
	private String message;
	private int token;
	private long thisMessageId;
	private String username;
	private HttpSession session = ServletActionContext.getRequest().getSession();
	
	public String execute() throws Exception {
		if(getMessage() != null) {
			if(getAllService().AddMessage(getMessage())) {
				setThisMessageId(getAllService().getThisMessageId(message));
				setToken(Constants.SEND_SUCCESS);
				if((Long)session.getAttribute("lastMsgId") < getThisMessageId()) {
					session.setAttribute("lastMsgId", getThisMessageId());
				}
				setUsername(((UserInfo) session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY)).getUsername());	// ��ӦmessageAjax.js��78��
			} else {
				setToken(Constants.SEND_FAILURE);
			}
		} else {
			setToken(Constants.SEND_FAILURE);
		}
		return SUCCESS;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}
	
	public long getThisMessageId() {
		return thisMessageId;
	}

	public void setThisMessageId(long thisMessageId) {
		this.thisMessageId = thisMessageId;
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
