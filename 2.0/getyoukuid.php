<?
$id       = $_GET['id'];
$callback = $_GET['callback'];
$ua       = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17";
$url      = "http://v.youku.com/v_show/id_".$id.".html";
$ch       = curl_init($url);
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
preg_match('/var\s+videoId\s*\=\s*\'([0-9]+)\'\s*\;/', $rs, $matches);

$ua       = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17";
$url      = "http://v.youku.com/player/getPlaylist/VideoIDS/".$matches[1]."/Pf/4?__callback=".$callback;
$ch       = curl_init($url);
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

echo($rs);
?>