package com.dao;

/**
 * AbstractRoom entity provides the base persistence definition of the Room
 * entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractRoom implements java.io.Serializable {

	// Fields

	private Integer roomId;
	private String roomName;
	private String description;

	// Constructors

	/** default constructor */
	public AbstractRoom() {
	}

	/** minimal constructor */
	public AbstractRoom(Integer roomId) {
		this.roomId = roomId;
	}

	/** full constructor */
	public AbstractRoom(Integer roomId, String roomName, String description) {
		this.roomId = roomId;
		this.roomName = roomName;
		this.description = description;
	}

	// Property accessors

	public Integer getRoomId() {
		return this.roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getRoomName() {
		return this.roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}