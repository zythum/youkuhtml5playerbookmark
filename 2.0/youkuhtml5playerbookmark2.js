(function(){
if(window.isHTML5PlayerBookMarkCodeByZythum) return;
window.isHTML5PlayerBookMarkCodeByZythum = true;
if(!document.createElement('video').canPlayType('application/x-mpegURL')){
	alert('估计您的浏览器不能播放m3u8格式的视频。请使用safari。');
}
var type = false;
if(/youku\.com/.test(window.location.host) && window.videoId)                     type = "youku";
if(/tudou\.com/.test(window.location.host) && window.iid)                         type = "tudou";
if(/sohu\.com/.test(window.location.host) && window.vid)                          type = "sohu";
if(/iqiyi\.com/.test(window.location.host) && window.info && window.info.videoId) type = "iqiyi";

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
		}
	}
};
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
var center        = core.cTag('div',  'youkuhtml5playerbookmark2-center'      , ctrlbar);
var range_p       = core.cTag('div',  'youkuhtml5playerbookmark2-range'       , progress);
var rangeinner_p  = core.cTag('div',  'youkuhtml5playerbookmark2-rangeinner'  , range_p);
var rangebtn_p    = core.cTag('div',  'youkuhtml5playerbookmark2-rangebtn'    , rangeinner_p);
var range_v       = core.cTag('div',  'youkuhtml5playerbookmark2-range'       , volume);
var rangeinner_v  = core.cTag('div',  'youkuhtml5playerbookmark2-rangeinner'  , range_v);
var rangebtn_v    = core.cTag('div',  'youkuhtml5playerbookmark2-rangebtn'    , rangeinner_v);
var fullscreen    = core.cTag('div',  'youkuhtml5playerbookmark2-btn'         , btns, '&#x5168;&#x5C4F;');

close.setAttribute('data-click','close');
fullscreen.setAttribute('data-click','fullscreen');
center.setAttribute('data-click','center');
video.setAttribute('autoplay','true');
var timer;
var destroy = true;
var currentTime = 0;
var click = core.dClick(layer).add;
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
	,setFlashElement: function(el){
		flashElement = el;
		el.parentNode.insertBefore(flashElementPlaceHolder, flashElement);
		el.parentNode.removeChild(flashElement);
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
}
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
	setTimeout(function(){
		video.currentTime = currentTime;
	},1000);
});
click('fullscreen', function(){
	if(document.webkitIsFullScreen){
		document.webkitCancelFullScreen();
	}else{
		player.webkitRequestFullScreen();
	}
});
click('close', function(){
	core.rNode(layer);
	core.rNode(cover);
	clearInterval(timer);
	destroy = true;
	video.src = '';
	video.pause();
	flashElementPlaceHolder.parentNode.insertBefore(flashElement, flashElementPlaceHolder);
	flashElementPlaceHolder.parentNode.removeChild(flashElementPlaceHolder);
	delete window.isHTML5PlayerBookMarkCodeByZythum;
})
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
center.addEventListener('dblclick', function(){
	if(document.webkitIsFullScreen){
		document.webkitCancelFullScreen();
	}else{
		player.webkitRequestFullScreen();
	}
},false);
document.body.addEventListener('keydown',function(e){
	if(destroy) return;
	switch(e.keyCode){
		case 37: video.currentTime > 20 ? (video.currentTime = video.currentTime - 20): '';e.preventDefault();break;  //left
		case 39: video.currentTime < video.duration - 20 ? (video.currentTime = video.currentTime + 20): '';e.preventDefault();break;  //right
		case 40: video.volume > 0.1 ? (video.volume = video.volume - 0.1): '';e.preventDefault();break;  //down
		case 38: video.volume < 0.9 ? (video.volume = video.volume + 0.1): '';e.preventDefault();break;  //up
		case 32: video[video.paused?'play':'pause']();break; //space
	}
},false);
player.onwebkitfullscreenchange = function(){
	if(destroy) return;
	if(document.webkitIsFullScreen){
		layer.className = 'youkuhtml5playerbookmark2-layer youkuhtml5playerbookmark2-full';
		fullscreen.className = 'youkuhtml5playerbookmark2-btn youkuhtml5playerbookmark2-select';
	}else{
		layer.className = 'youkuhtml5playerbookmark2-layer';
		fullscreen.className = 'youkuhtml5playerbookmark2-btn';
	}
}
video.addEventListener('canplay',function(){
	if(destroy) return;
	video.play();
},false);
var FlagByRange_p = false;
var FlagByRange_v = false;
range_p.addEventListener('mousedown',function(){
	if(destroy) return;
	FlagByRange_p = true;
},false);
range_v.addEventListener('mousedown',function(){
	if(destroy) return;
	FlagByRange_v = true;
},false);
document.addEventListener('mouseup',function(e){
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
},false);
document.addEventListener('mousemove',function(e){	
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
},false);

