package com.dao;

import java.sql.Timestamp;

/**
 * Message entity. @author MyEclipse Persistence Tools
 */
public class Message extends AbstractMessage implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public Message() {
	}

	/** minimal constructor */
	public Message(Long messageId, Long userId) {
		super(messageId, userId);
	}

	/** full constructor */
	public Message(Long messageId, Long userId, String username,
			Timestamp messageTime, String message) {
		super(messageId, userId, username, messageTime, message);
	}

}
