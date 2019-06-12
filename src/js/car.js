(function() {
	$('#head').load('head.html');
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
	//选项卡
	$('.tabs div').eq(0).addClass('active')
	$('.tabs div').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('#goods_info ul').eq($(this).index()).css('display','block').siblings().css('display','none')
	})
	
	if(getCookie('user') && getCookie('pwd')) {
		$('.tologin').css('display','none');
		$('#goods_info').css('display','block');
	}else{
		$('.tologin').css('display','block');
		$('#goods_info').css('display','none');
	}
})()
