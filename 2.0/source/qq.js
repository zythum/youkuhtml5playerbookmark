'腾讯' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
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
	var mp4 = function(callback){		
		core.jsonp(
			'http://vv.video.qq.com/geturl?otype=json&vid='+vid+'&charge=0&callback=',
			function(param){
				callback({ '&#x9AD8;&#x6E05;': param.vd.vi[0].url });
			}
		)
	};
	return{
		reg: /v\.qq\.com/.test(window.location.host) && window.COVER_INFO,
		call: function(callback){
			return mp4(function(urls){
				return callback({ urls: urls, flashElementId: 'mod_player' });
			});
		}
	};
});
