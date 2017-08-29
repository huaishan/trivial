package com.utils;

public class Constants {
	
	public static final Integer SEND_SUCCESS = 1;	// 消息发送成功
	
	public static final Integer SEND_FAILURE = 0;	// 消息发送失败
	
	public static final String TAKE_SUCCESS = "success";	// 接收消息成功
	
	public static final String TAKE_FAILURE = "error";	// 接收消息失败
	
	public static final Integer USER_VALID = 1;		// 用户名存在
	
	public static final Integer USER_NOT_VALID = 0;	// 用户名不存在
	
	public static final String ONLINE_PEOPLE_TOKEN = "online";	// 获取在线人数的令牌
	
	public static final String LAST_MESSAGE_ID_TOKEN = "lastMessageId";	// 获取最后一条消息id的令牌

	public static Long Now_Last_Id;
	
	{
		synchronized(this) {
			Long i = (long) 0;
		}
	}
}
