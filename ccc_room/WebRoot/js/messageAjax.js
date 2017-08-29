/*--------------------------------------------
 * 用户名显示
----------------------------------------------*/
var username = $.trim($('p.replayuser').text());
$(document).ready(function() {
	var username = $.trim($('p.replayuser').text());
	var newname = "";
	if(username.length > 3) {
		newname = username.substring(0, 3);
		$('p.replayuser').text(newname + '..');
	}
});

/*--------------------------------------------
 * 发送消息
----------------------------------------------*/
$(document).ready(function() {

	$('input.submit').click(function(event) {
		event.preventDefault();
		if($('input.text3').val()) {
			sendMessage();
		}
		
	});
	// $(document).keyup(function(event) {
	// 	if(event.keyCode == 13) {
	// 		if($('input.text3').val()) {
	// 			sendMessage();
	// 		}
	// 	}
	// });
	$('input.text3').on('focus', function() {
		$(document).keyup(function(event) {
			if(event.keyCode == 13) {
				if($('input.text3').val()) {
					sendMessage();
				}
			}
		});
	});
	function MySend(name) {
		$('#logo4').append(build_newMessage(name));
		$('div#logo4').find('>div:last').hide().fadeIn('fast');
		$('div#logo4').find('>div:last').attr("tabindex",0).focus(); // 定位到消息框最后一条消息
		$('input.text3').val("");
		$('input.text3').focus();	// 定位到输入框
	}
	function build_newMessage(name) {
		var newMessage = "";
		newMessage += '<div id="char1">';
		newMessage += '<p class="uat">' + name + ' ' + getCurrentTime() + '</p>';
		newMessage += '<div id="lchar">';
		newMessage += '<p class="massage">' + $('input.text3').val() + '</p>';
		newMessage += '</div>';
		newMessage += '</div>';
		return newMessage;
	}
	function getCurrentTime() {	// 构造当前时间
		var date = new Date();
		var result = "";
		result += (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':';
		result += (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':';
		result += (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
		return result;
	}
	function sendMessage() {
		$.ajaxSetup({ 	// 为了能给全局变量赋值设置为同步
		    async : false 
		});
		var messageText = $('input.text3').val();
		$.post(
			"sendMessage.action",
			{"message":messageText},
			function(result) {
				if(result.token == 1) {
					LastMsgId = result.thisMessageId;
					MySend(result.username);
				} 
				if(result.token == 0) {
					alert("发送消息出错，请检查发送消息是否为空、是否登录或已在别处登录！");
				}
			},
			"json"
		);
	}
	
});

/*--------------------------------------------
 * 接收消息
----------------------------------------------*/
var oldLastMsgId = 0;
var LastMsgId = 0;
$(document).ready(function() {
	var LastMsgIdToken = "lastMessageId";
	$.post(
		"getLastMessageId.action",
		{"token":LastMsgIdToken},
		function(result) {
			LastMsgId = result.lastMessageId;
		},
		"json"
	);
	function getNewMessage() {
		oldLastMsgId = LastMsgId;
		var successToken = "success";
		$.post(
			"takeMessage.action",
			{"currentLastMessageId":LastMsgId},
			function(result) {
				if(result.token == successToken) {
					for(var i = 0; i < (result.messageIds).length; i++) {
						var newMessage = "";
						newMessage += '<div id="char1">';
						newMessage += '<p class="uat">' + (result.userNames)[i] + ' ' + (result.times)[i] + '</p>';
						newMessage += '<div id="lchar">';
						newMessage += '<p class="massage">' + (result.messages)[i] + '</p>';
						newMessage += '</div>';
						newMessage += '</div>';
						takeMsg(newMessage);
					}
					LastMsgId = (result.messageIds)[(result.messageIds).length-1];
				} else {
					//console.log("Not new message");
				}
			},
			"json"
		);
	}

	setInterval(getNewMessage, 1000);

	function takeMsg(html) {
		$('#logo4').append(html);
		$('div#logo4').find('>div:last').hide().fadeIn('fast');
		$('div#logo4').find('>div:last').attr("tabindex",0).focus(); // 定位到消息框最后一条消息
		$('input.text3').focus();	// 定位到输入框
	}
});

/*--------------------------------------------
 * 获取在线成员
----------------------------------------------*/
$(document).ready(function() {
	function getOnline() {
		var onlineToken = "online";
		$.post(
			"OnlinePeople.action",
			{"online":onlineToken},
			function(result) {
				$('ul.online_people_list').html("");
				$.each(result.online_People, function(i, item) {
					var html = "";
					html += "<li><p class='people_name'>" + item +"</p></li>";
					$('ul.online_people_list').append(html);
				});
			},
			"json"
		);
	}
	getOnline();
	setInterval(getOnline, 4000);
});

/*--------------------------------------------
 * 注销
----------------------------------------------*/
$(document).ready(function() {
	var username = $('p.replayuser').text();
	var token = 0;
	$('input.lbutton').click(function(event) {
		event.preventDefault();	// 阻止动作的默认行为
		window.onbeforeunload = null;
		$.post(
			"logoutB.action",
			{"username": username},
			function(result) {
				token = 1;
				setTimeout(Logout, 500);
			},
			"json"
		);
		
		function Logout() {
			if(token == 1) {
				window.location.href = "/cocoChatRoom/index.jsp";
			} else {
				setTimeout(Logout, 500);
			}
		}	
	});
});

window.onbeforeunload = function() {
      	return "要走了吗？ ps:请务必通过注销离开，否则账号将被冻结1分钟！";
}