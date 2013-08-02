<?
$callback = $_GET['callback'];
$vid     = $_GET['vid'];
$nid     = $_GET['nid'];
$ua       = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17";

function fatch($url){
	// 抓取网页URL
	// $url = "http://api.bilibili.tv/view?type=json&appkey=&id=".$aid."&page=".$page;
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

$html = fatch('http://m.tv.sohu.com/'.$vid.'/n'.$nid.'.shtml');
preg_match("/var\ VideoData\ \=\ (\{.*\})\;/s", $html, $script);
$script = $script[1];
echo("try{".$callback."(");
echo($script);
echo(")}catch(e){".$callback."(-1)}");
?>