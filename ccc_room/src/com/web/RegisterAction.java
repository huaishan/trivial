package com.web;

import java.util.Random;

import com.dao.UserInfo;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.AllService;

public class RegisterAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String usernamesignup;
	private String emailsignup;
	private String passwordsignup;
	private String passwordsignup_confirm;
	
	public String execute() {
		UserInfo user = new UserInfo();
		user.setUsername(getUsernamesignup());
		user.setPassword(getPasswordsignup());
		user.setEmail(getEmailsignup());
		if(getAllService().saveUser(user))
			return SUCCESS;
		return INPUT;
	}
	
	public String getUsernamesignup() {
		return usernamesignup;
	}

	public void setUsernamesignup(String usernamesignup) {
		this.usernamesignup = usernamesignup;
	}

	public String getEmailsignup() {
		return emailsignup;
	}

	public void setEmailsignup(String emailsignup) {
		this.emailsignup = emailsignup;
	}

	public String getPasswordsignup() {
		return passwordsignup;
	}

	public void setPasswordsignup(String passwordsignup) {
		this.passwordsignup = passwordsignup;
	}

	public String getPasswordsignup_confirm() {
		return passwordsignup_confirm;
	}

	public void setPasswordsignup_confirm(String passwordsignup_confirm) {
		this.passwordsignup_confirm = passwordsignup_confirm;
	}

	public void validate() {
		if ( getPasswordsignup().length() == 0 ){			
			addFieldError( "passwordsignup", getText("password.required") );
		}
		if ( getUsernamesignup().length() == 0 ){			
			addFieldError( "usernamesignup", getText("username.required") );
		}
		if ( getEmailsignup().length() == 0 ){
			addFieldError( "emailsignup", getText("Email.required") );
		}
		if ( !getPasswordsignup().equals(getPasswordsignup_confirm()) ) {
			addFieldError( "passwordsignup_confirm", getText("passwordsignup_confirm.required"));
		}
	}
	
	public AllService getAllService() {
		return new AllService();
	}
	
}
