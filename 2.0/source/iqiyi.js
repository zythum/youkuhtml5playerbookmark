'爱奇异' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var init = function(callback){
		var scr = document.createElement('script');
		scr.src = 'http://cache.video.qiyi.com/m/201971/'+window.info.videoId+'/';
		document.body.appendChild(scr);
		var timer;
		timer = setInterval(function(){
			if(window.ipadUrl){
				clearInterval(timer);
				if(canPlayM3U8){
					//safari下使用m3u8
					callback({
						'&#x9AD8;&#x6E05;': ipadUrl.data.url
					});
				}else{
					//chrome使用mp4
					var mp4Url = ipadUrl.data.mp4Url;
					var scr = document.createElement('script');
					scr.src = mp4Url;
					document.body.appendChild(scr);
					clearInterval(timer);
					timer = setInterval(function(){
						if(window.videoUrl){
							clearInterval(timer);
							callback({
								'&#x9AD8;&#x6E05;': videoUrl.data.l
							});
						}
					},100);
				}
			}
		},100);	
	};
	return{
		reg: /iqiyi\.com/.test(window.location.host) && window.info && window.info.videoId,
		call: function(callback){			
			return init(function(urls){
				return callback({ urls: urls, flashElementId: 'flash' });
			});
		}
	}
});
