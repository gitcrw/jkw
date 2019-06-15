<?php
	$severname = 'localhost';
	$username = 'root';
	$userpwd = '';
	$dbname = '1904';
	
	$conn = new mysqli($severname,$username,$userpwd,$dbname);
	
	mysqli_query($conn,"set names utf8");
?>