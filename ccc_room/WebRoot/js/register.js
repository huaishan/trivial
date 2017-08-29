function p() {
	var pwd = document.getElementById("passwordsignup").value;
	var pwd_info = document.getElementById("passwordsignupl");
	var pwd_info2 = document.getElementById("pwd_info");
	if(pwd.length < 6 || pwd.length > 16) {
		if(pwd_info2) {
			pwd_info2.innerHTML = "密码请保持在6-16位之间。";
		} else {
			pwd_info.innerHTML += "<font id='pwd_info' color='red'>密码请保持在6-16位之间。</font>";
		}
	} else {
		if(pwd_info2) {
			pwd_info2.parentNode.removeChild(pwd_info2);
		}
	}
}
function p_confirm() {
	var pwd = document.getElementById("passwordsignup").value;
	var pwd_confirm = document.getElementById("passwordsignup_confirm").value;
	var pwd_confirm_info = document.getElementById("passwordsignup_confirm_l");
	var pwd_confirm_info2 = document.getElementById("pwd_confirm_info");
	if(pwd != pwd_confirm) {
		if(pwd_confirm_info2) {
			pwd_confirm_info2.innerHTML = "两次密码不一致。";
		} else {
			pwd_confirm_info.innerHTML += "<font id='pwd_confirm_info' color='red'>两次密码不一致。</font>";
		}
	} else {
		if(pwd_confirm_info2) {
			pwd_confirm_info2.parentNode.removeChild(pwd_confirm_info2);
		}
	}
}
function test() {
	var pwd = document.getElementById("passwordsignup");
	var pwd_confirm = document.getElementById("passwordsignup_confirm");
	pwd.onkeyup = p;
	pwd_confirm.onkeyup = p_confirm;
	
}
window.onload = test;

/*-------------------------------------
 * jQuery
---------------------------------------*/ 
$(document).ready(function() {
	$("div#register").find("form").on("submit", function() {
		var pwd = document.getElementById("#passwordsignup").value;
		var pwd_confirm = document.getElementById("passwordsignup_confirm").value;
		var user_info = document.getElementById('user_info');
		var pwd_info = document.getElementById("pwd_info");
		if(pwd != pwd_confirm) {
			return false;
		}
		if(user_info || pwd_info) {
			return false;
		}
		return true;
	});
});

$(document).ready(function() {
	var uname = $('#usernamesignup_info');
	var uname_html = uname.html();
	$('#usernamesignup').on('change', function() {
		var user_info1 = "<font id='user_info' color='red'>用户名已存在。</font>";
		var user_info2 = "<font id='user_info' color='red'>用户名格式不正确(不能有空格、不能超过十位)。</font>";
		var user_info3 = "<font id='user_info' color='red'>正在验证。</font>";
		var user_info0 = "<font color='red'>用户名有效。</font>";
		var regex1 = /^$| /;
		var userName = $.trim($('#usernamesignup').val());
		if(regex1.test(userName) || userName.length > 10) {
			uname.html(uname_html + user_info2);
		} else {
			uname.html(uname_html + user_info3);
			$.post(
				"usernameVerify.action",
				{"username":userName},
				function(result) {
					if(result.isExist == 1) {
						uname.html(uname_html + user_info1);
					} else {
						uname.html(uname_html + user_info0);
					}
				},
				"json"
			);
		}
	});
});





