package com.dao;

/**
 * AbstractUserInfo entity provides the base persistence definition of the
 * UserInfo entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractUserInfo implements java.io.Serializable {

	// Fields

	private Long userId;
	private String username;
	private String email;
	private String password;

	// Constructors

	/** default constructor */
	public AbstractUserInfo() {
	}

	/** minimal constructor */
	public AbstractUserInfo(Long userId) {
		this.userId = userId;
	}

	/** full constructor */
	public AbstractUserInfo(Long userId, String username, String email,
			String password) {
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	// Property accessors

	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}