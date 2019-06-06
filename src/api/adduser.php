<?php
	include 'conn.php';
	
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	$password = isset($_POST['password']) ? $_POST['password'] : '';
	
	$sql = "INSERT INTO `user`(phone,password) VALUES ($phone,'$password')";
	
	$res = $conn->query($sql);
	
?>