package com.dao;

import java.sql.Timestamp;

/**
 * AbstractMessage entity provides the base persistence definition of the
 * Message entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractMessage implements java.io.Serializable {

	// Fields

	private Long messageId;
	private Long userId;
	private String username;
	private Timestamp messageTime;
	private String message;

	// Constructors

	/** default constructor */
	public AbstractMessage() {
	}

	/** minimal constructor */
	public AbstractMessage(Long messageId, Long userId) {
		this.messageId = messageId;
		this.userId = userId;
	}

	/** full constructor */
	public AbstractMessage(Long messageId, Long userId, String username,
			Timestamp messageTime, String message) {
		this.messageId = messageId;
		this.userId = userId;
		this.username = username;
		this.messageTime = messageTime;
		this.message = message;
	}

	// Property accessors

	public Long getMessageId() {
		return this.messageId;
	}

	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}

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

	public Timestamp getMessageTime() {
		return this.messageTime;
	}

	public void setMessageTime(Timestamp messageTime) {
		this.messageTime = messageTime;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}