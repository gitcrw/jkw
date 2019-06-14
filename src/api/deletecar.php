<?php
	include 'uid.php';
	
	$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
	
	$sql = "DELETE FROM goodscar WHERE gid = $gid AND uid = $uid";
	
	$res = $conn->query($sql);
	
?>