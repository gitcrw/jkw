<?php
	include 'conn.php';
	
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	$password = isset($_POST['password']) ? $_POST['password'] : '';
	
	$sql = "SELECT * FROM `user` WHERE phone = $phone AND `password` = '$password'";
	
	$res = $conn->query($sql);
	
	if($res->num_rows) {
		echo 'yes';
	}else {
		echo 'no';
	}
?>