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
		'background-color:rgba(0,0,0,0)',
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
		'top: 200px',
		'left:50%',
		'margin-left:-306px',
		'margin-top: -229px',
		'border:1px solid #111',
		'z-index:1000000000000',
		'background:#000',
		'box-shadow:0 0 10px #333',
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
		'color:#bbb',
	];
	
	var btnCss = [
		'',
		'position:absolute',
		'top:5px',
		'height:30px;',
		'line-height:30px',
		'width:70px',
		'text-align:center',
		'font-size:14px',
		'letter-spacing:-1px',
		'color:#bbb',
		'cursor:pointer',
		'pointer-events:auto',
		'display: block',
		'background: #000',
		'-webkit-border-radius: 10px;',
		'box-shadow:0 0 15px #666',
	];
	
	var changeBtnCss = [
		'',
		'position:absolute',
		'width:140px',
		'height:22px',
		'bottom: 10px',
		'left:50%',
		'margin-left:-70px',
		'z-index:1000000000000',
		'background:#000',
		'box-shadow:0 0 5px #333',
		'text-align:center',
		'color:#eee',
		'border-radius:0px',
		'overflow:hidden',
		''
	];
	
	var changeBtnItemCss = [
		'',
		'display:inline-block',
		'width:70px',
		'height:22px',
		'bottom: 10px',
		'font-size:16px',		
		'corsor:pointer',
	]
	
	
	var HTML5Player = function(){
	
		var mp4Src = 'http://3g.youku.com/pvs?id='+videoId2+'&format=3gphd';
		var m3u8Src= '/player/getM3U8/vid/'+videoId+'/type/mp4/flv/ts/'+(new Date()).getTime()+'/v.m3u8';
		
		var cover = document.createElement('div');
		cover.style.cssText += coverCss.join(';');

		var v = document.createElement('video');
		v.setAttribute('height','458');
		v.setAttribute('width','610');
		v.setAttribute('controls','true');
		v.style.cssText += videoCss.join(';');
		v.src = m3u8Src;
		
		
		var a = document.createElement('a');		
		a.setAttribute('href',mp4Src);
		a.innerHTML = '不能直接观看，点击这里';
		a.style.cssText += aCss.join(';text-align:right;');
		cover.appendChild(a);
		
		var off = document.createElement('div');
		off.innerHTML = '退出';
		off.style.cssText += btnCss.join(';')+';right:10px;';
		cover.appendChild(off);
		var nocover = document.createElement('div');
		nocover.innerHTML = '打开迷雾';
		nocover.style.cssText += btnCss.join(';')+';right:85px;';
		cover.appendChild(nocover);
		
		off.addEventListener('click',function(){
			y.HTML5.remove();
			y.flash.add();
			y.flag = false;
		},false);
		
		nocover.addEventListener('click',function(){
			cover.style.backgroundColor = 'rgba(0,0,0,0)';
		},false);
			
		var changeBtn = document.createElement('div');
		changeBtn.style.cssText += changeBtnCss.join(';');
		
		var m3u8btn = document.createElement('div');
		m3u8btn.style.cssText += changeBtnItemCss.join(';');
		m3u8btn.style.backgroundColor = '#666';
		m3u8btn.style.boxShadow = '0 0 3px #000 inset';
		m3u8btn.innerHTML = 'M3U8';
		changeBtn.appendChild(m3u8btn);
		
		var mp4btn = document.createElement('div');
		mp4btn.style.cssText += changeBtnItemCss.join(';');
		mp4btn.innerHTML = 'MP4';
		changeBtn.appendChild(mp4btn);
		
		m3u8btn.addEventListener('click',function(){
			v.src = m3u8Src;
			m3u8btn.style.backgroundColor = '#666';
			mp4btn.style.backgroundColor = 'transparent';
			m3u8btn.style.boxShadow = '0 0 3px #000 inset';
			mp4btn.style.boxShadow = 'none';
		},false);
		
		mp4btn.addEventListener('click',function(){
			v.src = mp4Src;
			mp4btn.style.backgroundColor = '#666';
			m3u8btn.style.backgroundColor = 'transparent';
			mp4btn.style.boxShadow = '0 0 3px #000 inset';
			m3u8btn.style.boxShadow = 'none';
		},false);
		
		return {
			add : function(){
				document.body.appendChild(cover);
				document.body.appendChild(changeBtn);
				document.body.appendChild(v);
				
				v.addEventListener('canplay',v.play);
				setTimeout(function(){
					cover.style.backgroundColor = 'rgba(0,0,0,0.9)';
					v.style.top = '50%';
				},100);
			},
			remove : function(){
				v.pause();
				cover.style.backgroundColor = 'rgba(0,0,0,0)';
				v.style.top = '-500px';
				setTimeout(function(){
					cover.parentNode && document.body.removeChild(cover);
					v.parentNode && document.body.removeChild(v);
					changeBtn.parentNode && document.body.removeChild(changeBtn);
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
