package com.utils;

public class Constants {
	
	public static final Integer SEND_SUCCESS = 1;	// ��Ϣ���ͳɹ�
	
	public static final Integer SEND_FAILURE = 0;	// ��Ϣ����ʧ��
	
	public static final String TAKE_SUCCESS = "success";	// ������Ϣ�ɹ�
	
	public static final String TAKE_FAILURE = "error";	// ������Ϣʧ��
	
	public static final Integer USER_VALID = 1;		// �û�������
	
	public static final Integer USER_NOT_VALID = 0;	// �û���������
	
	public static final String ONLINE_PEOPLE_TOKEN = "online";	// ��ȡ��������������
	
	public static final String LAST_MESSAGE_ID_TOKEN = "lastMessageId";	// ��ȡ���һ����Ϣid������

	public static Long Now_Last_Id;
	
	{
		synchronized(this) {
			Long i = (long) 0;
		}
	}
}
