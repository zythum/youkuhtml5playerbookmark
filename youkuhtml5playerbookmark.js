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
		'background-image: -webkit-linear-gradient(top,#333,#000)',
		'background-image: -moz-linear-gradient(top,#333,#000)',
		'background-image: -ms-linear-gradient(top,#333,#000)',
		'background-image: -o-linear-gradient(top,#333,#000)',
		'background-image: linear-gradient(top,#333,#000)',
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
		'width:90px',
		'height:40px',
		'line-height:40px',
		'font-size:20px',		
		'cursor:pointer',
		''
	];
	
	
	var HTML5Player = function(){
	
		var hd2Src= '/player/getM3U8/vid/'+videoId+'/type/hd2/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8';
		var mp4Src= '/player/getM3U8/vid/'+videoId+'/type/mp4/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8';
		var flvSrc= '/player/getM3U8/vid/'+videoId+'/type/flv/ts/'+(((new Date()).getTime()/1000).toString()|0)+'/v.m3u8';
		var mp4Src2 = 'http://3g.youku.com/pvs?id='+videoId2+'&format=3gphd';
		//var m3u8Src= '/player/getM3U8/vid/'+videoId+'/type/mp4/flv/ts/'+(new Date()).getTime()+'/v.m3u8';
		var cover = document.createElement('div');
		cover.style.cssText += coverCss.join(';');

		var v = document.createElement('video');
		v.setAttribute('height','458');
		v.setAttribute('width','610');
		v.setAttribute('controls','true');
		v.setAttribute('autoplay','true');
		v.style.cssText += videoCss.join(';');
		v.src = hd2Src;
		
		
		var a = document.createElement('a');		
		a.setAttribute('href',mp4Src);
		a.innerHTML = '&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x89C2;&#x770B;&#xFF0C;&#x70B9;&#x51FB;&#x8FD9;&#x91CC;&#xFF1A;'+mp4Src;
		a.style.cssText += aCss.join(';');
		cover.appendChild(a);
		
		var off = document.createElement('div');
		off.innerHTML = '&#x9000;&#x51FA;';
		off.style.cssText += btnCss.join(';')+';right:0;';
		cover.appendChild(off);
		var nocover = document.createElement('div');
		nocover.innerHTML = '&#x6253;&#x5F00;&#x8FF7;&#x96FE;';
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
			
		var changeBtn = document.createElement('div');
		changeBtn.style.cssText += changeBtnCss.join(';');
		
				
		var hd2btn = document.createElement('div');
		hd2btn.style.cssText += changeBtnItemCss.join(';');
		hd2btn.style.backgroundColor = '#666';
		hd2btn.style.boxShadow = '0 0 3px #000 inset';
		hd2btn.innerHTML = '&#x8D85;&#x6E05;';
		changeBtn.appendChild(hd2btn);
				
		var mp4btn = document.createElement('div');
		mp4btn.style.cssText += changeBtnItemCss.join(';');
		mp4btn.innerHTML = '&#x9AD8;&#x6E05;';
		changeBtn.appendChild(mp4btn);
		
		var flvbtn = document.createElement('div');
		flvbtn.style.cssText += changeBtnItemCss.join(';');
		flvbtn.innerHTML = '&#x6807;&#x6E05;';
		changeBtn.appendChild(flvbtn);
		
		var mp4btn2 = document.createElement('div');
		mp4btn2.style.cssText += changeBtnItemCss.join(';');
		mp4btn2.innerHTML = 'mp4';
		changeBtn.appendChild(mp4btn2);
		
		hd2btn.addEventListener('click',function(){
			v.src = hd2Src;
			hd2btn.style.backgroundColor = '#666';			
			hd2btn.style.boxShadow = '0 0 3px #000 inset';
			mp4btn.style.backgroundColor = 'transparent';
			mp4btn.style.boxShadow = 'none';
			flvbtn.style.backgroundColor = 'transparent';
			flvbtn.style.boxShadow = 'none';
			mp4btn2.style.backgroundColor = 'transparent';
			mp4btn2.style.boxShadow = 'none';
		},false);
		
		mp4btn.addEventListener('click',function(){
			v.src = mp4Src;
			mp4btn.style.backgroundColor = '#666';
			mp4btn.style.boxShadow = '0 0 3px #000 inset';
			hd2btn.style.backgroundColor = 'transparent';
			hd2btn.style.boxShadow = 'none';
			flvbtn.style.backgroundColor = 'transparent';
			flvbtn.style.boxShadow = 'none';
			mp4btn2.style.backgroundColor = 'transparent';
			mp4btn2.style.boxShadow = 'none';
		},false);
		
		flvbtn.addEventListener('click',function(){
			v.src = flvSrc;
			flvbtn.style.backgroundColor = '#666';
			flvbtn.style.boxShadow = '0 0 3px #000 inset';
			hd2btn.style.backgroundColor = 'transparent';
			hd2btn.style.boxShadow = 'none';
			mp4btn.style.backgroundColor = 'transparent';
			mp4btn.style.boxShadow = 'none';
			mp4btn2.style.backgroundColor = 'transparent';
			mp4btn2.style.boxShadow = 'none';
		},false);
		
		mp4btn2.addEventListener('click',function(){
			v.src = mp4Src2;			
			mp4btn2.style.backgroundColor = '#666';
			mp4btn2.style.boxShadow = '0 0 3px #000 inset';
			hd2btn.style.backgroundColor = 'transparent';
			hd2btn.style.boxShadow = 'none';
			flvbtn.style.backgroundColor = 'transparent';
			flvbtn.style.boxShadow = 'none';
			mp4btn.style.backgroundColor = 'transparent';
			mp4btn.style.boxShadow = 'none';
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
		var flash = document.getElementById('movie_player');
		var flashOut = flash.parentNode;
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