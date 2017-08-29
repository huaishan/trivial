package com.dao;

/**
 * UserInfo entity. @author MyEclipse Persistence Tools
 */
public class UserInfo extends AbstractUserInfo implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public UserInfo() {
	}

	/** minimal constructor */
	public UserInfo(Long userId) {
		super(userId);
	}

	/** full constructor */
	public UserInfo(Long userId, String username, String email, String password) {
		super(userId, username, email, password);
	}

}
