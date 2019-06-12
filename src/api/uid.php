<?php
	include 'conn.php';
	$user = isset($_POST['user']) ? $_POST['user'] : '';
	$uid = '';
	//根据user找uid
	if($user) {
		$sql0 = "SELECT uid FROM `user` WHERE phone = $user";
		$res0 = $conn->query($sql0);
		$content0 = $res0->fetch_all(MYSQLI_ASSOC);
		
		$uid = $content0[0]['uid'];
	}
?>