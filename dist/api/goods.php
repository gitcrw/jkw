<?php
	include'conn.php';
	//首页商品
	$star = isset($_POST['star']) ? $_POST['star'] : '';
	$end = isset($_POST['end']) ? $_POST['end'] : '';
	$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
	
	if($star) {
		$sql = "SELECT * FROM goods WHERE gid BETWEEN $star and $end";
	}else{
		$sql = "SELECT * FROM goods WHERE gid = $gid";
	}
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>