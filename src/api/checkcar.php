<?php
	
	include 'uid.php';
	
	if($uid) {
		
		$sql = "SELECT SUM(num) FROM goodscar WHERE uid = $uid";
	
		$res = $conn->query($sql);
		
		$content = $res->fetch_all(MYSQLI_ASSOC);
		
		
		if($content[0]['SUM(num)']=='') {
			echo 0;
		}else {
			echo $content[0]['SUM(num)'];//该用户购物车总量
		}
		
	}
	
?>