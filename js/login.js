//用户登录
$(function() {
	//电话邮箱输入框失去焦点时对其进行追踪
	$('#phoneNumber').blur(function() {
		checkPhone();
	});
	function checkPhone() {
		var phone = $('#phoneNumber').val();
		if(phone == 0) { //输入为空
			$('.unerLogin .login  span.name').css('display', 'block').html('请输入手机号');
			return false;
		} else { //输入非空
			var reg = /^(1){1}(3|5|7|8){1}[0-9]{9}/; //验证手机号
			if(reg.test(phone)) { //格式正确
				$('.unerLogin .login  span.name').css('display', 'none');
				return true;
			} else { //格式不正确
				$('.unerLogin .login  span.name').css('display', 'block').html('手机号格式不正确');
				return false;
			}
		}
	}
	//密码框追踪，只判断是否输入内容
	$('#passWord').blur(function() {
		checkPwd();
	});
	function checkPwd() {
		var pwd = $('#passWord').val();
		if(pwd == 0) {
			$('.unerLogin .login  span.pwd').css('display', 'block').html('请输入密码');
			return false;
		} else {
			$('.unerLogin .login  span.pwd').css('display', 'none')
			return true;
		}
	}

	$('#login').click(function() {
		//做一个判断，手机号格式正确，且输入密码非空
		if(checkPhone() && checkPwd()) { //满足要求时，再进行用户名和密码与本对存储比对
			var phone = $('#phoneNumber').val();
			var pwd = $('#passWord').val();
			//先将cookie取出，并转化为易于操作的对象
			var numberStr = $.cookie("phoneNumber") ? $.cookie("phoneNumber") : "{}";
			var numberObj = JSON.parse(numberStr);
			//做判定，看是否有该账号，如果有，判断密码是否正确
			console.log(numberObj);
			if(phone in numberObj) { //存在该账号
				//先将cookie信息存储起来，过期时间为7天
				$.cookie("loginedUser", phone, {
					expires: 7,
					path: "/"
				});
				if(numberObj[phone] == pwd) { //密码正确
					$('.unerLogin .login  span.pwd').css('display', 'none');
					$('.unerLogin .login  span.name').css('display', 'none');
					window.location.href = "../index.html";
				} else { //密码不正确
					$('.unerLogin .login  span.pwd').css('display', 'block');
				}
			} else { //没有该账号
				$('.unerLogin .login span.name').css('display', 'block');
			}
		}
	});
})