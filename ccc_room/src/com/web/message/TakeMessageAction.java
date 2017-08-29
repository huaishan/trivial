package com.web.message;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.Message;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.*;

public class TakeMessageAction extends ActionSupport implements Serializable {
	private static final long serialVersionUID = 1L;
	private String token;
	private long currentLastMessageId;
	private List<Message> mlist;
	private List<Long> messageIds = new ArrayList<Long>();
	private List<String> userNames = new ArrayList<String>();
	private List<String> times = new ArrayList<String>();
	private List<String> messages = new ArrayList<String>();
	private HttpSession session = ServletActionContext.getRequest().getSession();
	
	public synchronized String takeNewMessage() {
		//System.out.println("session.getAttribute('lastMsgId'): " + session.getAttribute("lastMsgId"));
		if(session.getAttribute("lastMsgId") == null) {
			session.setAttribute("lastMsgId", getAllService().take_last_messageID());
		}
		mlist = getAllService().eliminatePersonal((Long) session.getAttribute("lastMsgId"));
		if(getMlist().isEmpty()) {
			setToken(Constants.TAKE_FAILURE);
		} else {
			setToken(Constants.TAKE_SUCCESS);
		}
		
		for(Message msg : mlist) {
			// Timestamp转换为String
			SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");//定义格式，不显示毫秒
			Timestamp now = msg.getMessageTime();
			String str = df.format(now);	
			
			messageIds.add(msg.getMessageId());
			userNames.add(msg.getUsername());
			times.add(str);
			messages.add(msg.getMessage());
			session.setAttribute("lastMsgId", msg.getMessageId());
		}
		return SUCCESS;
	}
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public long getCurrentLastMessageId() {
		return currentLastMessageId;
	}

	public void setCurrentLastMessageId(long currentLastMessageId) {
		this.currentLastMessageId = currentLastMessageId;
	}

	public List<Message> getMlist() {
		return mlist;
	}

	public void setMlist(List<Message> mlist) {
		this.mlist = mlist;
	}

	public List<Long> getMessageIds() {
		return messageIds;
	}

	public void setMessageIds(List<Long> messageIds) {
		this.messageIds = messageIds;
	}

	public List<String> getUserNames() {
		return userNames;
	}

	public void setUserNames(List<String> userNames) {
		this.userNames = userNames;
	}

	public List<String> getTimes() {
		return times;
	}

	public void setTimes(List<String> times) {
		this.times = times;
	}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}

	public AllService getAllService() {
		return new AllService();
	}
	
	
}
