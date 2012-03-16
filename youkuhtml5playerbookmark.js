(function(){
	if(!window.videoId){
		return false;
	}
	var coverCss = [
		'',
		'position:fixed',
		'top:0',
		'left:0',
		'bottom:0',
		'right:0',
		'background-color:rgba(255,255,255,0)',
		'z-index:999999999999',
		'-webkit-transition:background-color 0.2s ease;',
		'-moz-transition:background-color 0.2s ease;',
		'-o-transition:background-color 0.2s ease;',
		'transition:background-color 0.2s ease;',
		'pointer-events:none',
		''
	];
	var videoCss = [
		'',
		'position:absolute',
		'width:610px',
		'height:458px',
		'top:-500px',
		'left:50%',
		'margin-left:-306px',
		'border:1px solid #999',
		'z-index:1000000000000',
		'background:#000',
		'box-shadow:0 0 5px #333',
		'-webkit-transition:top 1s ease;',
		'-moz-transition:top 1s ease;',
		'-o-transition:top 1s ease;',
		'transition:top 1s ease;',
		''
	];
	var aCss = [
		'',
		'position:absolute',
		'bottom:0',
		'left:0',
		'right:0',
		'height:30px;',
		'text-align:center',
		'font-size:14px',
		'pointer-events:auto',
		''
	];
	
	var btnCss = [
		'',
		'position:absolute',
		'top:0',
		'height:30px;',
		'line-height:30px',
		'width:60px',
		'text-align:center',
		'font-size:14px',
		'letter-spacing:-1px',
		'color:#014CCC',
		'cursor:pointer',
		'pointer-events:auto',
		''
	]
	
	var HTML5Player = function(){
		var cover = document.createElement('div');
		cover.style.cssText += coverCss.join(';');

		var v = document.createElement('video');

		v.setAttribute('height','458');
		v.setAttribute('width','610');
		v.setAttribute('controls','true');
		v.style.cssText += videoCss.join(';');
		v.src = '/player/getM3U8/vid/'+videoId+'/type/mp4/flv/ts/'+(new Date()).getTime()+'/v.m3u8';
		
		
		var a = document.createElement('a');		
		var mp4Src = 'http://3g.youku.com/pvs?id='+videoId2+'&format=3gphd';
		a.setAttribute('href',mp4Src);
		a.innerHTML = '不能直接观看，点击这里：'+mp4Src;
		a.style.cssText += aCss.join(';');
		cover.appendChild(a);
		
		var off = document.createElement('div');
		off.innerHTML = '退出';
		off.style.cssText += btnCss.join(';')+';right:0;';
		cover.appendChild(off);
		var nocover = document.createElement('div');
		nocover.innerHTML = '打开迷雾';
		nocover.style.cssText += btnCss.join(';')+';right:60px;';;
		cover.appendChild(nocover);
		
		off.addEventListener('click',function(){
			y.HTML5.remove();
			y.flash.add();
			y.flag = false;
		},false);
		
		nocover.addEventListener('click',function(){
			cover.style.backgroundColor = 'rgba(255,255,255,0)';
		},false);
			
		return {
			add : function(){
				document.body.appendChild(cover);
				document.body.appendChild(v);
				v.addEventListener('canplay',v.play);
				setTimeout(function(){
					cover.style.backgroundColor = 'rgba(255,255,255,0.6)';
					v.style.top = '-1px';
				},100);
			},
			remove : function(){
				v.pause();
				cover.style.backgroundColor = 'rgba(255,255,255,0)';
				v.style.top = '-500px';
				setTimeout(function(){
					cover.parentNode && document.body.removeChild(cover);
					v.parentNode && document.body.removeChild(v);
				},1100);
			}
		}
	}

	var flashPlayer = function(){
		var flashOut = document.getElementById('player');
		var flash = document.getElementById('movie_player');
		return {
			add : function(){
				flashOut.appendChild(flash);
			},
			remove : function(){
				flashOut.parentNode && flashOut.removeChild(flash);
			}
		}
	}	
	
	window.isYoukuHTML5PlayerBookMarkCodeByZythum = window.isYoukuHTML5PlayerBookMarkCodeByZythum || {};
	var y = window.isYoukuHTML5PlayerBookMarkCodeByZythum;
	y.HTML5  = y.HTML5 || HTML5Player();
	y.flash = y.flash || flashPlayer();
	y.flag = y.flag || false;
	if(y.flag === false){
		y.HTML5.add();
		y.flash.remove();
		y.flag = true;
	}else if(y.flag === true){
		y.HTML5.remove();
		y.flash.add();
		y.flag = false;
	}

})();
