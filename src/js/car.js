(function() {
	$('#head').load('head.html');
	$('#foot').load('foot.html');
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
		$('#goods_info ul').eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
	})

	if(getCookie('user') && getCookie('pwd')) {
		$('.tologin').css('display', 'none');
		$('#goods_info').css('display', 'block');
	} else {
		$('.tologin').css('display', 'block');
		$('#goods_info').css('display', 'none');
	}

	//购物车商品渲染
	if(getCookie('user') && getCookie('pwd')) {
		var cargoods = new Promise(function(resolve) {
			$.ajax({
				type: 'post',
				url: '../api/cargoods.php',
				data: {
					user: getCookie('user')
				},
				success: function(str) {
					resolve(str);
				}
			})
		})
		cargoods.then(function(data) {

			var obj = JSON.parse(data);

			//渲染商品信息
			var html = obj.goods.map(function(item) {
				var	imgarr = [];
				if(!item.imgurl) {//有图片的换详情图片
					imgarr.push(item.fimgurl);
				} else {
					imgarr = item.imgurl.split(',');
				}
				return `<li gid="${item.gid}" onselectstart="return false">
							<span class="spanl item"></span>
							<a href="detail.html?${item.gid}" target="_blank"><img src="../db_imgs/${imgarr[0]}" alt="" /></a>
							<p class="name_p"><a href="detail.html?${item.gid}" target="_blank">${item.name}</a></p>
							<p class="spec_p">规格：10g*9袋（999）</p>
							<p class="price_p">${item.price}</p>
							<div class="shop_num" >
								<span class="num_btn down">-</span>
								<input type="text" value="1" class="num_text"/>
								<span class="num_btn up">+</span>
							</div>
							<p class="min_total">${item.price}</p>
							<a href="javascript:void(0);" class="del">删除</a>
						</li>`
			}).join('');
			$('.goods_info').html(html);
			//渲染商品数量及小计
			obj.num.forEach(function(item, i) {
				$('.num_text').eq(i).val(item);
				$('.min_total').eq(i).html(((obj.goods[i].price)*(obj.num[i])).toFixed(2))
			})

			//数量选择
			//加
			$('.shop_num').on('click', '.up', function() {
				var num = $(this).prev().val();
				var price = $(this).parent().prev().html();
				var gid = $(this).parent().parent().attr('gid')
				num++;
				$(this).prev().val(num);
				changeNum(gid,num,'change');
				$(this).parent().next().html(minTotal(price,num));
				Total();
			})
			//减
			$('.shop_num').on('click', '.down', function() {
				var num = $(this).next().val();
				var price = $(this).parent().prev().html();
				var gid = $(this).parent().parent().attr('gid')
				num--;
				if(num <= 1) {
					num = 1;
				}
				$(this).next().val(num);
				changeNum(gid,num,'change')
				$(this).parent().next().html(minTotal(price,num));
				Total();
			})
			//手动输入
			$('.num_text').on('input click', function() {
				var num = $(this).val() - 0;
				var price = $(this).parent().prev().html();
				var gid = $(this).parent().parent().attr('gid')
				if(num <= 1) {
					num = 1;
				}
				$(this).val(num);
				changeNum(gid,num,'change')
				$(this).parent().next().html(minTotal(price,num));
				Total();
			})
			//单选择
			$('.item').on('click',function() {
				
				if($(this).attr('status') == 'true') {
					$(this).removeClass('select').attr('status',false);
				}else{
					$(this).addClass('select').attr('status',true);
				}
				if($('.item').size() == $("[status='true']").size()) {
					$('.allselect').addClass('select').attr('status',true);
				}else{
					$('.allselect').removeClass('select').attr('status',false);
				}
				Total();
			})
			//全选
			$('.allselect').on('click',function() {
				if($(this).attr('status') == 'true') {
					$('.item').removeClass('select').attr('status',false);
					$('.allselect').removeClass('select').attr('status',false);
				}else{
					$('.item').addClass('select').attr('status',true);
					$('.allselect').addClass('select').attr('status',true);
				}
				Total();
			})
			
			//删除
			$('.del').on('click',function() {
				var del = window.confirm('你确定要删除吗?');
				if(del) {
					var gid = $(this).parent().attr('gid');
					console.log(gid)
					deleteCar(gid);
					Total();
					checkNull();
				}
			});
			//删除选中
			$('#all_detele').on('click',function() {
				if($(".item[status='true']").size() == 0) {
					alert('你没有选中商品哦!')
				}else{
					var del = window.confirm('你确定要删除吗?');
					if(del){
						$(".item[status='true']").each(function(i,item) {
							var gid = $(item).parent().attr('gid');
							deleteCar(gid);
						})
						Total();
						checkNull();
					}
				}
			})
			
			//结算
			$('#js_btn').click(function() {
				if($(".item[status='true']").size() == 0) {
					alert('你没有选中商品哦!')
				}else{
					var del = window.confirm('是否结算呢?');
					if(del){
						$(".item[status='true']").each(function(i,item) {
							var gid = $(item).parent().attr('gid');
							deleteCar(gid);
						})
						alert('结算成功！你购买了'+$(select_num).html()+'件商品，共花费了'+$('#all_price').html() + '元');
						Total();
						checkNull();
					}
				}
			});
			
			//刷新检查是否有商品，没有则隐藏商品栏
			checkNull();
			function checkNull() {
				if($(".item").size() == 0) {
					$('#goods_info').css('display','none')
				}
			}
			function Total() {
				var num = 0;
				var min_total = 0;
				$(".item[status='true']").each(function(i,item) {
					num += parseFloat($(item).parent().find('.num_text').val());
					min_total += parseFloat($(item).parent().find('.min_total').html());
				})
				$('#select_num').html(num);
				$('#all_price').html(min_total.toFixed(2));
			}
			function minTotal(price,num) {
				return (price*num).toFixed(2);
			}
			function changeNum(gid,num,change) {
				$.ajax({
					type : 'post',
					url : '../api/addcar.php',
					data : {
						user : getCookie('user'),
						gid : gid,
						num : num,
						change : change
					}
				})
			}
			function deleteCar(gid) {
				$('.goods_info li[gid=' + gid +']').remove();
				$.ajax({
					type : 'post',
					url : '../api/deletecar.php',
					data : {
						user : getCookie('user'),
						gid : gid
					}
				})
			}
		})
	}
})()