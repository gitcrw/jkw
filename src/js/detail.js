(function() {
	//加载头部及菜单
	$('#head').load('head.html', function() {
		$('.menu_title,.list').mouseenter(function() {
			$('.list').css('display', 'block');
		})
		$('.list,.menu_title').mouseleave(function() {
			$('.list').css('display', 'none');
		})
	});
	
	//放大镜
	function big(ele) {
		var fdj = document.getElementById(ele);
		var pic = fdj.firstElementChild;
		var bigpic = fdj.lastElementChild;
		var box = pic.lastElementChild;
		var bimg = bigpic.lastElementChild;
		pic.onmouseenter = function() {
			box.style.display = 'block';
			bigpic.style.display = 'block';
		}
		pic.onmouseleave = function() {
			box.style.display = 'none';
			bigpic.style.display = 'none';
		}
		pic.onmousemove = function(ev) {
			var x = ev.pageX; //鼠标
			var y = ev.pageY;
			var l = pic.offsetLeft; //pic相对视口
			var t = pic.offsetTop;
			var left = x - l - box.offsetWidth / 2; //小方块的距离
			var top = y - t - box.offsetHeight / 2;
			if(left <= 0) {
				left = 0;
			} else if(left >= pic.offsetWidth - box.offsetWidth) { //最大滑动距离
				left = pic.offsetWidth - box.offsetWidth;
			}
			if(top <= 0) {
				top = 0;
			} else if(top >= pic.offsetHeight - box.offsetHeight) {
				top = pic.offsetHeight - box.offsetHeight;
			}
			box.style.left = left + 'px';
			box.style.top = top + 'px';
			// 滑动比例
			var w = left / (pic.offsetWidth - box.offsetWidth);
			var h = top / (pic.offsetHeight - box.offsetHeight);
			// 最大滑动距离 大图片-图片展示
			var b_l = bimg.offsetWidth - bigpic.offsetWidth;
			var b_t = bimg.offsetHeight - bigpic.offsetHeight;
			bimg.style.left = -b_l * w + 'px';
			bimg.style.top = -b_t * h + 'px';
		}
	}
	big('fdj');
	var picimg = document.getElementById('picimg');
	var bigimg = document.getElementById('bigimg');
	var picul = document.getElementsByClassName('picul')[0];
	var piclis = picul.children;
	picul.onmouseover = function(ev) {
		var imgurl = ev.target.src;
		if(imgurl != undefined) {
			picimg.src = imgurl;
			bigimg.src = imgurl;
		}
	}
	
	
	//根据商品gid查找数据库渲染
	var gid = decodeURI(location.search).slice(1);
	var xr = new Promise(function(resolve) {
		$.ajax({
			type: 'post',
			url: '../api/goods.php',
			data: {
				gid: gid
			},
			success: function(str) {
				resolve(str);
			}
		})
	});
	xr.then(function(str) {
		var obj = JSON.parse(str);
		console.log(obj);
		var html = obj.map(function(item) {
			return `<div class="info_t">
            		<div>
            			<h2>${item.name}</h2>
            			<span class="tspan1">${item.desc}</span>
            		</div>
            		<span class="tspan2">${item.affect}</span>
            	</div>
            	<div class="info_name">
            		<span class="spanl">通用名称：</span>
            		<a href="" class="info_a">${item.name}</a>
            	</div>
            	<div class="info_bh">
            		<span class="spanl">产品编号：</span>
            		<span>${item.bh}</span>
            	</div>
            	<div class="info_wh">
            		<span class="spanl">批准文号：</span>
            		<span>${item.wh}</span>
            	</div>
            	<div class="info_price">
            		<span class="spanl">价      格：</span>
            		<span class="price">￥${item.price}</span>
            	</div>
            	<div class="info_xz">
            		<span class="spanl">用药须知：</span>
            		<span>${item.know}</span>
            	</div>
            	<div class="info_place">
            		<span class="spanl">生产厂家：</span>
            		<a href="" class="info_a">${item.place}</a>
            	</div>
            	<div class="info_num">
            		<span class="spanl">购买数量：</span>
            		<input type="text" class="num_text" value="1"/>
            		<span class="jt_t"></span>
            		<span class="jt_b"></span>
            	</div>
            	<div class="info_btn">
            		<a href="" id="buy"></a>
            		<a href="" id="addcar"></a>
            	</div>`
		}).join('');
		$('#info').html(html);
		//图片渲染
		var imgarr = obj[0].imgurl.split(',');
		picimg.src = '../db_imgs/'+imgarr[0];
		bigimg.src = '../db_imgs/'+imgarr[0];
		//渲染
		var imghtml = imgarr.map(function(item) {
			return `<img src="../db_imgs/${item}">`
		}).join('');
		$('.picul').html(imghtml);
	})
})()