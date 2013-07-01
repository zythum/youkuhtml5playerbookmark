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
	var CSSp          = 'youkuhtml5playerbookmark2-';
	//==============================
	var layer         = core.cTag('div',  CSSp+'layer'       );
	var btns          = core.cTag('div',  CSSp+'btns'       , layer);
	var close         = core.cTag('div',  CSSp+'close'      , layer, '&#x5988;&#x5988;&#x8BA1;&#x5212;Lite | &#x5173;&#x95ED;');
	var about         = core.cTag('a',    CSSp+'about'      , layer, '&#x5173;&#x4E8E;&#x5988;&#x5988;&#x8BA1;&#x5212;');	
	var logArea       = core.cTag('div',  CSSp+'logArea'     );	
	// var player        = core.cTag('div',  CSSp+'player'      );
	// var video         = core.cTag('video',CSSp+'video'      , player);
	// video.controls = true;
	// video.addEventListener('canplay', video.play(), false);
	var flashElement = undefined;
	var flashElementPlaceHolder = core.cTag('div');
	var dClick = core.dClick(layer);
	about.href="http://zythum.sinaapp.com/youkuhtml5playerbookmark/";
	
	var videos = [];
	var job = {
		setUrl: function(obj){
			job.url = [];
			var i, btn, txt, player, video;
			for(i in obj){
				btn    = core.cTag('div', CSSp+'btn'    , null);
				txt    = core.cTag('div', CSSp+'btntxt' , btn, i);
				player = core.cTag('div', CSSp+'player', btn);
				video  = core.cTag('video',CSSp+'video', player);
				video.controls = true;
				video.preload = 'none';
				video.src = obj[i];
				btn.setAttribute('data-click', 'play');
				video.addEventListener("fullscreenchange", function () {
					!document.fullscreen && video.pause();
				}, false);
				video.addEventListener('webkitfullscreenchange', function(){
					!document.webkitIsFullScreen && video.pause();
				}, false);				
				video.addEventListener("mozfullscreenchange", function () {
				    !document.mozFullScreen && video.pause();
				}, false);
				video.addEventListener("ended", function () {
					document.exitFullscreen && document.exitFullscreen();
					document.mozCancelFullScreen && document.mozCancelFullScreen();
					document.webkitCancelFullScreen && document.webkitCancelFullScreen();
				}, false);
				videos.push(video);
				// btn.setAttribute('data-url', obj[i]);
				btns.insertBefore(btn, btns.children[0]);
			}
		}		
		,setFlashElement: function(el){
			try{
				flashElement = el;
				el.parentNode.insertBefore(flashElementPlaceHolder, flashElement);
				el.parentNode.removeChild(flashElement);
			}catch(e){}
		}
		,showPlayer: function(){
			document.body.appendChild(layer);
			document.body.appendChild(logArea);
			destroy = false;
		}		
		,log: function(log){
			window.console && window.console.log(log);
			var l = core.cTag('div',  CSSp+'log', logArea, log);
			setTimeout(function(){
				core.rNode(l);
			},1000);
		}
	}
	var site = [];
	document.body.style.overflow = 'hidden';
	var destroy = function(){
		var video;
		while(video = videos.pop()){
			video.src = '';
		}
		document.body.style.overflow = '';
		close.removeEventListener('click', destroy, false);
		core.rNode(layer);
		core.rNode(logArea);
		window.isHTML5PlayerBookMarkCodeByZythum = false;
	}
	close.addEventListener('click', destroy, false);	
	dClick.add('play', function(el){
		// if(player.parentNode != el){
		// 	el.appendChild(player);
		// 	video.src = el.getAttribute('data-url');			
		// }
		// setTimeout(function(){
			var video = el.getElementsByTagName('video')[0];
			video.webkitRequestFullScreen && video.webkitRequestFullScreen();
			video.webkitEnterFullScreen   && video.webkitEnterFullScreen();
			video.mozRequestFullScreen    && video.mozRequestFullScreen();
			video.requestFullScreen       && video.requestFullScreen();
			video.requestFullscreen       && video.requestFullscreen();		
			video.play(); 
		// },20);
	});
	return {
		add: function(callback){
			// callback return {reg, call, flashElement, comment}
			try{ callback && site.push( callback(core, canPlayM3U8) ) }catch(e){};
		},
		init: function(){
			var match = false;
			for(var i=0,len=site.length; i< len; i++){
				if(site[i] && site[i].reg && site[i].call){										
					job.showPlayer();
					job.log('&#x64AD;&#x653E;&#x5668;&#x521D;&#x59CB;&#x5316;');
					try{
						site[i].call(function(_){
							job.setUrl(_.urls);
							job.log('&#x83B7;&#x53D6;&#x64AD;&#x653E;&#x6E90;&#x5730;&#x5740;');
							job.setFlashElement( core.byId(_.flashElementId) );							
						});
					}catch(e){
						isError = true;
						job.log('&#x64AD;&#x653E;&#x5931;&#x8D25;&#x3002;&#x8BF7;&#x628A;url&#x5730;&#x5740;&#x8D4B;&#x503C;&#x3002;&#x4E0A;&#x5FAE;&#x535A;@zythum_&#x6731;&#x4E00;&#x7AE5;&#x978B;');
					}
					job.log('&#x51C6;&#x5907;&#x5B8C;&#x6BD5;');
					match = true;
					break;
				}
			}
			!match && job.log('&#x5BF9;&#x4E0D;&#x8D77;&#x3002;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x5988;&#x5988;&#x8BA1;&#x5212;&#x4E0D;&#x80FD;&#x89E3;&#x6790;');
		}
	}
})();