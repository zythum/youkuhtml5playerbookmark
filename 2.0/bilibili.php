<?
$callback = $_GET['callback'];
$aid      = $_GET['aid'];
$page     = $_GET['page'];
$ua       = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17";

function bilibili($url){
	// 抓取网页URL
	// $url = "http://api.bilibili.tv/view?type=json&appkey=0f38c1b83b2de0a0&id=".$aid."&page=".$page;
	// 初始化，返回一个handler
	$ch  = curl_init($url);
	// curl_setopt($curl, CURLOPT_HEADER, 1);
	// 设置选项，有返回值
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	// 设置选项，来源页，这意味着可以伪造referer达到某种目的
	curl_setopt($ch, CURLOPT_REFERER, 'http://www.google.cn/');
	// 设置选项，浏览器信息
	curl_setopt($ch, CURLOPT_USERAGENT, $ua);
	// 执行
	$rs = curl_exec($ch);
	// 关闭handler
	curl_close($ch);
	return $rs;
}
echo("try{".$callback."(");
$rs = bilibili("http://api.bilibili.tv/view?type=json&appkey=0f38c1b83b2de0a0&id=".$aid."&page=".$page);
$json = get_object_vars(json_decode($rs));
$cid  = $json['cid'];
if(!$cid){
	$cid = "-1";
}
echo($cid);
echo(',');
$rs = bilibili("http://interface.bilibili.tv/playurl?otype=json&appkey=0f38c1b83b2de0a0&cid=".$cid."&type=mp4");
echo($rs);
echo(",");
$rs = bilibili("http://comment.bilibili.tv/".$cid.".xml");
$rs = gzinflate($rs);
$dom = new DOMDocument();
$dom->loadXML($rs);
$ds = $dom->getElementsByTagName('d');
foreach($ds as $d){
	$arrInfo['p'] = $d->getAttribute('p');
	$arrInfo['p'] = explode(',', $arrInfo['p']);
	$arrInfo['msg'] = $d->nodeValue;
	$arrInfos[] = $arrInfo;
}
echo(json_encode($arrInfos));
echo(")}catch(e){".$callback."(-1)}");
?>