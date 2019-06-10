(function() {
	$('#head').load('head.html');

	// 轮播图背景颜色
	var bg_color = ['rgb(197, 55, 69)', 'rgb(71, 166, 224)', 'rgb(155, 21, 21)', 'rgb(40, 65, 147)', 'rgb(124, 183, 223)', 'rgb(93, 120, 105)', 'rgb(255, 178, 188)','rgb(36, 107, 163)','rgb(51, 21, 10)'];
	//轮播图
	var swiper = new Swiper('.swiper-container', {

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
	});
	var oBox = document.getElementsByClassName('swiper-container')[0];
	oBox.onmouseover = function() {
		swiper.autoplay.stop();
	}
	oBox.onmouseout = function() {
		swiper.autoplay.start();
	}
	
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
			console.log(obj);
			var html = obj.map(function(item) {
				return `
					<div class="hot_goods" id="${item.gid}">
						<a href="">
							<img src="../db_imgs/${item.fimgurl}" alt="" />
							<div class="imgbox">
								<h3>${item.name}</h3>
								<p>${item.desc}</p>
							</div>
						</a>
					</div>`
			}).join('');
			console.log(html)
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
			console.log(obj);
			var html = obj.map(function(item) {
				return `
					<li id="${item.gid}">
						<a href="">
							<img src="../db_imgs/${item.fimgurl}" alt="" />
							<div class="dt">
								<h4>${item.name}</h4><h5>${item.desc}</h5>
							</div>
						</a>
					</li>`
			}).join('');
			console.log(html)
			$('#hot_b').html(html);
		}
	})
})()
