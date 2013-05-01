'56' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var page = window._page_;
	var mp4 = function(callback){		
		if(page.channel == 'view'){
			var vid  = location.href.match(/v\_([0-9a-zA-Z]+)\.html/);
			if(vid){
				vid = vid[1];
				callback({'&#x9AD8;&#x6E05;': 'http://vxml.56.com/m3u8/'+vid+'/'});
			}
		}else{
			var back = 'jsonp_dfInfo';
			var backup = window[back];
			core.jsonp(
				'http://vxml.56.com/ipad/'+(window.oFlv.o.id || window._oFlv_c.id)+'/?src=site&callback=',
				function(param){
					urlList = param.df;
					var urls = {};
					for(var i=param.df.length-1;i>=0;i--){
						urls[param.df[i]['type']] = param.df[i]['url'];
					}
					callback(urls);
					window[back] = backup;
				},
				back
			)
		}
	};
	return{
		reg: /56\.com/.test(window.location.host) && page,
		call: function(callback){			
			return mp4(function(urls){
				return callback({ urls: urls, flashElementId: 'mod_player' });
			});
		}
	}
});
