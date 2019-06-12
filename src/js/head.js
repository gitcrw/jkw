(function() {
	//设置cookie
	function setCookie(key, val, iday) {
		var now = new Date();
		now.setDate(now.getDate() + iday);
		document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
	}

	function getCookie(key) {
		var str = document.cookie;
		var arr = str.split('; ');
		for(var i of arr) {
			var arr2 = i.split('=');
			if(key == arr2[0]) {
				return arr2[1];
			}
		}
	}

	function removeCookie(key) {
		setCookie(key, '', -1);
	}

	if(getCookie('user') && getCookie('pwd')) {
		//登录
		$.ajax({
			type: 'post',
			url: '../api/login.php',
			data: {
				phone: getCookie('user'),
				password: getCookie('pwd')
			},
			success: function(str) {
				if(str == 'yes') {
					//成功
					$('.scwz,.exit').css('display', 'block');
					$('.t_login,.t_reg').css('display', 'none');
					$('.top .ul1 li').css('marginRight', '20px');
					$('.welcome').html(`你好:${getCookie('user')}欢迎来到健客网上药店!`).css('marginRight', '10px')
					$('.exit').click(function() {
						console.log(1)
						removeCookie('user');
						removeCookie('pwd');
					})

				}
			}
		})
		//定时刷新购物车
		refresh();
		var car_timer = setInterval(refresh, 500);
		function refresh() {
			$.ajax({
				type: "post",
				url: "../api/checkcar.php",
				data: {
					user: getCookie('user'),
				},
				success: function(str) {
					$('#topnum').html(str);
				}
			});
		}	
	}

})()