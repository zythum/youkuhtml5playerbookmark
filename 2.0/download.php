<?php
if($_GET['action']=='safariextz'){
	$file ='./youkuhtml5player.safariextz';   //要下载的路径文件
	$filename = 'youkuhtml5player.safariextz'; //这个只是文件的名字
	header("Content-Type: application/force-download");
	header("Content-Disposition: attachment; filename=".($filename));
	readfile($file);
}elseif($_GET['action']=='crx'){
	$file ='./youkuhtml5player.crx';   //要下载的路径文件
	$filename = 'youkuhtml5player.crx'; //这个只是文件的名字
	header("Content-Type: application/force-download");
	header("Content-Disposition: attachment; filename=".($filename));
	readfile($file);
}
?>
