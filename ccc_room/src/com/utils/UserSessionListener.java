package com.utils;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.struts2.ServletActionContext;

import com.dao.UserInfo;
import com.web.interceptor.AuthenticationInterceptor;

public class UserSessionListener implements HttpSessionListener {
	private ServletContext application = null;
	private String name;

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println("session Destroyed.");
		HttpSession session = arg0.getSession();
		application = session.getServletContext();
		if(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY) != null) {
			name = ((UserInfo) session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY)).getUsername();
			System.out.println(name);
			remove_online_people(name);
			System.out.println(" -> ×¢Ïú³É¹¦");
		}
	}
	
	private void replaceApplication(String attribute, List<String> online_people) {
		application.removeAttribute(attribute);
		application.setAttribute(attribute, online_people);
	}
	
	@SuppressWarnings("unchecked")
	public void remove_online_people(String tusername) {
		String username = tusername.trim();
		List<String> online_people = new ArrayList<String>();
		online_people = (List<String>) application.getAttribute("online_people");
		if(online_people.contains(username)) {
			online_people.remove(username);
			replaceApplication("online_people", online_people);
		} else {
			System.out.println("É¾³ýÊ§°Ü");	// ²âÊÔ
		}
	}

}