var ctrlbarIsShow = true;
var ctrlbarTimer = setTimeout(function(){
	ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar';
},3000);
player.addEventListener('mousemove',function(){
	clearTimeout(ctrlbarTimer);
	if(ctrlbar.className != 'youkuhtml5playerbookmark2-ctrlbar youkuhtml5playerbookmark2-ctrlbarhover'){
		ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar youkuhtml5playerbookmark2-ctrlbarhover';
	}
	ctrlbarTimer = setTimeout(function(){
		ctrlbar.className = 'youkuhtml5playerbookmark2-ctrlbar';
	},3000);
},false);

timer = setInterval(function(){
	if(!FlagByRange_p){
		rangebtn_p.style.width = (video.currentTime/video.duration*100)+'%';
	}
	if(!FlagByRange_v){
		rangebtn_v.style.width = (video.volume*100)+'%';
	}
	if(video.paused){
		center.className = "youkuhtml5playerbookmark2-center youkuhtml5playerbookmark2-pause";
	}else{
		center.className = "youkuhtml5playerbookmark2-center";		
	}
	progressNum.innerHTML = job.formatTime(video.currentTime) + ' / ' + job.formatTime(video.duration);
},50);

(function(){
	if(type==='youku'){
		job.setUrl({
			'&#x6807;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/flv/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8',
			'&#x9AD8;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/mp4/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8',
			'&#x8D85;&#x6E05;': '/player/getM3U8/vid/'+videoId+'/type/hd2/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8'
		})
		job.setFlashElement(document.getElementById('movie_player'));
		job.showPlayer();
	}
})();

(function(){
	if(type==='tudou'){
		var pad = function(num, n) {
	        return (new Array(n >(''+num).length ? (n - (''+num).length+1) : 0).join('0') + num);
		}
		iidStr = pad(iid,9).match(/(\d{3})(\d{3})(\d{3})/);	
		var idEncodeed = iidStr[1] + '/' + iidStr[2] + '/' + iidStr[3];
		job.setUrl({
			'&#x6807;&#x6E05;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'2.m3u8',
			'&#x9AD8;&#x6E05;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'3.m3u8',			
			'&#x539F;&#x753B;': 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'99.m3u8'
		})
		job.setFlashElement(document.getElementById('playerObject'));
		job.showPlayer();
	}
})();

(function(){
	if(type==="sohu"){
		job.setUrl({
			'&#x9AD8;&#x6E05;': 'http://hot.vrs.sohu.com/ipad'+vid+'.m3u8'
		})
		job.setFlashElement(document.getElementById('sohuplayer'));
		job.showPlayer();
	}
})();

(function(){
	if(type==="iqiyi"){
		var scr = document.createElement('script');
		scr.src = 'http://cache.video.qiyi.com/m/201971/'+window.info.videoId+'/';
		document.body.appendChild(scr);
		var timer;
		timer = setInterval(function(){
			if(window.ipadUrl){
				clearInterval(timer);
				job.setUrl({
					'&#x9AD8;&#x6E05;': ipadUrl.data.url
				})
			}
		},100);
		job.setFlashElement(document.getElementById('flash'));
		job.showPlayer();
	}
})();

})();