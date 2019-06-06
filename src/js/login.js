(function() {
	//切换选项
	var nowtab = 0;
	$('.tab_login span').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.info>div').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
		nowtab = $(this).index();
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
				$('.codepic_info').html('');
				$('#code').attr('ok', 'yes')
			} else {
				$('#code').css('border', '1px solid #c33');
				$('.codepic_info').html('图形验证码错误');
				$('#code').attr('ok', 'no')
			}
		} else {
			$('#code').css('border', '1px solid #c33');
			$('.codepic_info').html('请输入图形验证码');
			$('#code').attr('ok', 'no')
		}
	}
	//手机号验证
	$('#phone').blur(function() {
		Phone('#phone', '.phone_info');
	})
	$('#phone').keyup(function() {
		Phone('#phone', '.phone_info');
	})

	function Phone(ele, info) {
		var regphone = /^1[3-9]\d{9}$/;
		if($(ele).val()) {
			if(regphone.test($(ele).val())) {
				$(ele).css('border', '1px solid #ddd');
				$(info).html('');
			} else {
				$(ele).css('border', '1px solid #c33');
				$(info).html('请输入正确手机号');
			}
		} else {
			$(ele).css('border', '1px solid #c33');
			$(info).html('手机号不能为空')
		}
	}
	//短信验证码
	$('#phonecode').blur(function() {
		Phonecode();
	})
	$('#phonecode').keyup(function() {
		Phonecode();
	})

	function Phonecode() {
		if($('#phonecode').val()) {
			$('#phonecode').css('border', '1px solid #ddd');
			$('.code_info').html('');
		} else {
			$('#phonecode').css('border', '1px solid #c33');
			$('.code_info').html('请输入短信验证码');

		}
	}
	//点击获取验证码
	var phoneCode = '';
	var getcodeok = true;
	$('#getcode').click(function() {
		codePic();
		Phone('#phone', '.phone_info');
		if($('.phone_info').html() == '' && $('.codepic_info').html() == '') {

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

				$('#getcode').html('重试60');
				var timer = setInterval(next, 1000);
				var num = 60;

				function next() {
					if(num <= 1) {
						num = 0;
						$('#getcode').html('获取验证码');
						clearInterval(timer);
						getcodeok = true;
					} else {
						num--;
						var html = '重试' + num;
						$('#getcode').html(html);
					}
				}
			}
			getcodeok = false;
		}
		
	})
	//账号密码登录
	function Phone2() {
		if($('#phone2').val()) {
			$('#phone2').css('border', '1px solid #ddd');
			$('.phone_info2').html('');
		} else {
			$('#phone2').css('border', '1px solid #c33');
			$('.phone_info2').html('用户名不能为空');
		}
	}

	function Pwd2() {
		if($('#pwd2').val()) {
			$('#pwd2').css('border', '1px solid #ddd');
			$('.pwd_info2').html('');
		} else {
			$('#pwd2').css('border', '1px solid #c33');
			$('.pwd_info2').html('密码不能为空');
		}
	}

	function agree() {
		if($('#agree').is(':checked')) {

		} else {
			alert('请同意条款')
		}
	}
	$('#phone2').on('blur keyup', function() {
		Phone2();
	})
	$('#pwd2').on('blur keyup', function() {
		Pwd2();
	})

	//点击登录
	$('#loginbtn').click(function() {
		if(nowtab == '1') { //当前是第二个tab
			Phone2();
			Pwd2();
			agree();
			if($('.phone_info2').html() == '' && $('.pwd_info2').html() == '' && $('#agree').is(':checked')) {
				//请求数据库登录
				$.ajax({
					type: "post",
					url: "../api/login.php",
					data: {
						password: $('#pwd2').val(),
						phone: $('#phone2').val()
					},
					success: function(str) {
						//登录成功
						if(str == 'yes') {
							alert('登录成功')
							window.location.replace('main.html') //跳转
						} else {
							$('.pwd_info2').html('账号或密码错误')
						}
					}
				});
			}
		} else { //第一个tab
			codePic();
			Phone('#phone', '.phone_info');
			Phonecode();
			agree();
			if($('.phone_info').html() == '' && $('.codepic_info').html() == '' && $('.code_info').html() == '' && $('#agree').is(':checked')) { //检查通过
				//验证验证码
				if(phoneCode == $('#phonecode').val()) {
					//正确
					//检查数据库是否存在该账号，如果存在则登录，不存在就创建登录
					$.ajax({
						type: "post",
						url: "../api/checkphone.php",
						data: {
							phone: $('#phone').val()
						},
						success: function(str) {
							if(str == 'no') {
								//no为存在,进行登录
								alert('登录成功')
								window.location.replace('main.html') //跳转
							} else {
								//不存在就创建登录
								$.ajax({
									type: "post",
									url: "../api/adduser.php",
									data: {
										phone: $('#phone').val(),
										password: 123456
									},
									success: function() {

										//no为存在,进行登录
										alert('登录成功')
										window.location.replace('main.html') //跳转
									}
								})
								//发送短信通知
								$.ajax({
									type: "post",
									url: "../api/duanxin1.php",
									data: {
										phone: $('#phone').val()
									},
									success: function() {}
								})
							}
						}
					});
				} else {
					$('.code_info').html('短信验证码错误');
				}
			}
		}

	})
})()