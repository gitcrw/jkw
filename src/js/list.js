(function() {
	//加载头部及菜单
	$('#head').load('head.html', function() {
		$('.menu_title,.list').mouseenter(function() {
			$('.list').css('display', 'block');
		})
		$('.list,.menu_title').mouseleave(function() {
			$('.list').css('display', 'none');
		})
		$('.telimg').attr('src', '../images/indexzx.jpg');
	});
	var html = '';
	for(var i = 0; i <= 20; i++) {
		html += `	<h3 onselectstart="return false"><i></i>皮肤用药</h3>
					<ul>
						<li><a href="">皮肤过敏</a></li>
						<li><a href="">扁平苔癣</a></li>
						<li><a href="">生发乌发</a></li>
						<li><a href="">酒糟鼻</a></li>
						<li><a href="">治裂防冻</a></li>
						<li><a href="">褥疮溃烂</a></li>
						<li><a href="">痱子晒伤</a></li>
						<li><a href="">鸡眼</a></li>
						<li><a href="">甲沟炎</a></li>
						<li><a href="">花斑癣</a></li>
						<li><a href="">多汗腋臭</a></li>
						<li><a href="">皮肤瘙痒</a></li>
						<li><a href="">手足癣病</a></li>
						<li><a href="">带状疱疹</a></li>
						<li><a href="">蚊虫叮咬</a></li>
					</ul>		
				`		
	}
	$('.item-choose').html(html);
		
	//左侧手风琴菜单
	$('.itemChoose i').on('click',function() {
		$(this).toggleClass('show')
		$(this).parent().next().stop(true).slideToggle();
	})
	
	//排序
	$('.sort span').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	})
	
	
})()
