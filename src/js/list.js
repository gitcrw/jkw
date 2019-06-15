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
	$('#foot').load('foot.html')
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
	$('.itemChoose i').on('click', function() {
		$(this).toggleClass('show')
		$(this).parent().next().stop(true).slideToggle();
	})

	//排序
	$('.sort span').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	})
	var pagenum = 1;
	var num = 24;
	PageSelect();
	Pages();
	
	function PageSelect() {
		$.ajax({
			type: "post",
			url: "../api/goodslist.php",
			data: {
				pagenum: pagenum,
				num: num
			},
			success: function(str) {
				var obj = JSON.parse(str);
				var html = obj.content.map(function(item) {
					return `<li gid="${item.gid}">
							<a href="detail.html?${item.gid}" target="_blank">
								<img src="../db_imgs/${item.fimgurl}" alt="" />
								<div class="goods_info">
									<span class="goods_price">￥<i class="price">${item.price}</i></span>
									<p>${item.affect}</p>
									<a class="look">查看详情</a>
								</div>
							</a>
							</li>`
				}).join('');
				setTimeout(jz, 400);
				setTimeout(show,400);
				function jz() {
					$('.goods-list').html(html);
				}
				function show() {
					$('.page').css('display','block');
				}
				
			}
		});
	}
	var left = 0;//分页位移
	function Pages() {
		$.ajax({
			type: "post",
			url: "../api/goodslist.php",
			data: {
				pagenum: pagenum,
				num: num
			},
			success: function(str) {
				var obj = JSON.parse(str);
				var pages = Math.ceil(obj.allnum / num);
				$('.page_num').html(pages)//总共页码
				console.log(pages)
				//生成页数
				var pagehtml = '';
				for(var i = 0; i < pages; i++) {
					pagehtml += '<span>' + (i + 1) + '</span>';
				}
				
				$('.page-item').html(pagehtml);
				showactive()//当前页高亮
				noClick();//禁止点击
				//点击页数////////////////////////////一团糟我快炸了
				$('.page-item span').click(function() {
					refsh();
					if($(this).html() > pagenum) {
						if($(this).html() >=5 && $(this).html() < pages - 2) {
							if(pagenum <= 5) {
								var n = $(this).html() - 5;
							}else{
								var n = $(this).html() - pagenum;
							}
							left += -37 * n;
							$('.page-item').css('left',left+'px');
						}
						else if($(this).html() >= pages - 3) {
							left = (pages - 8) * -37
							$('.page-item').css('left',left+'px');
						}
						
					}else if($(this).html() < pagenum){
						if($(this).html() <= 5) {
							left = 0;
							$('.page-item').css('left',left+'px');
						}else{
							if($(this).html()>= pages - 3) {
								left = (pages - 8) * -37
							}else{
								if(pagenum < pages - 3) {
									var n = pagenum - $(this).html();
								}else {
									var n = pages - 3 - $(this).html();
								}
								left += 37 * n;
							}
							$('.page-item').css('left',left+'px');
						}
					}
					pagenum = $(this).index() + 1;
					hidePage();
					PageSelect();
					noClick();
					showactive();
					
				})
				//上一页
				$('.prev').click(function() {
					if(pagenum > 1) {
						pagenum--;
						hidePage();
						PageSelect();
						$('.page-item span').eq(pagenum - 1).addClass('active').siblings().removeClass('active');
						refsh();
					}
					noClick();
					if(pagenum >= 5 && pagenum < pages - 3) {
						left += 37;
						$('.page-item').css('left',left+'px');
						hidePage();
						refsh();
					}
					showactive();
					
				})
				//下一页
				$('.next').click(function() {
					if(pagenum < pages) {
						pagenum++;
						hidePage();
						PageSelect();
						$('.page-item span').eq(pagenum - 1).addClass('active').siblings().removeClass('active');
						refsh();
					}
					noClick();
					if(pagenum>5 && pagenum < pages - 2) {
						left += -37;
						$('.page-item').css('left',left+'px');
						refsh();
					}
					showactive();
					
				})
				//跳转页
				$('.confirm').click(function() {
					pagenum = $('.tonum').val();
					if(pagenum <= pages) {
						hidePage();
						PageSelect();
						if(pagenum >= pages - 3) {
							left = (pages - 8) * -37;
						}else if(pagenum <= 5){
							left = 0;
						}else if(pagenum < pages - 3  && pagenum > 5){
							var n = pagenum - 5;
							left = n * -37;
						}
						$('.page-item').css('left',left+'px');
						showactive();
						refsh();
						noClick();
						$('.tonum').val('');
					}else{
						alert('请输入正确页码哦')
					}
				})
				function noClick() {
					if(pagenum == 1) {
						$('.prev').addClass('noclick');
					}else{
						$('.prev').removeClass('noclick');
					}
					if(pagenum == pages) {
						$('.next').addClass('noclick');
					}else{
						$('.next').removeClass('noclick');
					}
				}
				function showactive() {
					$('.page-item span').eq(pagenum-1).addClass('active').siblings().removeClass('active');
				}
				function refsh() {
					$('.goods-list').html('');
					$('html, body').animate({ scrollTop: 0 }, 0); //slow回滚
				}
				function hidePage() {
					$('.page').css('display','none');
				}

			}
		})
	}

})()