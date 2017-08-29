package com.web.interceptor;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.dao.UserInfo;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;


public class AuthenticationInterceptor implements Interceptor  {

	 private static final long serialVersionUID = 1L;
	 
	 private String message;
	
	 public static final String USER_SESSION_KEY = "UserSessionKey";
	 
	 public void destroy() {}

	 public void init() {}

     public String intercept(ActionInvocation actionInvocation) throws Exception {
		
         Map session = actionInvocation.getInvocationContext().getSession();
		 
         UserInfo user = (UserInfo) session.get(USER_SESSION_KEY);
         
         if (user == null) {
        	 this.setMessage("Î´µÇÂ¼");
             return Action.INPUT;           
         }        
         return actionInvocation.invoke();
    }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}