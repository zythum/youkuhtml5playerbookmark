(function(){
	if(!window.iid){
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
	];
	
	var changeBtnCss = [
		'',
		'position:absolute',
		'width:500px',
		'height:40px',
		'top:470px',
		'left:50%',
		'margin-left:-250px',
		'z-index:1000000000000',
		'background:#000',
		'box-shadow:0 0 5px #333',
		'text-align:center',
		'color:#eee',
		'border-radius:150px',
		'overflow:hidden',
		''
	];
	
	var changeBtnItemCss = [
		'',
		'display:inline-block',
		'width:150px',
		'height:40px',
		'line-height:40px',
		'font-size:20px',		
		'cursor:pointer',
		''
	];

	var pad = function(num, n) {
        return (new Array(n >(''+num).length ? (n - (''+num).length+1) : 0).join('0') + num);
	}
	
	var HTML5Player = function(){
		//123/554/149/3
		//iidStr = iid.toString().match(/(\d{3})(\d{3})(\d{3})/);
		iidStr = pad(iid,9).match(/(\d{3})(\d{3})(\d{3})/);
		var idEncodeed = iidStr[1] + '/' + iidStr[2] + '/' + iidStr[3];

		var t_yuanhuaSrc = 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'99.m3u8';
		var t_360Src = 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'3.m3u8';
		var t_256Src = 'http://m3u8.tdimg.com/'+idEncodeed+'/'+'2.m3u8';

		var cover = document.createElement('div');
		cover.style.cssText += coverCss.join(';');

		var v = document.createElement('video');
		v.setAttribute('height','458');
		v.setAttribute('width','610');
		v.setAttribute('controls','true');
		v.setAttribute('autoplay','true');
		v.style.cssText += videoCss.join(';');
		v.src = t_yuanhuaSrc;
		
		
		var a = document.createElement('span');		
		a.innerHTML = '目前只有m3u8格式的支持,貌似只有safair才能播放。';
		a.style.cssText += aCss.join(';');
		cover.appendChild(a);
		
		var off = document.createElement('div');
		off.innerHTML = '退出';
		off.style.cssText += btnCss.join(';')+';right:0;';
		cover.appendChild(off);
		var nocover = document.createElement('div');
		nocover.innerHTML = '打开迷雾';
		nocover.style.cssText += btnCss.join(';')+';right:60px;';
		cover.appendChild(nocover);
		
		off.addEventListener('click',function(){
			y.HTML5.remove();
			y.flash.add();
			y.flag = false;
		},false);
		
		nocover.addEventListener('click',function(){
			cover.style.backgroundColor = 'rgba(255,255,255,0)';
		},false);
		
		var changeBtn = document.createElement('div');
		changeBtn.style.cssText += changeBtnCss.join(';');
		
		var t_yuanhua = document.createElement('div');
		t_yuanhua.style.cssText += changeBtnItemCss.join(';');
		t_yuanhua.style.backgroundColor = '#666';
		t_yuanhua.style.boxShadow = '0 0 3px #000 inset';
		t_yuanhua.innerHTML = '原画';
		changeBtn.appendChild(t_yuanhua);
		
		var t_360 = document.createElement('div');
		t_360.style.cssText += changeBtnItemCss.join(';');
		t_360.innerHTML = '360P';
		changeBtn.appendChild(t_360);
		
		var t_256 = document.createElement('div');
		t_256.style.cssText += changeBtnItemCss.join(';');
		t_256.innerHTML = '256P';
		changeBtn.appendChild(t_256);

		t_yuanhua.addEventListener('click',function(){
			v.src = t_yuanhuaSrc;
			t_yuanhua.style.backgroundColor = '#666';
			t_360.style.backgroundColor = 'transparent';
			t_256.style.backgroundColor = 'transparent';
			t_yuanhua.style.boxShadow = '0 0 3px #000 inset';
			t_360.style.boxShadow = 'none';
			t_256.style.boxShadow = 'none';
		},false);
		
		t_360.addEventListener('click',function(){
			v.src = t_360Src;
			t_360.style.backgroundColor = '#666';
			t_yuanhua.style.backgroundColor = 'transparent';
			t_256.style.backgroundColor = 'transparent';
			t_360.style.boxShadow = '0 0 3px #000 inset';
			t_yuanhua.style.boxShadow = 'none';
			t_256.style.boxShadow = 'none';
		},false);
		
		t_256.addEventListener('click',function(){
			v.src = t_360Src;
			t_256.style.backgroundColor = '#666';
			t_yuanhua.style.backgroundColor = 'transparent';
			t_360.style.backgroundColor = 'transparent';
			t_256.style.boxShadow = '0 0 3px #000 inset';
			t_yuanhua.style.boxShadow = 'none';
			t_360.style.boxShadow = 'none';
		},false);



		return {
			add : function(){
				document.body.appendChild(cover);
				document.body.appendChild(changeBtn);
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
					changeBtn.parentNode && document.body.removeChild(changeBtn);
				},1100);
			}
		}
	}

	var flashPlayer = function(){
		var flashOut = document.getElementById('player');
		var flash = document.getElementById('playerObject');
		return {
			add : function(){
				flashOut.appendChild(flash);
			},
			remove : function(){
				flashOut.parentNode && flashOut.removeChild(flash);
			}
		}
	}	
	
	window.isTudouHTML5PlayerBookMarkCodeByZythum = window.isTudouHTML5PlayerBookMarkCodeByZythum || {};
	var y = window.isTudouHTML5PlayerBookMarkCodeByZythum;
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
