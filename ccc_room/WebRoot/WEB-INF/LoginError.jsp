<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%><%@ page contentType="text/html; charset=UTF-8" %><%@ taglib prefix="s" uri="/struts-tags" %><%String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'RegisterError.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta http-equiv="refresh" content="10; url=index.jsp">
  </head>
  
  <body>
 	<h1>错误原因：</h1>
 	<h2>
 		<s:fielderror>
	 		<s:param>username</s:param>
	    	<s:param>userelsewhere</s:param>
	   		<s:param>BrowserExists</s:param>
    	</s:fielderror>
    </h2>
  	<h2>10秒后自动返回登录页面。无响应手动<a href="<%=basePath%>">返回</a>。</h2>
  </body>
</html>
