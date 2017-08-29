package com.dao;

/**
 * Room entity. @author MyEclipse Persistence Tools
 */
public class Room extends AbstractRoom implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public Room() {
	}

	/** minimal constructor */
	public Room(Integer roomId) {
		super(roomId);
	}

	/** full constructor */
	public Room(Integer roomId, String roomName, String description) {
		super(roomId, roomName, description);
	}

}
