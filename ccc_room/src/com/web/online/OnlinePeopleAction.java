package com.web.online;

import java.io.Serializable;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.utils.*;

public class OnlinePeopleAction extends ActionSupport implements Serializable  {
	private static final long serialVersionUID = 1L;
	
	private String online;
	private List<String> online_People;
	
	public String getOnlinePeople() {
		if(online.equals(Constants.ONLINE_PEOPLE_TOKEN))
			setOnline_People(getAllService().get_online_people());
		return SUCCESS;
	}

	public List<String> getOnline_People() {
		return online_People;
	}

	public void setOnline_People(List<String> online_People) {
		this.online_People = online_People;
	}
	
	public String getOnline() {
		return online;
	}

	public void setOnline(String online) {
		this.online = online;
	}

	public AllService getAllService() {
		return new AllService();
	}
	
}
