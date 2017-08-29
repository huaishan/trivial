package com.web.message;

import java.io.Serializable;

import com.opensymphony.xwork2.ActionSupport;
import com.utils.*;

public class TakeLastMessageIDAction extends ActionSupport implements Serializable {
	private static final long serialVersionUID = 1L;
	private String token;
	private long lastMessageId;
	
	public synchronized String takeLastMessageId() {
		if(getToken().equals(Constants.LAST_MESSAGE_ID_TOKEN)) {
			setLastMessageId(getAllService().take_last_messageID());
		}
		return SUCCESS;
	}
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public long getLastMessageId() {
		return lastMessageId;
	}

	public void setLastMessageId(long lastMessageId) {
		this.lastMessageId = lastMessageId;
	}

	public AllService getAllService() {
		return new AllService();
	}
	
	
}
