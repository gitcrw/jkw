<?php
	include 'conn.php';
	
	$pagenum = isset($_POST['pagenum']) ? $_POST['pagenum'] : '';//当前第几页
	
	$num = isset($_POST['num']) ? $_POST['num'] : '';//每页要显示多少个
	
	$star = ($pagenum - 1)* $num;
	
	$sql = "SELECT * FROM goods LIMIT $star,$num";
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	$sql1 = "SELECT * FROM goods";
	
	$res1 = $conn->query($sql1);
	
	$allnum = $res1->num_rows;
	
	$arr = array(
		"content"=> $content,
		'allnum'=> $allnum
	);
	
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>