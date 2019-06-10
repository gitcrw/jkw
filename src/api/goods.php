<?php
	include'conn.php';
	
	$star = isset($_POST['star']) ? $_POST['star'] : '';
	$end = isset($_POST['end']) ? $_POST['end'] : '';
	
	$sql = "SELECT * FROM goods WHERE gid BETWEEN $star and $end";
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>