<%@page import="java.io.ObjectInputStream.GetField"%><%@ page language="java" import="java.util.*, com.opensymphony.xwork2.ActionSupport" pageEncoding="UTF-8"%><%@ taglib prefix="s" uri="/struts-tags" %><%String path = request.getContextPath();String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";%><!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6 lt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7 lt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8 lt8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
    <head>
    	<base href="<%=basePath%>">
        <meta charset="UTF-8" />
        <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
        <title>Login and Registration Chat room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Login and Registration Form with HTML5 and CSS3" />
        <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/reset.css">
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/animate-custom.css" />
		<script type="text/javascript" src="js/jquery-2.1.0.js"></script>
    </head>
    <body>
        <div class="container">

            <header>
				
            </header>
    <div style="text-align:center;clear:both;">
        </div>
            <section>				
                <div id="container_demo" >
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form action="login.action" autocomplete="on" method="post">
                            	<s:token></s:token>
                                <h1>登录</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u" > 你的用户名   </label>
                                    <input id="username" name="username" required="required" type="text" placeholder="myusername"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> 你的密码 </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                                </p>
                                <p class="login button"> 
                                    <input type="submit" value="登录" /> 
								</p>
                                <p class="change_link">
									还没有帐号 ?
									<a href="#toregister" class="to_register">注册</a>
								</p>
                            </form>
                        </div>

                        <div id="register" class="animate form">
                            <form  action="register.action" autocomplete="on" method="post">
                            	<s:token></s:token>
                                <h1> 注册 </h1> 
                                <p> 
                                    <label id="usernamesignup_info" for="usernamesignup" class="uname" data-icon="u">你的用户名 </label>
                                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="emailsignup" class="youmail" data-icon="e" >你的Email </label>
                                    <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
                                <p> 
                                    <label id="passwordsignupl" for="passwordsignup" class="youpasswd" data-icon="p">你的密码 </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label id="passwordsignup_confirm_l" for="passwordsignup_confirm" class="youpasswd" data-icon="p">请确认你的密码 </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p class="signin button"> 
									<input type="submit" value="注册"/> 
								</p>
                                <p class="change_link">  
									已经有帐号了 ?
									<a href="#tologin" class="to_register"> 返回登录 </a>
								</p>
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>
        </div>
		<script type="text/javascript" src="js/register.js"></script>
	</body>
</html>