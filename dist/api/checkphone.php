<?php
	include 'conn.php';
	
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	
	$sql = "SELECT * FROM `user` WHERE phone = $phone";
	
	$res = $conn->query($sql);
	
	if($res->num_rows) {
		echo 'no';//存在就no
	}else {
		echo 'yes';
	}
?>