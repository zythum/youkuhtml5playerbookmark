(function(){
if(window.isHTML5PlayerBookMarkCodeByZythum) return;
window.isHTML5PlayerBookMarkCodeByZythum = true;
var canPlayM3U8 = false;
if(!!document.createElement('video').canPlayType('application/x-mpegURL')){
	canPlayM3U8 = true;
	//alert('估计您的浏览器不能播放m3u8格式的视频。请使用safari。');
}
var type = false;
if(/youku\.com/.test(window.location.host) && window.videoId)                          type = "youku";
if(/tudou\.com/.test(window.location.host) && window.iid)                              type = "tudou";
if(/sohu\.com/.test(window.location.host) && window.vid)                               type = "sohu";
if(/iqiyi\.com/.test(window.location.host) && window.info && window.info.videoId)      type = "iqiyi";
if(/letv\.com/.test(window.location.host) && document.getElementById('fla_box'))       type = "letv";
if(/video\.sina\.com\.cn/.test(window.location.host) && window.$SCOPE && $SCOPE.video) type = "sina";
if(/v\.qq\.com/.test(window.location.host) && window.COVER_INFO)                       type = 'qq';
if(window.XL_CLOUD_FX_INSTANCE)                                                        type = 'xunlei';
if(/www\.56\.com/.test(window.location.host) && window._page_)                         type = '56';

if(type === false) return false;

var core = {	
	//获取元素的纵坐标 
	getTop: function(e){
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=core.getTop(e.offsetParent); 
		return offset; 
	} 
	//获取元素的横坐标 
	,getLeft: function(e){ 
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=core.getLeft(e.offsetParent); 
		return offset; 
	} 
	,cTag: function(tagName, className, out, html){
		var t = document.createElement(tagName)
		if(className){
			t.className = className;
		}
		if(out){
			out.appendChild(t)
		}
		if(html){
			t.innerHTML = html
		}
		return t
	}
	,rNode: function(node){
		try{
			node.parentNode.removeChild(node)
		}catch(e){}
	}
	,dClick: function(out){
		var  fnList = {}
			,flag = 'd_click'
			,handler = function(el){
				if(!el || el == out || !el.getAttribute || !el.tagName){
					return;
				}
				var  flag = el.getAttribute('data-click')
					,i
				if(flag && fnList[flag]){
					for(i=0;i<fnList[flag].length;i++){
						fnList[flag][i](el);
					}
				}
				handler(el.parentNode)
			}
			,fn = function(e){
				e = e || window.event
				handler(e.target || e.srcElement)
			}
			,add = function(flag, handler){
				if(!fnList[flag]){
					fnList[flag] = [];
				}
				fnList[flag].push(handler)
			}
		out.onclick = fn;
		return {
			 add: add
			 ,destroy: function(){
			 	out.onclick = null;
			 }
		}
	}
};
//msg
var isError       = false;
var MSG_ERROR     = '&#x8FBE;&#x6210;&#x5951;&#x7EA6;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x597D;&#x50CF;&#x51FA;&#x73B0;&#x4E86;&#x95EE;&#x9898;';

//==============================
var cover         = core.cTag('div',  'youkuhtml5playerbookmark2-cover'       );
var layer         = core.cTag('div',  'youkuhtml5playerbookmark2-layer'       );
var title         = core.cTag('div',  'youkuhtml5playerbookmark2-title'       , layer, '&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x7684;macbook&#x53D1;&#x70EB;&#x4E86;&#x8BA1;&#x5212;');
var player        = core.cTag('div',  'youkuhtml5playerbookmark2-player'      , layer);
var video         = core.cTag('video','youkuhtml5playerbookmark2-video'       , player);
var ctrlbar       = core.cTag('div',  'youkuhtml5playerbookmark2-ctrlbar youkuhtml5playerbookmark2-ctrlbarhover', player);
var progressNum   = core.cTag('div',  'youkuhtml5playerbookmark2-progressNum' , ctrlbar);
var progress      = core.cTag('div',  'youkuhtml5playerbookmark2-progress'    , ctrlbar);
var volume        = core.cTag('div',  'youkuhtml5playerbookmark2-volume'      , ctrlbar);
var btns          = core.cTag('div',  'youkuhtml5playerbookmark2-btns'        , ctrlbar);
var close         = core.cTag('div',  'youkuhtml5playerbookmark2-close'       , ctrlbar,'X');
var center        = core.cTag('div',  'youkuhtml5playerbookmark2-center'      , ctrlbar,'<div class="youkuhtml5playerbookmark2-center-before"></div><div class="youkuhtml5playerbookmark2-center-after"></div>');
var range_p       = core.cTag('div',  'youkuhtml5playerbookmark2-range'       , progress);
var rangeinner_p  = core.cTag('div',  'youkuhtml5playerbookmark2-rangeinner'  , range_p);
var rangebtn_p    = core.cTag('div',  'youkuhtml5playerbookmark2-rangebtn'    , rangeinner_p);
var range_v       = core.cTag('div',  'youkuhtml5playerbookmark2-range'       , volume);
var rangeinner_v  = core.cTag('div',  'youkuhtml5playerbookmark2-rangeinner'  , range_v);
var rangebtn_v    = core.cTag('div',  'youkuhtml5playerbookmark2-rangebtn'    , rangeinner_v);
var allscreen     = core.cTag('div',  'youkuhtml5playerbookmark2-btn'         , btns, '&#x6EE1;&#x5C4F;');
var fullscreen    = core.cTag('div',  'youkuhtml5playerbookmark2-btn'         , btns, '&#x5168;&#x5C4F;');

close.setAttribute(      'data-click','close'     );
fullscreen.setAttribute( 'data-click','fullscreen');
allscreen.setAttribute(  'data-click','allscreen' );
center.setAttribute(     'data-click','center'    );

video.setAttribute('autoplay','true');

var timer;
var isAllscreen = false;
var isBlack = false;
var destroy = true;
var currentTime = 0;
var dclick = core.dClick(layer);
var click = dclick.add;
var hdbtns = [];
var flashElement = undefined;
var flashElementPlaceHolder = core.cTag('div');
var job = {
	setUrl: function(obj){
		var i, btn;
		for(i in obj){
			btn = core.cTag('div', 'youkuhtml5playerbookmark2-btn' , null, i);
			btns.insertBefore(btn, btns.children[0]);
			btn.setAttribute('data-click','hd');
			btn.setAttribute('data-url',obj[i]);
			hdbtns.push(btn);
		}
		btn.className = 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select';
		video.src = obj[i];
	}
	,addUrl: function(obj){
		var i, btn;
		for(i in obj){
			btn = core.cTag('div', 'youkuhtml5playerbookmark2-btn' , null, i);
			btns.insertBefore(btn, btns.children[0]);
			btn.setAttribute('data-click','hd');
			btn.setAttribute('data-url',obj[i]);
			hdbtns.push(btn);
		}
	}
	,setFlashElement: function(el){
		try{
			flashElement = el;
			el.parentNode.insertBefore(flashElementPlaceHolder, flashElement);
			el.parentNode.removeChild(flashElement);
		}catch(e){}
	}
	,formatTime: function(time){
		var hour = parseInt(time/3600);
		var min  = parseInt((time-hour*3600)/60);
		var sec  = parseInt((time-hour*3600-min*60)/1);
		return hour+':'+min+':'+sec;
	}
	,showPlayer: function(){
		document.body.appendChild(cover);
		document.body.appendChild(layer);
		destroy = false;
	}
	,videoLayout: {
		width: 800,
		height: 450
	}
	,setVideoLayout: function(width, height){
		if(isAllscreen || document.webkitIsFullScreen) return;
		var _width    = 800;
		var _height   = _width / width * height || 450;
		if(_height > window.innerHeight - 80){
			_height   = window.innerHeight - 80
			_width    = _height / height * width;
			_width    = _width < 500 ? 500 : _width;
		}
		job.videoLayout.height = _height;
		job.videoLayout.width  = _width;
		job.fixVideoLayout();
	}
	,fixVideoLayout: function(){
		if(isAllscreen || document.webkitIsFullScreen){
			layer.style.width      = '';
			layer.style.marginLeft = '';
			layer.style.height     = '';
			layer.style.marginTop  = '';
		}else{
			layer.style.width      =       job.videoLayout.width    + 'px';
			layer.style.marginLeft = '-' + job.videoLayout.width/2  + 'px';
			layer.style.height     =       job.videoLayout.height   + 'px';
			layer.style.marginTop  = '-' + job.videoLayout.height/2 + 'px';
		}
	}
}
//切换清晰度
var setCurrentTimer;
click('hd', function(btn){
	var currentTime = video.currentTime;
	if(btn.className == 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select'){
		return;
	}
	var i=0,len=hdbtns.length;
	for(;i<len;i++){
		if(hdbtns[i].className != 'youkuhtml5playerbookmark2-btn')
			hdbtns[i].className = 'youkuhtml5playerbookmark2-btn';
	}
	btn.className = 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select';	
	video.src = btn.getAttribute('data-url');
	clearTimeout(setCurrentTimer);
	//记忆进度条， 内有坑
	var setCurrentTime = function(){
		try{
			clearTimeout(setCurrentTimer);
			video.currentTime = currentTime;		
		}catch(e){
			setCurrentTimer = setTimeout(setCurrentTime,100);
		}
	};
	setCurrentTime();
});

//点击全屏按钮
click('fullscreen', function(){
	if(document.webkitIsFullScreen){
		document.webkitCancelFullScreen();
	}else{
		player.webkitRequestFullScreen();
	}
});
click('allscreen', function(){
	if(document.webkitIsFullScreen) return;
	if(!isAllscreen){
		layer.className = 'youkuhtml5playerbookmark2-layer youkuhtml5playerbookmark2-full';
		allscreen.className = 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select';
		isAllscreen = true;
	}else{
		layer.className = 'youkuhtml5playerbookmark2-layer';
		allscreen.className = 'youkuhtml5playerbookmark2-btn';
		isAllscreen = false;
	}
	job.fixVideoLayout();
});
//点击x
click('close', function(){
	if(document.webkitIsFullScreen){
		document.webkitCancelFullScreen();
	}else{
		core.rNode(layer);
		core.rNode(cover);
		clearInterval(timer);
		destroy = true;
		video.src = '';
		video.pause();
		try{
			flashElementPlaceHolder.parentNode.insertBefore(flashElement, flashElementPlaceHolder);
			flashElementPlaceHolder.parentNode.removeChild(flashElementPlaceHolder);
		}catch(e){};
		delete window.isHTML5PlayerBookMarkCodeByZythum;
		player.removeEventListener('webkitfullscreenchange', playerWebkitfullscreenchangeHandler, false)
		center.removeEventListener('dblclick', centerDblclickHandler, false);
		document.body.removeEventListener('keydown', docKeydownHandler, false);
		video.removeEventListener('canplay', videoCanplayHandler, false);
		range_p.removeEventListener('mousedown', range_pMousedownHandler, false);
		range_v.removeEventListener('mousedown', range_vMousedownHandler, false);
		document.removeEventListener('mouseup', docMouseupHandler, false);
		document.removeEventListener('mousemove', docMousemoveHandler, false);
		player.removeEventListener('mousemove', playerMousemoveHandler, false);
		dclick.destroy();
	}
})

//点击暂停
var centerClickCount = 0;
var centerDblTimer;
click('center', function(){
	centerClickCount++;
	clearTimeout(centerDblTimer);
	centerDblTimer = setTimeout(function(){
		if(centerClickCount == 1){
			if(video.paused){
				video.play();
			}else{
				video.pause();
			}
		}
		centerClickCount = 0;
	},200);
});

//背景双击黑化
var coverDblclickHandler = function(){
	if(!isBlack){
		cover.className = 'youkuhtml5playerbookmark2-cover youkuhtml5playerbookmark2-block';
		isBlack = true;
	}else{
		cover.className = 'youkuhtml5playerbookmark2-cover';
		isBlack = false;
	}
}
cover.addEventListener('dblclick', coverDblclickHandler, false);
//双击全屏
var centerDblclickHandler = function(){
	if(destroy) return;
	if(document.webkitIsFullScreen){
		document.webkitCancelFullScreen();
	}else{
		player.webkitRequestFullScreen();
	}
};
center.addEventListener('dblclick', centerDblclickHandler, false);

//键盘快捷键
var docKeydownHandler = function(e){
	if(destroy) return;
	switch(e.keyCode){
		case 37: video.currentTime > 20 ? (video.currentTime = video.currentTime - 20): '';e.preventDefault();break;  //left
		case 39: video.currentTime < video.duration - 20 ? (video.currentTime = video.currentTime + 20): '';e.preventDefault();break;  //right
		case 40: video.volume > 0.1 ? (video.volume = video.volume - 0.1): '';e.preventDefault();break;  //down
		case 38: video.volume < 0.9 ? (video.volume = video.volume + 0.1): '';e.preventDefault();break;  //up
		case 32: video[video.paused?'play':'pause']();break; //space
	}
}
document.body.addEventListener('keydown', docKeydownHandler, false);

//全屏事件触发回调
var playerWebkitfullscreenchangeHandler = function(){
	if(destroy) return;
	job.fixVideoLayout();
	if(document.webkitIsFullScreen){
		layer.className = 'youkuhtml5playerbookmark2-layer youkuhtml5playerbookmark2-full';
		fullscreen.className = 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select';
		allscreen.style.display = 'none';
	}else{
		layer.className = isAllscreen ? 'youkuhtml5playerbookmark2-layer youkuhtml5playerbookmark2-full' : 'youkuhtml5playerbookmark2-layer';
		fullscreen.className = 'youkuhtml5playerbookmark2-btn';
		allscreen.style.display = '';
	}
}
player.addEventListener('webkitfullscreenchange', playerWebkitfullscreenchangeHandler, false)

//can play 回调
var videoCanplayHandler = function(){
	if(destroy) return;
	video.play();
	job.setVideoLayout(video.videoWidth, video.videoHeight);
}
video.addEventListener('canplay', videoCanplayHandler, false);


//进度条拖动
var FlagByRange_p = false;
var FlagByRange_v = false;

var range_pMousedownHandler = function(){
	if(destroy) return;
	FlagByRange_p = true;
}
range_p.addEventListener('mousedown', range_pMousedownHandler, false);

var range_vMousedownHandler = function(){
	if(destroy) return;
	FlagByRange_v = true;
}
range_v.addEventListener('mousedown', range_vMousedownHandler, false);

var docMouseupHandler = function(e){
	if(destroy) return;
	var length = 0;
	var pst = 0;
	if(FlagByRange_p){
		length = e.clientX - core.getLeft(rangeinner_p);		
		pst = length/rangeinner_p.offsetWidth;
		pst = pst>1?1:pst;
		pst = pst<0?0:pst;
		video.currentTime = video.duration*pst;
		rangebtn_p.style.width = (pst*100)+'%';
	}
	if(FlagByRange_v){
		length = e.clientX - core.getLeft(rangeinner_v);
		pst = length/rangeinner_v.offsetWidth;
		pst = pst>1?1:pst;
		pst = pst<0?0:pst;
		video.volume = pst;
		rangebtn_v.style.width = (pst*100)+'%';
	}
	FlagByRange_p = false;
	FlagByRange_v = false;
}
document.addEventListener('mouseup', docMouseupHandler, false);

var docMousemoveHandler = function(e){	
	if(destroy) return;
	var length = 0;
	var pst = 0;
	if(FlagByRange_p){
		length = e.clientX - core.getLeft(rangeinner_p);
		pst = length/rangeinner_p.offsetWidth;
		pst = pst>1?1:pst;
		pst = pst<0?0:pst;
		video.currentTime = video.duration*pst;
		rangebtn_p.style.width = (pst*100)+'%';
	}
	if(FlagByRange_v){
		length = e.clientX - core.getLeft(rangeinner_v);
		pst = length/rangeinner_v.offsetWidth;
		pst = pst>1?1:pst;
		pst = pst<0?0:pst;		
		video.volume = pst;
		rangebtn_v.style.width = (pst*100)+'%';
	}
}
document.addEventListener('mousemove', docMousemoveHandler, false);

var ctrlbarIsShow = true;
var ctrlbarTimer = setTimeout(function(){
	ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar';
},3000);

//鼠标移动显示工具
playerMousemoveHandler = function(){
	clearTimeout(ctrlbarTimer);
	if(ctrlbar.className != 'youkuhtml5playerbookmark2-ctrlbar youkuhtml5playerbookmark2-ctrlbarhover'){
		ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar youkuhtml5playerbookmark2-ctrlbarhover';
	}
	ctrlbarTimer = setTimeout(function(){
		ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar';
	},3000);
}

player.addEventListener('mousemove', playerMousemoveHandler, false);

//循环获取播放信息
var lastTime = -1;
var loop = function(){
	if(isError) return;
	if(!FlagByRange_p){
		rangebtn_p.style.width = (video.currentTime/video.duration*100)+'%';
	}
	if(!FlagByRange_v){
		rangebtn_v.style.width = (video.volume*100)+'%';
	}	
	progressNum.innerHTML = job.formatTime(video.currentTime) + ' / ' + job.formatTime(video.duration);
	if(video.paused){
		if(center.className != "youkuhtml5playerbookmark2-center youkuhtml5playerbookmark2-pause")
			center.className = "youkuhtml5playerbookmark2-center youkuhtml5playerbookmark2-pause";
	}else{
		if(center.className != "youkuhtml5playerbookmark2-center")
			center.className = "youkuhtml5playerbookmark2-center";
	}
	if(lastTime != video.currentTime || video.ended || video.readyState == 3 || video.readyState == 4 || video.readyState == 5){
		title.innerHTML = '&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x7684;macbook&#x53D1;&#x70EB;&#x4E86;&#x8BA1;&#x5212;';		
	}else{
		title.innerHTML = '&#x52C7;&#x6562;&#x7684;&#x5C11;&#x5E74;&#x8BF7;&#x8010;&#x5FC3;&#xFF0C;&#x5C11;&#x5973;&#x52AA;&#x529B;&#x7948;&#x7977;&#x4E2D;...';
		if(center.className != "youkuhtml5playerbookmark2-center youkuhtml5playerbookmark2-loading")
			center.className = "youkuhtml5playerbookmark2-center youkuhtml5playerbookmark2-loading";
	}
	lastTime = video.currentTime;
}
timer = setInterval(loop,300);
loop();

//=============================


//youku
(function(){
	if(type==='youku'){
		job.setFlashElement(document.getElementById('movie_player'));
		job.showPlayer();
		try{
			if(canPlayM3U8){
				//safari下使用m3u8
				job.setUrl({
					'&#x6807;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/flv/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8',
					'&#x9AD8;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/mp4/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8',
					'&#x8D85;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/hd2/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8'
				})
			}else{
				//chrome使用mp4
				// job.setUrl({
				// 	'&#x6807;&#x6E05;': 'http://3g.youku.com/pvs?id='+videoId2+'&format=3gphd'
				// })			
				//isError = true;
				//title.innerHTML = '&#x6731;&#x4E00;&#x6E23;&#x6280;&#x672F;&#xFF0C;&#x6682;&#x65F6;&#x6CA1;&#x6709;&#x7834;&#x8BD1;&#x51FA;&#x4F18;&#x9177;&#x7684;mp4&#x6E90;&#x3002;&#x8BF7;&#x4F7F;&#x7528;safari&#x53C2;&#x4E0E;&#x8BA1;&#x5212;';				
				function getFileIDMixString(seed){
					mixed = [];
					source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890".split('');
					var index, len = source.length;
					for (var i=0; i< len;i++){
						seed = (seed * 211 + 30031) % 65536;
						index = Math.floor(seed/65536 * source.length);
						mixed.push(source[index]);
						source.splice(index,1);
					}
					return mixed.join('');
				}
				function getFileID(fileid, seed){
					var mixed = getFileIDMixString(seed);
					var ids= fileid.split("*");
					var realId = [];
					var idx;
					for (var i=0; i< ids.length; i++){
						idx = parseInt(ids[i],10);
						realId.push(mixed.charAt(idx));
					}
					return realId.join('');
				}

				var scr  = document.createElement('script');
				var back = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
				scr.src  = 'http://v.youku.com/player/getPlaylist/VideoIDS/'+videoId+'/Pf/4?__callback='+back;
				window[back] = function(spec){
					var d      = new Date();
					var fileid = getFileID(spec.data[0]['streamfileids']['3gphd'], spec.data[0]['seed']);
					var sid    = d.getTime() + "" + (1E3 + d.getMilliseconds()) + "" + (parseInt(Math.random() * 9E3));
					var k      = spec.data[0]['segs']['3gphd'][0]['k'];
					var st     = spec.data[0]['segs']['3gphd'][0]['seconds'];
					var scr    = document.createElement('script');
					var back2  = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
					scr.src    = 'http://f.youku.com/player/getFlvPath/sid/'+sid+'_00/st/mp4/fileid/'+fileid+'?K='+k+'&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback='+back2;
					window[back2] = function(spec){
						url = spec[0]['server'];
						job.setUrl({
							'&#x9AD8;&#x6E05;': url
						})
						delete window[back2];
					};
					document.body.appendChild(scr);	
					delete window[back];
				};
				document.body.appendChild(scr);
			}
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();


//tudou
(function(){
	if(type==='tudou'){
		job.setFlashElement(document.getElementById('playerObject'));
		job.showPlayer();
		try{
			var pad = function(num, n) {
		        return (new Array(n >(''+num).length ? (n - (''+num).length+1) : 0).join('0') + num);
			}
			iidStr = pad(iid,9).match(/(\d{3})(\d{3})(\d{3})/);	
			var idEncodeed = iidStr[1] + '/' + iidStr[2] + '/' + iidStr[3];
			if(canPlayM3U8){
				//safari下使用m3u8
				job.setUrl({
					'&#x6807;&#x6E05;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'2.m3u8',
					'&#x9AD8;&#x6E05;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'3.m3u8',			
					'&#x539F;&#x753B;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'99.m3u8'
				})
			}else{
				//chrome使用mp4
				var scr  = document.createElement('script');
				var back = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
				scr.src  = 'http://vr.tudou.com/v2proxy/v2.js?it='+iid+'&st=52%2C53%2C54&pw=&jsonp='+back;
				window[back] = function(spec){
					var urls = {};
					var list = {
						52: '&#x672A;&#x77E5;0',
						53: '&#x672A;&#x77E5;1',
						54: '&#x672A;&#x77E5;2'
					}
					try{
						for(var i=0;i<spec.urls.length;i++){
							urls[list[ spec.urls[i]['st'] ]] = spec.urls[i]['url'];
						}
						job.setUrl(urls);
					}catch(e){
						isError = true;
						title.innerHTML = 'mp4&#x8F6C;&#x7801;&#x672A;&#x5B8C;&#x6210;&#xFF0C;&#x4F11;&#x606F;&#x4F11;&#x606F;&#x4E00;&#x4E0B;&#xFF1F;&#x8981;&#x4E0D;&#x5148;&#x6253;&#x4E2A;&#x98DE;&#x673A;&#xFF1F;';
					};
					delete window[back];
				}
				document.body.appendChild(scr);		
			}
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();

//sohu
(function(){
	if(type==="sohu"){
		job.setFlashElement(document.getElementById('player'));
		job.showPlayer();
		try{
			if(canPlayM3U8){
				//safari下使用m3u8
				job.setUrl({
					'&#x9AD8;&#x6E05;': 'http://hot.vrs.sohu.com/ipad'+vid+'.m3u8'
				});
				//搜狐m3u8可能会出现一些音视频不同步的问题。引入mp4源
				var appkey = 'f351515304020cad28c92f70f002261c';
				var scr    = document.createElement('script');
				var back   = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
				scr.src    = 'http://api.tv.sohu.com/video/playinfo/'+vid+'.json?callback='+back+'&encoding=gbk&api_key='+appkey+'&from=mweb&_='+(new Date()).getTime();
				window[back] = function(spec){
					try{
						job.addUrl({
						'MP4': spec.data.downloadurl
						})
					}catch(e){};
					delete window[back];
				}
				document.body.appendChild(scr);
			}else{
				//chrome使用mp4
				var appkey = 'f351515304020cad28c92f70f002261c';
				var scr    = document.createElement('script');
				var back   = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
				scr.src    = 'http://api.tv.sohu.com/video/playinfo/'+vid+'.json?callback='+back+'&encoding=gbk&api_key='+appkey+'&from=mweb&_='+(new Date()).getTime();
				window[back] = function(spec){
					try{
						job.setUrl({
						'&#x9AD8;&#x6E05;': spec.data.downloadurl
						})
					}catch(e){};
					delete window[back];
				}
				document.body.appendChild(scr);		
			}
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();

//iqiyi
(function(){
	if(type==="iqiyi"){
		job.setFlashElement(document.getElementById('flash'));
		job.showPlayer();
		try{
			var scr = document.createElement('script');
			scr.src = 'http://cache.video.qiyi.com/m/201971/'+window.info.videoId+'/';
			document.body.appendChild(scr);
			var timer;
			timer = setInterval(function(){
				if(window.ipadUrl){
					clearInterval(timer);
					if(canPlayM3U8){
						//safari下使用m3u8
						job.setUrl({
							'&#x9AD8;&#x6E05;': ipadUrl.data.url
						});
					}else{
						//chrome使用mp4
						var mp4Url = ipadUrl.data.mp4Url;
						var scr = document.createElement('script');
						scr.src = mp4Url;
						document.body.appendChild(scr);
						timer = setInterval(function(){
							if(window.videoUrl){
								clearInterval(timer);
								job.setUrl({
									'&#x9AD8;&#x6E05;': videoUrl.data.l
								});
							}
						},100);
					}
				}
			},100);			
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();

//letv
(function(){
	var getNextScript = function(el){
		if(!el) return false;
		if(!el.nextSibling) return false;
		if(el.nextSibling.tagName && el.nextSibling.tagName.toUpperCase() == 'SCRIPT'){
			return el.nextSibling;
		}else{
			return getNextScript(el.nextSibling);
		}
	}
	if(type==="letv"){		
		var flash = document.getElementById('fla_box');
		var script = getNextScript(flash);
		if(flash && script){
			job.setFlashElement(flash);
			job.showPlayer();			
			try{
				if(canPlayM3U8){
					var temp = LELib.Revive.Player;
					var isfirst = true;
					var value;
					LELib.Revive.Player = function(){
						value = arguments[2];
					}
					eval(script.innerHTML);
					LELib.Revive.Player = temp;
					var urls = {};
					if(value.v[1]) urls['&#x6807;&#x6E05;'] = LETV.Base64.decode(value.v[1]);
					if(value.v[0]) urls['&#x9AD8;&#x6E05;'] = LETV.Base64.decode(value.v[0]);
					if(urls){
						job.setUrl(urls);						
					}
				}else{
					isError = true;
					title.innerHTML = 'letv&#x53EA;&#x63D0;&#x4F9B;&#x4E86;&#x6CA1;m3u8&#x7684;&#x6E90;&#x3002;&#x8BF7;&#x4F7F;&#x7528;safari&#x53C2;&#x4E0E;&#x8BA1;&#x5212;';
				}
			}catch(e){
				isError = true;
				title.innerHTML = MSG_ERROR;
			};
		}
	}
})();

//sina
(function(){
	if(type==="sina"){
		job.setFlashElement(document.getElementById('myMovie'));
		job.showPlayer();
		try{
			var id = $SCOPE.video.videoData.ipad_vid;
			job.setUrl({
				'&#x9AD8;&#x6E05;': 'http://edge.v.iask.com.sinastorage.com/'+id+'.mp4'
			})			
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();

//qq
(function(){
	if(type==="qq"){
		job.setFlashElement(document.getElementById('mod_player'));
		job.showPlayer();
		try{
			var vid  = location.search.match(/vid=([0-9a-zA-Z]+)/);
			if(vid){
				vid = vid[1];
			}else{
				vid = location.href.match(/\/([0-9a-zA-Z]+).html/);
				if(vid){
					vid = vid[1];
					if(window.COVER_INFO.id == vid){
						vid = window.VIDEO_INFO.vid;
					}
				}
			}
			if(!vid) return;
			var scr  = document.createElement('script');
			var back = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
			scr.src  = 'http://vv.video.qq.com/geturl?otype=json&vid='+vid+'&charge=0&callback='+back;
			window[back] = function(spec){
				var url = spec.vd.vi[0].url;				
				job.setUrl({
					'&#x9AD8;&#x6E05;': url
				});				
				delete window[back];
			}
			document.body.appendChild(scr);		
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		}
	}
})();

//xunlei
(function(){
	if(type==="xunlei"){
		job.setFlashElement(document.getElementById('mod_player'));
		job.showPlayer();
		try{
		var back       = 'HTML5PlayerBookMarkCodeByZythum'+ new Date().getTime();
		var cache      = new Date().getTime();
		var sessionid  = document.cookie.match(/sessionid=([0-9a-zA-z]+)/);
		var scr        = document.createElement('script');
		sessionid      = sessionid && sessionid[1];
		scr.src        = ('http://i.vod.xunlei.com/req_try_vod'+location.search+'&cache='+cache+'&sessionid='+sessionid+'&jsonp='+back+'&platform=1&vip=1').replace('filename','video_name');
		window[back]   = function(spec){
			var urls = {};
			if(spec.resp.vodinfo_list[0]) urls['&#x6D41;&#x7545;'] = spec.resp.vodinfo_list[0]['vod_url'];
			if(spec.resp.vodinfo_list[1]) urls['&#x9AD8;&#x6E05;'] = spec.resp.vodinfo_list[1]['vod_url'];
			if(spec.resp.vodinfo_list[2]) urls['&#x8D85;&#x6E05;'] = spec.resp.vodinfo_list[2]['vod_url'];
			if(!urls) return;
			job.setUrl(urls);			
			delete window[back];
		}
		document.body.appendChild(scr);		
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		};
	}
})();

//56
(function(){
	if(type==="56"){
		var flash = document.getElementById('mm_ios_play') || document.getElementById('VideoPlayObject');
		job.setFlashElement(flash);
		job.showPlayer();
		try{
			if(_page_.channel == 'view'){
				var vid  = location.href.match(/v\_([0-9a-zA-Z]+)\.html/);
				if(vid){
					vid = vid[1];
					job.setUrl({'&#x9AD8;&#x6E05;': 'http://vxml.56.com/m3u8/'+vid+'/'});
				}else{
					isError = true;
					title.innerHTML = MSG_ERROR;
				}
			}else{
				var back       = 'jsonp_dfInfo';
				var scr        = document.createElement('script');
				scr.src        = 'http://vxml.56.com/ipad/'+(window.oFlv.o.id || window._oFlv_c.id)+'/?src=site&callback='+back;
				var backup     = window[back];
				window[back]   = function(spec){
					urlList = spec.df;
					var urls = {};
					for(var i=spec.df.length-1;i>=0;i--){
						if(spec.df[i]['type'] == 'normal'){
							urls['&#x6D41;&#x7545;'] = spec.df[i]['url'];
						}else if(spec.df[i]['type'] == 'high'){
							urls['&#x9AD8;&#x6E05;'] = spec.df[i]['url'];
						}
					}
					job.setUrl(urls);
					window[back] = backup;
				}
				document.body.appendChild(scr);
			}	
		}catch(e){
			isError = true;
			title.innerHTML = MSG_ERROR;
		};
	}
})();


})();