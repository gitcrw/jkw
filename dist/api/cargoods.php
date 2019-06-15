<?php
	//购物车商品
	include 'uid.php';
	
	$sql = "SELECT * FROM goodscar WHERE uid = $uid";
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	$arr = array();
	
	$goodsnum = $res->num_rows; //有多少种商品
	
	for($i = 0; $i < $goodsnum; $i++) {
		$arr[] = $content[$i]['gid'];//拿到购物车商品gid
	}
	 
	$arr1 = array();
	
	foreach($arr as $value) {
		$sql1 ="SELECT * FROM goods WHERE gid = $value";
		$res1 = $conn->query($sql1);
		$content1 = $res1->fetch_all(MYSQLI_ASSOC);
		$arr1[] = $content1[0];//拿到商品信息
	}
	
	$arr2 = array();
	
	for($i = 0; $i < $goodsnum; $i++) {
		$arr2[] = $content[$i]['num'];//拿到购物车商品单个数量
	}
	
	$goods = array(
		'goods' => $arr1,
		'num' => $arr2
	);
	echo json_encode($goods,JSON_UNESCAPED_UNICODE);
?>