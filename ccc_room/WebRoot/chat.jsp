<%@page import="com.dao.UserInfo"%>
<%@ page language="java" import="java.util.*,com.utils.*,com.dao.*, com.web.interceptor.*, org.apache.struts2.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%! private HttpSession session = ServletActionContext.getRequest().getSession(); %>
<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <meta charset="utf-8" />
	<title>CoCo chat room</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/layout.css">
	<script src="js/jquery-2.1.0.js"></script>
	<script type="text/javascript" src="js/messageAjax.js"></script>

  </head>
  
  <body>
    <div id="main">
		<div id="rpanel">
			<div class="type"><p class="title2">C o C o</p></div>
		</div>
	
		<div id="lpanel">
			<div id="logo2">
				<form action="logout.action" method="post"><s:token></s:token><input type="submit" value="注销" class="lbutton"></form>
				<label class="title1">在线聊天室</label>
			</div>
	
			<div id="logo3">
				<div class="online_head"><h1>在线成员</h1></div>
				<div id="online_people">
					<ul class="online_people_list">
						
					</ul>
				</div>
			</div>
			
			<div id="logo4">
							
			</div>
	
			<div id="submit"><input type="button" value="发表" class="submit"/></div>
			<div id="text3"><input type="text" class="text3" placeholder="Type your Message"></div>
			<div id="replayuser"><p class="replayuser"><%=((UserInfo)(session.getAttribute(AuthenticationInterceptor.USER_SESSION_KEY))).getUsername() %></p></div>
		</div>
	</div>
  </body>
</html>
