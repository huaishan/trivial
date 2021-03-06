package com.utils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;


import org.apache.struts2.ServletActionContext;
import org.hibernate.Transaction;

import com.dao.*;
import com.web.interceptor.AuthenticationInterceptor;

@SuppressWarnings("unchecked")
public class AllService {
	
/*------------------------------------------------------
 * 登录注册所需
 * -----------------------------------------------------*/	
	public UserInfo isValidUser(String username, String password) {
		UserInfoDAO userdao = new UserInfoDAO();
		
		List<UserInfo> ulist = userdao.findByUsername(username);
		if(!ulist.isEmpty() && ulist.get(0).getPassword().equals(password)) {
			return ulist.get(0);
		}
		return null;
	}
	public boolean saveUser(UserInfo uinfo) {
		UserInfoDAO userdao = new UserInfoDAO();
		List<UserInfo> ulist = userdao.findByUsername(uinfo.getUsername());
		if(ulist.isEmpty()) {
			userdao.save(uinfo);
			Transaction tr2 = HibernateSessionFactory.getSession().beginTransaction();
			tr2.commit();
			return true;
		}
		return false;
	}
	public boolean isValidUsername(String username) {
		UserInfoDAO userdao = new UserInfoDAO();
		List<UserInfo> ulist = userdao.findByUsername(username);
		if(ulist.isEmpty()) {
			return false;
		}
		return true;
	}
	
/*------------------------------------------------------
 * 记录在线用户所需
 * -----------------------------------------------------*/	
	private static ServletContext application = ServletActionContext.getRequest().getSession().getServletContext();
	private List<String> online_people = new ArrayList<String>();	
	
	private void replaceApplication(String attribute, List<String> online_people) {
		application.removeAttribute(attribute);
		application.setAttribute(attribute, online_people);
	}
	
	public synchronized boolean set_online_people(String tusername) {	// 此函数设置为同步，避免同时登录同一帐号导致的帐号多处在线问题
		String username = tusername.trim();
		if(application.getAttribute("online_people") == null) {
			online_people.add(username);
			application.setAttribute("online_people", online_people);
		} else {
			online_people = (List<String>) application.getAttribute("online_people");
			if(online_people.contains(username)) {
				return false;
			} else {
				online_people.add(username);
				replaceApplication("online_people", online_people);
			}
		}
		return true;
	}
	public List<String> get_online_people() {
		return (List<String>) application.getAttribute("online_people");
	}
	public void remove_online_people(String tusername) {
		String username = tusername.trim();
		List<String> online_people = new ArrayList<String>();
		online_people = (List<String>) application.getAttribute("online_people");
		if(online_people.contains(username)) {
			online_people.remove(username);
			replaceApplication("online_people", online_people);
		} else {
			System.out.println("删除失败");	// 测试
		}
	}
	
/*------------------------------------------------------
 * 聊天信息所需
 * -----------------------------------------------------*/	
	private HttpSession session = ServletActionContext.getRequest().getSession(); 
	public boolean AddMessage(String msg) {
		UserInfo user = (UserInfo)session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY);
		if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) == null) {
			return false;
		}
		if(msg.trim().equals("")) {
			return false;
		}
		Message message = new Message();
		MessageDAO msgdao = new MessageDAO();
		UserInfoDAO udao = new UserInfoDAO();
		List<UserInfo> ulist = udao.findByUsername(user.getUsername());
		message.setMessage(msg);
		message.setMessageTime(new Timestamp(new Date().getTime()));
		message.setUsername(user.getUsername());
		message.setUserId(ulist.get(0).getUserId());
		System.out.println(message.getUserId() + " " + message.getUsername() + " " + message.getMessageTime() + " " + message.getMessage());
		
		msgdao.save(message);
		Transaction tr2 = HibernateSessionFactory.getSession().beginTransaction();
		tr2.commit();
		
		return true;
	}
	
	public long getThisMessageId(String message) {
		MessageDAO mdao = new MessageDAO();
		List<Message> mlist = new ArrayList<Message>();
		Message msg = new Message();
		mlist = mdao.findByMessage(message);
		msg = mlist.get(mlist.size()-1);	// 获取最新插入的，也就是查找到的最后一条记录
		return msg.getMessageId();
	}
	public Long take_last_messageID() {
		MessageDAO mdao = new MessageDAO();
		
		return mdao.getMaxMessageId();
	}
	public List<Message> NewMessages(Long lastId) {
		MessageDAO mdao = new MessageDAO();
		List<Message> result = new ArrayList<Message>();
		Message msg = new Message();
		
		lastId += 1;
		while((msg = mdao.findById(lastId)) != null) {
			result.add(msg);
			lastId++;
		}
		return result;
	}
	public List<Message> eliminatePersonal(Long lastId) {	// 剔除本人的消息
		//UserInfo user = (UserInfo)session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY);
		List<Message> mlist = NewMessages(lastId);
//		for(Message msg : mlist) {
//			if(msg.getUserId().equals(user.getUserId())) {
//				mlist.remove(msg);
//			}
//		}
		return mlist;
	}
	
}
