(function() {
	//验证手机
	var regphone = /^1[3-9]\d{9}$/;

	//手机为空
	yzPhone();

	function yzPhone() {
		$('#phone').blur(function() {
			if($(this).val()) {
				if(regphone.test($(this).val())) {
					$(this).css('border', '1px solid #ddd');
					$('.phone_info').html('');
					//正则匹配正确后请求验证是否存在
					$.ajax({
						type: 'post',
						url: '../api/checkphone.php',
						data: {
							phone: $('#phone').val()
						},
						success: function(str) {
							if(str == 'no') {
								$('#phone').css('border', '1px solid #c33');
								$('.phone_info').html('手机号已经注册');
								$('#phone').attr('ok', 'no')
								return false;
							} else {
								$('#phone').attr('ok', 'yes')
							}
						}
					})
				} else {
					$(this).css('border', '1px solid #c33');
					$('.phone_info').html('请输入正确手机号');
					$(this).attr('ok', 'no')
					return false;
				}
			} else {
				$(this).css('border', '1px solid #c33');
				$('.phone_info').html('手机号不能为空');
				$(this).attr('ok', 'no')
				return false;
			}
		})
	}

	$('#phone').keyup(function() {
		if(regphone.test($(this).val())) {
			$(this).css('border', '1px solid #ddd');
			$('.phone_info').html('');
			$(this).attr('ok', 'yes')
		} else {
			$(this).css('border', '1px solid #c33');
			$('.phone_info').html('请输入正确手机号');
			$(this).attr('ok', 'no')
		}
	})

	//图形验证码
	var codepic = new GVerify({
		id: "codepic",
		type: "blend"
	});
	$('#code').blur(function() {
		codePic();
	})
	$('#code').keyup(function() {
		codePic();
	})

	function codePic() {
		var code = $('#code').val();
		if(code) {
			if(codepic.validate(code)) {
				$('#code').css('border', '1px solid #ddd');
				$('.piccode_info').html('');
				$('#code').attr('ok', 'yes')
			} else {
				$('#code').css('border', '1px solid #c33');
				$('.piccode_info').html('图形验证码错误');
				$('#code').attr('ok', 'no')
			}
		} else {
			$('#code').css('border', '1px solid #c33');
			$('.piccode_info').html('请输入图形验证码');
			$('#code').attr('ok', 'no')
		}
	}
	//看不清验证码
	$('#nolook').click(function() {
		codepic = new GVerify({
			id: "codepic",
			type: "blend"
		});
		if($('#code').val()) {
			codePic();
		}
	})
	//短信验证码
	$('#phonecode').blur(function() {
		if($(this).val()) {
			$(this).css('border', '1px solid #ddd');
			$('.phonecode_info').html('');
		} else {
			$(this).css('border', '1px solid #c33');
			$('.phonecode_info').html('短信验证码不能为空');
		}
	})
	//点击获取验证码
	var phoneCode = '';
	var getcodeok = true;
	$('.getcode').click(function() {
		//		$('.getcode').attr('disabled',false);
		var phoneok = $('#phone').attr('ok');
		var piccodeok = $('#code').attr('ok');
		if(phoneok == 'yes') {} else {
			if($('#phone').val()) {} else {
				$('#phone').css('border', '1px solid #c33');
				$('.phone_info').html('手机号不能为空');
			}
		}
		if(piccodeok == 'yes') {} else {
			if($('#code').val()) {

			} else {
				$('#code').css('border', '1px solid #c33');
				$('.piccode_info').html('请输入图形验证码');
			}
		}
		if(phoneok == 'yes' && piccodeok == 'yes') {
			if(getcodeok) {
				//发送验证码
				$.ajax({
					type: 'post',
					url: '../api/duanxin.php',
					data: {
						userphone: $('#phone').val()
					},
					success: function(str) {
						phoneCode = str;
					}
				})
				$('.getcode').val('重试60');
				var timer = setInterval(next, 1000);
				var num = 60;

				function next() {
					if(num <= 1) {
						num = 0;
						$('.getcode').val('获取验证码');
						clearInterval(timer);
						getcodeok = true;
					} else {
						num--;
						var html = '重试' + num;
						$('.getcode').val(html);
					}
				}
			}
			getcodeok = false;
		}
	})
	//密码
	var regpwd = /^.{6,16}$/;

	function yzpwd() {
		if(regpwd.test($('.pwd').val())) {
			$('.pwd').css('border', '1px solid #ddd');
			$('.pwd_info').html('');
			$('.pwd').attr('ok', 'yes')
		} else {
			$('.pwd').css('border', '1px solid #c33');
			$('.pwd_info').html('请输入6~16位的密码');
			$('.pwd').attr('ok', 'no')
		}
	}

	function qrpwd() {
		var pwd = $('.pwd').val();
		var qrpwd = $('.qrpwd').val();
		if(pwd == qrpwd) {
			$('.qrpwd').css('border', '1px solid #ddd');
			$('.qrpwd_info').html('');
			$('.qrpwd').attr('ok', 'yes')
		} else {
			$('.qrpwd').css('border', '1px solid #c33');
			$('.qrpwd_info').html('密码输入不一致');
			$('.qrpwd').attr('ok', 'no')
		}
	}
	$('.pwd').blur(function() {
		if($(this).val()) {
			$(this).css('border', '1px solid #ddd');
			$('.pwd_info').html('');
			yzpwd();
			qrpwd();
		} else {
			$(this).css('border', '1px solid #c33');
			$('.pwd_info').html('新密码不能为空');
		}
	})
	$('.pwd').keyup(function() {
		yzpwd();
		qrpwd();
	})
	$('.qrpwd').keyup(function() {
		qrpwd();
	})
	//同意条款
	$('#protocol').attr('ok', 'yes');
	$('#protocol').click(function() {
		if(this.checked) {
			$(this).attr('ok', 'yes')
		} else {
			$(this).attr('ok', 'no')
		}
	})
	//点击注册
	$('.getcode').attr('ok', 'yes');
	$('.register-btn').click(function() {
		var arr = [];
		//验证码是否正确
		$('#phonecode').attr('ok','yes');
		if($('#phonecode').val() == phoneCode) {
			$('input').each(function(i, item) {
				if($(item).attr('ok') != 'yes') {
					arr.push(item);
				}
			})
			if(!arr.length) {

				alert('注册成功！')
				//注册成功，写入数据库
				$.ajax({
					type: "post",
					url: "../api/adduser.php",
					data: {
						phone: $('#phone').val(),
						password: $('.pwd').val()
					},
					success: function() {
						window.location.replace('login.html') //跳转
					}
				});
			} else {
				if(!$('#protocol').is(':checked')) {
					alert('请同意条款')
				} else {
					alert('请完善信息')
				}
			}
		}else {
			$('#phonecode').css('border', '1px solid #c33');
			$('.phonecode_info').html('短信验证码错误')
		}

	})
})()
//