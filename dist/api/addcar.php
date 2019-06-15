<?php
	include 'uid.php';

	$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
	$num = isset($_POST['num']) ? $_POST['num'] : '';
	$change = isset($_POST['change']) ? $_POST['change'] : '';
	$sql1 = "SELECT * FROM goodscar WHERE uid = $uid AND gid = $gid";
	
	$res1 = $conn->query($sql1);
	
	if($res1->num_rows) {
		//已经存在，修改数量
		if($change) {
			$sql2 = "UPDATE goodscar SET num = $num WHERE uid = $uid AND gid = $gid";
		}else {
			$sql2 = "UPDATE goodscar SET num = num+$num WHERE uid = $uid AND gid = $gid";
		}
	}else {
		//不存在，插入数据
		$sql2 = "INSERT INTO goodscar (gid,uid,num) VALUES($gid,$uid,$num)";
	}
	
	$res2 = $conn->query($sql2);
?>