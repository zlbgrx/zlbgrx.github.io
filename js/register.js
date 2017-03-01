$(function() {
	//验证需要用到的正则
	var reg = {
		regNum: /\d+/, //验证是否为数字      
		regWord: /[a-zA-Z]+/, //验证是否为字母     
		regOther: /[^\da-zA-Z]+/, //验证是否为特殊字符
		phone: /^(1){1}(3|5|7|8){1}[0-9]{9}/, //验证手机号，本初验证用户名以此验证
	};
	//所有的输入框获得焦点切内部无内容时时，弹出对应栏目的填写要求
	$('.register .item input').focus(function() {
		if($(this).val() == 0) {
			$(this).parent('p').siblings('.hint').css('display', 'block');
			$(this).parent('p').siblings('.error').css('display', 'none');
		}
	});
	//失去焦点时，隐藏对应信息
	$('.register .item input').blur(function() {
		$(this).parent('p').siblings('.hint').css('display', 'none');
	});

	//1.注册账号验证(此处验证手机号)
	$('#phoneNumber').blur(function() {
		checkPhone();
	});

	function checkPhone() {
		//获取输入框内容
		var usn = $('#phoneNumber').val();

		if(usn == 0) { //输入框为空时，提示请输入手机号
			$('#phoneNumber').parent('p').siblings('.error').css('display', 'block').html("请输入手机号");
			return false;
		} else { //非空情况下
			if(reg.phone.test(usn)) { //如果手机号格式正确，隐藏提示项
				$('#phoneNumber').parent('p').siblings('.error').css('display', 'none');
				return true;
			} else { //手机号格式有误，提示账号暂时只开放手机号码注册
				$('#phoneNumber').parent('p').siblings('.error').css('display', 'block').html("账号暂时只开放手机号码注册");
				return false;
			}
		}
	}
	//2.验证密码
	$('#passWord').blur(function() {
		checkPassWord();
	});

	function checkPassWord() {
		var password = $('#passWord').val();
		if(password == 0) { //输入为空时，提示请输入密码
			$('#passWord').parent('p').siblings('.error').css('display', 'block').html("请输入密码");
			return false;
		} else { //输入非空时
			if(password.length >= 6 && password.length <= 20) { //输入密码长度符合要求
				var level = 0; //定义安全级别的初始值
				if(reg.regNum.test(password)) { //含有数字
					level++;
				}
				if(reg.regWord.test(password)) { //含有大小写字母
					level++;
				}
				if(reg.regOther.test(password)) { //含有特殊字符
					level++;
				}
				if(level == 1) {
					$('#passWord').parent('p').siblings('.error').css('display', 'block').html("您的密码强度较低").css('color', 'red');
				} else if(level == 2) {
					$('#passWord').parent('p').siblings('.error').css('display', 'block').html("您的密码强度为中等").css('color', 'yellow');
				} else if(level == 3) {
					$('#passWord').parent('p').siblings('.error').css('display', 'block').html("您的密码强度较高").css('color', 'lightgreen');
				}
				return true;
			} else { //长度不满足要求
				$('#passWord').parent('p').siblings('.error').css('display', 'block').html("密码长度为6-20位字符");
				return false;
			}
		}
	}
	//3.再次输入密码
	$('#pwd').blur(function() {
		checkPwd();
	});

	function checkPwd() {
		var pwd = $('#pwd').val();
		if(pwd == 0) { //输入为空,提示请再次输入密码
			$('#pwd').parent('p').siblings('.error').css('display', 'block').html("请再次输入密码");
			return false;
		} else { //输入非空
			var password = $('#passWord').val();
			if(pwd == password) { //输入密码一致时
				$('#pwd').parent('p').siblings('.error').css('display', 'none');
				return true;
			} else { //如果输入不一致，提示密码输入不一致
				$('#pwd').parent('p').siblings('.error').css('display', 'block').html("密码输入不一致");
			}
		}
	}
	//4.输入验证码
	//点击按钮，可随机生成验证码
	$('.varCode').click(function() {
		var arr = ["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F", "G", "H", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		var code = ""; //验证码
		for(var i = 0; i < 4; i++) {
			var index = parseInt(Math.random() * arr.length);
			code = code + arr[index];
		}
		$('.varCode').html(code);
		$('#hidden').val(code);

	});
	//输入值与生成的验证码进行校验
	$('#varCode').blur(function() {
		checkVarCode();
	});

	function checkVarCode() {
		var varCode = $('#varCode').val(); //输入的验证码
		var code = $('.varCode').html(); //生成的验证码
		if(varCode == 0) { //输入为空时，提示请输入验证码
			$('#varCode').parent('p').siblings('.error').css('display', 'block').html("请输入验证码");
			return false;
		} else { //输入非空时
			if(varCode == code) { //验证码相等（区分大小写）
				$('#varCode').parent('p').siblings('.error').css('display', 'none');
				return true;
			} else { //验证码不相等
				$('#varCode').parent('p').siblings('.error').css('display', 'block').html("验证码输入有误");
				return false;
			}
		}
	}

	$('#register').click(function() {
		//提交注册时，先检查同意注册框是否选中
		if($('#checkbox').is(':checked')) { //同意协议框选中
			$('.check').css('color', '#333');
			//同意协议后开始对注册信息进行追踪，看是否未填写或填写错误
			if(checkPhone() && checkPassWord() && checkPwd() && checkVarCode()) {
				/*全部返回值为true时，才能通过验证
					如果填写格式符合要求，让其通过，将用户名和密码存入cookie中
					格式为
					{"phoneNumber":"password"}
					首先判断该手机号是否被注册
					registeredNumbers 本地存储的已经注册的手机号
				*/
				var name = $('#phoneNumber').val(); //输入的手机号
				var pwd = $('#passWord').val();
				var numberStr = $.cookie("phoneNumber") ? $.cookie("phoneNumber") : "{}";
				var numberObj = JSON.parse(numberStr);
				if(name in numberObj) { //该用户已被注册
					$('#phoneNumber').parent('p').siblings('.error').css('display', 'block').html("该手机号已被注册");
					return;
				} else { //若本地没有存储，则该手机号未被注册
					numberObj[name] = pwd; // 将输入的手机号和密码信息添加到所有用户信息的对象中
					numberStr = JSON.stringify(numberObj); // 转回字符串，以便存到cookie中
					$.cookie('phoneNumber', numberStr, {
						expires: 7,
						path: "/"
					});
					window.location.href = "../login/login.html";
				}
			}
		} else { //同意协议框未选中
			$('.check').css('color', 'red');
		}
	});
});