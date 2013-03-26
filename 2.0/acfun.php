<?
$callback = $_GET['callback'];
$aid      = $_GET['aid'];
$ua       = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17";

function acfun($url){
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
// echo("try{");
echo($callback."(");
$rs = acfun("http://www.acfun.tv/v/".$aid);
preg_match("/\[video\]([0-9a-zA-Z]+)\[\/video\]/i", $rs, $matches);
if($matches){	
	$vid = $matches[1];
	$rs = acfun("http://www.acfun.tv/api/getVideoByID.aspx?vid=".$vid);
	$json = get_object_vars(json_decode($rs));
	$cid = $vid = $json['vid'];
	if(!$vid){
		$vid = "-1";
	}
	$type = $json['vtype'];
	if($type == 'sina'){
		if(strpos($json['vurl'],"you.sina.com.cn") >= 0){
			preg_match("/\/([0-9\-]+)\.html/i", $json['vurl'], $matches);			
			if($matches){				
				$json['vurl'] = 'http://video.sina.com.cn/v/b/'.$matches[1].'.html';
			}
		}		
		$rs = acfun($json['vurl']);
		preg_match("/ipad_vid\:\'([0-9a-zA-Z]+)\'\,/i", $rs, $matches);
		if($matches){
			$vid = $matches[1];			
		}
	}
	echo('"'.$vid.'"');
	echo(',');
	echo('"'.$type.'"');
}
echo(",");
$rs = acfun("http://comment.acfun.tv/".$cid.".json");
$rs = get_object_vars(json_decode('{"comment":'.$rs.'}'));
$rs = $rs['comment'];
foreach ($rs as $one){
	$one = get_object_vars($one);
	$one['c'] = explode(',', $one['c']);
	$arrInfo['p'][0] = $one['c'][0];
	$arrInfo['p'][1] = $one['c'][2];
	$arrInfo['p'][2] = $one['c'][3];
	$arrInfo['p'][3] = $one['c'][1];
	$arrInfo['p'][4] = $one['c'][5];
	$arrInfo['p'][5] = "0";
	$arrInfo['p'][6] = $one['c'][4];
	$arrInfo['p'][7] = "";
	$arrInfo['msg'] = $one['m'];
	$arrInfos[] = $arrInfo;
}
echo(json_encode($arrInfos));
echo(");");
// echo("}catch(e){".$callback."(-1)}");
?>