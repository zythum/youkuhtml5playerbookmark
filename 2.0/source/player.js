var youkuhtml5playerbookmark2 = (function(){
	var canPlayM3U8 = !!document.createElement('video').canPlayType('application/x-mpegURL') ? true : false;	
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
		,byId: function(id){
			return document.getElementById(id);
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
		},
		jsonp: function(url, callback, handler){
			var scr  = document.createElement('script');
			var back = handler || 'HTML5PlayerBookMarkCodeByZythum' + new Date().getTime() + Math.random().toString().replace('.','');
			window[back] = function(){
				callback && callback.apply(this, arguments);
				core.rNode(scr);
				delete window[back];
			};
			document.body.appendChild(scr);
			scr.src  = url + back;
		}
	};
	//msg
	var isError       = false;
	var MSG_ERROR     = '&#x8FBE;&#x6210;&#x5951;&#x7EA6;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x597D;&#x50CF;&#x51FA;&#x73B0;&#x4E86;&#x95EE;&#x9898;';
	var CSSp          = 'youkuhtml5playerbookmark2-';
	//==============================
	var cover         = core.cTag('div',  CSSp+'cover'       );
	var layer         = core.cTag('div',  CSSp+'layer'       );
	var title         = core.cTag('div',  CSSp+'title'       , layer, '&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x7684;macbook&#x53D1;&#x70EB;&#x4E86;&#x8BA1;&#x5212;');
	var player        = core.cTag('div',  CSSp+'player'      , layer);
	var video         = core.cTag('video',CSSp+'video'       , player);
	var ctrlbar       = core.cTag('div',  CSSp+'ctrlbar '+CSSp+'ctrlbarhover', player);
	var ctrlbarb      = core.cTag('div',  CSSp+'ctrlbarbottom', ctrlbar);
	var progressNum   = core.cTag('div',  CSSp+'progressNum' , ctrlbarb);
	var progress      = core.cTag('div',  CSSp+'progress'    , ctrlbarb);
	var volume        = core.cTag('div',  CSSp+'volume'      , ctrlbarb);
	var btns          = core.cTag('div',  CSSp+'btns'        , ctrlbarb);
	var close         = core.cTag('div',  CSSp+'close'       , ctrlbar);
	var center        = core.cTag('div',  CSSp+'center'      , ctrlbar,'<div class="'+CSSp+'center-before"></div><div class="'+CSSp+'center-after"></div>');
	var range_p       = core.cTag('div',  CSSp+'range'       , progress);
	var rangeinner_p  = core.cTag('div',  CSSp+'rangeinner'  , range_p);
	var rangebtn_p    = core.cTag('div',  CSSp+'rangebtn'    , rangeinner_p);
	var range_v       = core.cTag('div',  CSSp+'range'       , volume);
	var rangeinner_v  = core.cTag('div',  CSSp+'rangeinner'  , range_v);
	var rangebtn_v    = core.cTag('div',  CSSp+'rangebtn'    , rangeinner_v);
	var cmtBtn        = core.cTag('div',  CSSp+'btn '+CSSp+'cmtBtn'    , btns);
	var allscreen     = core.cTag('div',  CSSp+'btn '+CSSp+'allscreen' , btns);
	var fullscreen    = core.cTag('div',  CSSp+'btn '+CSSp+'fullscreen', btns);
	var comment       = core.cTag('div',  CSSp+'comment'     );
	var commentFloat  = core.cTag('div',  CSSp+'commentFloat', comment);
	var commentBottom = core.cTag('div',  CSSp+'commentBottom', comment);
	var logArea       = core.cTag('div',  CSSp+'logArea'     );	
	cmtBtn.style.display = 'none';
	close.setAttribute(      'data-click', 'close'     );
	fullscreen.setAttribute( 'data-click', 'fullscreen');
	allscreen.setAttribute(  'data-click', 'allscreen' );
	center.setAttribute(     'data-click', 'center'    );
	video.setAttribute(      'autoplay',   'true'      );

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
			job.url = [];
			var i, btn;
			for(i in obj){
				btn = core.cTag('div', CSSp+'btn' , null, i);
				btns.insertBefore(btn, btns.children[0]);
				btn.setAttribute('data-click','hd');
				btn.setAttribute('data-url',obj[i]);
				hdbtns.push(btn);
				job.url.push(obj[i]);
			}
			btn.className = CSSp+'btn '+CSSp+'select';
			video.src = obj[i];
			job.url.pop();
		}
		,addUrl: function(obj){
			var i, btn;
			for(i in obj){
				btn = core.cTag('div', CSSp+'btn' , null, i);
				btns.insertBefore(btn, btns.children[0]);
				btn.setAttribute('data-click','hd');
				btn.setAttribute('data-url',obj[i]);
				hdbtns.push(btn);
				job.url && job.url.push(obj[i]);
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
			document.body.appendChild(logArea);
			destroy = false;
		}
		,initComment: function(){
			cmtBtn.style.display = '';
			cmtBtn.setAttribute('data-click','cmt');
			cmtBtn.setAttribute('data-status','show');
			cmtBtn.className = CSSp+'btn '+CSSp+'select '+CSSp+'cmtBtn';
			click('cmt', function(){
				if(cmtBtn.getAttribute('data-status') =='show'){
					job.hideComment();
					cmtBtn.className = CSSp+'btn '+CSSp+'cmtBtn';;
					cmtBtn.setAttribute('data-status', 'hide');
				}else{
					job.showComment();
					cmtBtn.className = CSSp+'btn '+CSSp+'select '+CSSp+'cmtBtn';;
					cmtBtn.setAttribute('data-status', 'show');
				}
			});
		}
		,cmt: null
		,commentLoop: function(){
			//在下方的showComment 方法会重写这个方法，这个方法会在loop中调用。节省一个轮询时间
		}
		,hideComment: function(){
			commentBottom.innerHTML = commentFloat.innerHTML = '';
			job.commentLoop = function(){};
		}
		,showComment: function(cmt){
			if(cmt){
				job.cmt = cmt = cmt.sort(function(a,b){
					return parseFloat(a.p[0]) - parseFloat(b.p[0]);
				});
			}else if(job.cmt){
				cmt = job.cmt;
			}else{
				return;
			}
			player.appendChild(comment);
			var lastTime = 0;
			var lastInde = 0;
			job.commentLoop = function(nowTime){
				if(lastTime === nowTime){
					return; 
				}
				if(lastTime > nowTime){
					lastTime = nowTime;
					lastInde = 0
				}
				if(lastTime + 1 < nowTime){
					lastTime = nowTime - 1;
					lastInde = 0
				}
				var aCmt;
				var range = [lastTime, nowTime];
				var i = lastInde;
				while(aCmt = cmt[i++]){
					var cTime = parseFloat(aCmt.p[0]);				
					if(cTime < range[0]){
						continue;
					}else if(cTime > range[1]){
						break;
					}else{
						if(aCmt.p[1] <= 3) job.pushCmt(aCmt.msg, aCmt.p);
						if(aCmt.p[1] == 4 || aCmt.p[1] == 5) job.pushCmtBottom(aCmt.msg, aCmt.p);
					}				
				}
				lastTime = nowTime;
				lastInde = i;
			};
		}
		,pushCmtBottom: function(msg, p){
			var showTime = 4;
			var aCmt = core.cTag('div', CSSp+'commentBlockBottom');
			aCmt.appendChild(document.createTextNode(msg));
			if(!commentBottom.children[0]){
				commentBottom.appendChild(aCmt);
			}else{
				commentBottom.insertBefore(aCmt, commentBottom.children[0]);
			}
			aCmt.style.cssText += ';color:#'+p[3].toString(16)+';';
			setTimeout(function(){
				aCmt.parentNode.removeChild(aCmt);
			},showTime*1000);
		}
		,line: []
		,pushCmt: function(msg, p){
			var showTime = 8;
			var aCmtWidth = 0;
			var aCmtHeight = 0;
			var allWidth  = player.offsetWidth;
			var aCmt = core.cTag('div', CSSp+'commentBlock');
			aCmt.appendChild(document.createTextNode(msg));
			commentFloat.appendChild(aCmt);
			aCmtWidth = aCmt.offsetWidth + 10;
			aCmtHeight = 25;
			allWidth = allWidth + aCmtWidth;
			removeTime = showTime / player.offsetWidth * allWidth;
			isShowdTime = showTime / player.offsetWidth * aCmtWidth;
			var lineNum = 0;
			while(job.line[lineNum]){ lineNum++; }
			job.line[lineNum] = aCmt;
			aCmt.style.cssText += ';-webkit-transform: translate3d('+allWidth+'px, 0, 0);top:'+lineNum*aCmtHeight+'px;left:0px;color:#'+parseInt(p[3]).toString(16)+';';
			setTimeout(function(){
				aCmt.style.cssText += ';-webkit-transform: translate3d(-'+aCmtWidth+'px, 0, 0);-webkit-transition:-webkit-transform '+showTime+'s linear;';
			},0);
			setTimeout(function(){
				job.line[lineNum] = undefined;
			},isShowdTime*1000);
			setTimeout(function(){
				aCmt.parentNode.removeChild(aCmt);
			},removeTime*1000);
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
		,log: function(log){
			window.console && window.console.log(log);
			var l = core.cTag('div',  CSSp+'log', logArea, log);
			setTimeout(function(){
				core.rNode(l);
			},1000);
		}
	}
	//切换清晰度
	var setCurrentTimer;
	click('hd', function(btn){
		var currentTime = video.currentTime;
		if(btn.className == CSSp+'btn '+CSSp+'select'){
			return;
		}
		var i=0,len=hdbtns.length;
		for(;i<len;i++){
			if(hdbtns[i].className != CSSp+'btn')
				hdbtns[i].className = CSSp+'btn';
		}
		btn.className = CSSp+'btn '+CSSp+'select';
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
			layer.className = CSSp+'layer '+CSSp+'full';
			allscreen.className = CSSp+'btn '+CSSp+'select '+CSSp+'allscreen';
			isAllscreen = true;
		}else{
			layer.className = CSSp+'layer';
			allscreen.className = CSSp+'btn '+CSSp+'allscreen';
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
			core.rNode(logArea);
			// clearInterval(timer);
			clearTimeout(timer);
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
		},0);
	});
	//背景双击黑化
	var coverDblclickHandler = function(){
		if(!isBlack){
			cover.className = CSSp+'cover '+CSSp+'block';
			isBlack = true;
		}else{
			cover.className = CSSp+'cover';
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
			case 37: video.currentTime > 20 ? (video.currentTime = video.currentTime - 20): '';e.preventDefault();e.preventDefault();break;  //left
			case 39: video.currentTime < video.duration - 20 ? (video.currentTime = video.currentTime + 20): '';e.preventDefault();e.preventDefault();break;  //right
			case 40: video.volume > 0.1 ? (video.volume = video.volume - 0.1): '';e.preventDefault();e.preventDefault();break;  //down
			case 38: video.volume < 0.9 ? (video.volume = video.volume + 0.1): '';e.preventDefault();e.preventDefault();break;  //up
			case 32: video[video.paused?'play':'pause']();e.preventDefault();break; //space
		}
	}
	document.body.addEventListener('keydown', docKeydownHandler, false);
	//全屏事件触发回调
	var playerWebkitfullscreenchangeHandler = function(){
		if(destroy) return;
		job.fixVideoLayout();
		if(document.webkitIsFullScreen){
			layer.className = CSSp+'layer '+CSSp+'full';
			fullscreen.className = CSSp+'btn '+CSSp+'select '+CSSp+'fullscreen';
			allscreen.style.display = 'none';
		}else{
			layer.className = isAllscreen ? CSSp+'layer '+CSSp+'full' : CSSp+'layer';
			fullscreen.className = CSSp+'btn '+CSSp+'fullscreen';
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
		ctrlbar.className = CSSp+'ctrlbar';
	},3000);
	//鼠标移动显示工具
	playerMousemoveHandler = function(){
		clearTimeout(ctrlbarTimer);
		if(ctrlbar.className != CSSp+'ctrlbar '+CSSp+'ctrlbarhover'){
			ctrlbar.className = CSSp+'ctrlbar '+CSSp+'ctrlbarhover';
		}
		ctrlbarTimer = setTimeout(function(){
			ctrlbar.className = CSSp+'ctrlbar';
		},3000);
	}
	player.addEventListener('mousemove', playerMousemoveHandler, false);
	//循环获取播放信息
	var lastTime = -1;
	var num = 0;
	var isLoading = false;
	var loop = function(){
		if(isError) return;
		if(!FlagByRange_p){
			 rangebtn_p.style.width != (video.currentTime/video.duration*100)+'%' &&
			(rangebtn_p.style.width = (video.currentTime/video.duration*100)+'%');
		}
		if(!FlagByRange_v){
			 rangebtn_v.style.width != (video.volume*100)+'%' && 
			(rangebtn_v.style.width = (video.volume*100)+'%');
		}	
		progressNum.innerHTML = job.formatTime(video.currentTime) + ' / ' + job.formatTime(video.duration);
		if(video.duration == 10 && job.url.length){
			//如果第一个视频没有解码好。用次之的
			video.src = job.url[0];
		}
		if(video.paused){
			 center.className != CSSp+'center '+CSSp+'pause' &&
			(center.className = CSSp+'center '+CSSp+'pause');
		}else{
			 center.className != CSSp+'center' &&
			(center.className = CSSp+'center');
		}
		if(lastTime != video.currentTime || video.ended || video.readyState == 3 || video.readyState == 4 || video.readyState == 5){
			if(!isLoading){
				title.innerHTML = '&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x7684;macbook&#x53D1;&#x70EB;&#x4E86;&#x8BA1;&#x5212;';		
				isLoading = true;
			}
		}else{
			if(isLoading){
				title.innerHTML = '&#x52C7;&#x6562;&#x7684;&#x5C11;&#x5E74;&#x8BF7;&#x8010;&#x5FC3;&#xFF0C;&#x5C11;&#x5973;&#x52AA;&#x529B;&#x7948;&#x7977;&#x4E2D;...';				
				isLoading = false;
			}
			 center.className != CSSp+'center '+CSSp+'loading' &&
			(center.className = CSSp+'center '+CSSp+'loading');
		}
		//弹幕的loop
		if(job.commentLoop){
			if(num%2 == 0){ job.commentLoop(lastTime = video.currentTime); }
			if(++num > 10){ num = 0; }
		}
		timer = setTimeout(loop, 500);
	};
	loop();
	var site = [];	
	return {
		add: function(callback){
			// callback return {reg, call, flashElement, comment}
			try{ callback && site.push( callback(core, canPlayM3U8) ) }catch(e){};
		},
		init: function(){
			for(var i=0,len=site.length; i< len; i++){
				if(site[i] && site[i].reg && site[i].call){										
					job.showPlayer();
					job.log('&#x64AD;&#x653E;&#x5668;&#x521D;&#x59CB;&#x5316;');
					try{
						site[i].call(function(_){
							job.setUrl(_.urls);
							job.log('&#x83B7;&#x53D6;&#x64AD;&#x653E;&#x6E90;&#x5730;&#x5740;');
							job.setFlashElement( core.byId(_.flashElementId) );
							if(_.comment){
								job.initComment();
								job.log('&#x521D;&#x59CB;&#x5316;&#x5F39;&#x5E55;');
								setTimeout(function(){
									job.showComment(_.comment);
									job.log('&#x751F;&#x6210;&#x5F39;&#x5E55;');
								},100);
							}
						});
					}catch(e){
						isError = true;
						title.innerHTML = MSG_ERROR;
						job.log('&#x64AD;&#x653E;&#x5931;&#x8D25;&#x3002;&#x8BF7;&#x628A;url&#x5730;&#x5740;&#x8D4B;&#x503C;&#x3002;&#x4E0A;&#x5FAE;&#x535A;@zythum_&#x6731;&#x4E00;&#x7AE5;&#x978B;');
					}
					job.log('&#x51C6;&#x5907;&#x5B8C;&#x6BD5;');
					break;
				}
			}
		}
	}
})();