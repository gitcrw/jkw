(function() {
	$('#head').load('head.html');
	$('#foot').load('foot.html');
	// 轮播图背景颜色
	var bg_color = ['rgb(197, 55, 69)', 'rgb(71, 166, 224)', 'rgb(155, 21, 21)', 'rgb(40, 65, 147)', 'rgb(124, 183, 223)', 'rgb(93, 120, 105)', 'rgb(255, 178, 188)','rgb(36, 107, 163)','rgb(51, 21, 10)'];
	//轮播图
	var swiper = new Swiper('.banner .swiper-container', {

		noSwiping: true,
		//  	noSwipingSelector: 'span',

		noSwipingClass: 'stop-swiping',
		effect: 'fade',
		// grabCursor: true,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			renderBullet: function(index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			},
		},
		on: {
			slideChange: function() {
				// console.log(this.realIndex)
				$('#banner').css('background', bg_color[this.realIndex]); //图片更换时拿到下标切换背景
			},
		},
		navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	});
	var oBox = document.getElementsByClassName('swiper-container')[0];
	oBox.onmouseover = function() {
		swiper.autoplay.stop();
	}
	oBox.onmouseout = function() {
		swiper.autoplay.start();
	}
	var oBox = document.getElementsByClassName('swiper-container')[1];
	oBox.onmouseover = function() {
		swiper2.autoplay.stop();
	}
	oBox.onmouseout = function() {
		swiper2.autoplay.start();
	}
	var swiper2 = new Swiper('.news_r .swiper-container', {

		noSwiping: true,
		//  	noSwipingSelector: 'span',

		noSwipingClass: 'stop-swiping',
		effect: 'slide',
		// grabCursor: true,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	});
	
	//渲染商品
	//热卖专场
	$.ajax({
		type:'post',
		url:'../api/goods.php',
		data:{
			star : 1,
			end : 4,
		},
		success: function(str) {
			var obj = JSON.parse(str)
			var html = obj.map(function(item) {
				return `
					<div class="hot_goods" gid="${item.gid}">
						<a href="detail.html?${item.gid}" target="_blank">
							<img src="../db_imgs/${item.fimgurl}" alt="" />
							<div class="imgbox">
								<h3>${item.name}</h3>
								<p>${item.desc}</p>
							</div>
						</a>
					</div>`
			}).join('');
			$('#hot_t').html(html);
		}
	})
	$.ajax({
		type:'post',
		url:'../api/goods.php',
		data:{
			star : 5,
			end : 16,
		},
		success: function(str) {
			var obj = JSON.parse(str)
			var html = obj.map(function(item) {
				return `
					<li gid="${item.gid}">
						<a href="detail.html?${item.gid}">
							<img src="../db_imgs/${item.fimgurl}" alt="" />
							<div class="dt">
								<h4>${item.name}</h4><h5>${item.desc}</h5>
							</div>
						</a>
					</li>`
			}).join('');
			$('#hot_b').html(html);
		}
	})
	//1F
	//center
	function fCenter(star,end,ele) {
		$.ajax({
			type:'post',
			url:'../api/goods.php',
			data:{
				star : star,
				end : end,
			},
			success: function(str) {
				var obj = JSON.parse(str)
				var html = obj.map(function(item) {
					return `
						<div gid="${item.gid}">
							<img src="../db_imgs/${item.fimgurl}" alt="" />
							<div class="bottom">
								<h3>${item.name}</h3>
								<p>${item.desc}</p>
							</div>
						</div>`
				}).join('');
				$(ele).html(html);
			}
		})
	}
	//r_l
	function fright(star,end,ele) {
		$.ajax({
			type:'post',
			url:'../api/goods.php',
			data:{
				star : star,
				end : end,
			},
			success: function(str) {
				var obj = JSON.parse(str)
				var html = obj.map(function(item) {
					return `
						<li gid="${item.gid}"><a href="detail.html?${item.gid}">
							<p>${item.name}</p>
							<img src="../db_imgs/${item.fimgurl}" alt="" />
						</a></li>`
				}).join('');
				$(ele).html(html);
			}
		})
	}
	//懒加载
	//当滑动到楼层才开始加载
	var oneh = $('.onef_h2').offset().top;
	var twoh = $('.twof_h2').offset().top;
	var threeh = $('.threef_h2').offset().top;
	var fourh = $('.fourf_h2').offset().top;
	var fiveh = $('.fivef_h2').offset().top;
	var sixh = $('.sixf_h2').offset().top;
	window.onscroll = function() {
		if(window.scrollY > oneh) {
			setTimeout(next, 500);
			function next() {
				fCenter(17,17,'#onecenter')
				fright(18,21,'#onerl');
				fright(22,24,'#onerr');
			}
			oneh = 10000000;
		}
		if(window.scrollY > twoh) {
			setTimeout(next, 500);
			function next() {
				fCenter(25,25,'#twocenter');
				fright(26,29,'#tworl');
				fright(30,32,'#tworr');
			}
			twoh = 10000000;
		}
		if(window.scrollY > threeh) {
			setTimeout(next, 500);
			function next() {
				fCenter(17,17,'#threecenter');
				fright(12,15,'#threerl');
				fright(12,14,'#threerr');
			}
			threeh = 10000000;
		}
		if(window.scrollY > fourh) {
			setTimeout(next, 500);
			function next() {
				fCenter(17,17,'#fourcenter');
				fright(12,15,'#fourrl');
				fright(12,14,'#fourrr');
			}
			fourh = 10000000;
		}
		if(window.scrollY > fiveh) {
			setTimeout(next, 500);
			function next() {
				fCenter(17,17,'#fivecenter');
				fright(12,15,'#fiverl');
				fright(12,14,'#fiverr');
			}
			fiveh = 10000000;
		}
		if(window.scrollY > sixh) {
			setTimeout(next, 500);
			function next() {
				fCenter(17,17,'#sixcenter');
				fright(12,15,'#sixrl');
				fright(12,14,'#sixrr');
			}
			sixh = 10000000;
		}
		if(window.scrollY > 500) {//右侧滑动
			$('.r_st').fadeIn();
		}else{
			$('.r_st').fadeOut();
		}
	}
	//点击商品跳转详情页
	//循环绑定事件
//	{
//		$(this).click(function() {
//			window.open('detail.html?' + $(this).data('gid'));
//		})
//	})
	//选项卡
	$('#ntab a').hover(function() {
		$(this).addClass('active').siblings().attr('class','');
		$('#ninfo>div').eq($(this).index()).addClass('show').siblings().attr('class','');
	}) 
	$('#ntab2 a').hover(function() {
		$(this).addClass('active').siblings().attr('class','');
		$('#ninfo2>div').eq($(this).index()).addClass('show').siblings().attr('class','');
	})
	
	//右侧菜单
	$('.r_sm').mouseover(function() {
		$('.wxxcx').animate({left:-315},200);
		$('.wxapp').animate({left:-155},200);
	})
	$('.r_sm').mouseleave(function() {
		$('.wxxcx').animate({left:100},200);
		$('.wxapp').animate({left:260},200);
	})
	$('.r_st').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 500);
	})
})()
