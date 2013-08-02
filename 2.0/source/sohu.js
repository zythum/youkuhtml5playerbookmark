'搜狐' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var vid = window.vid;
	var nid = window.nid;
	var m3u8 = function(callback){
		core.jsonp(
			'http://zythum.sinaapp.com/youkuhtml5playerbookmark/sohu.php?vid='+vid+'&nid='+nid+'&callback=',
			function(param){
				var url = param.urls.m3u8.filter(function(item){
					if(item){
						return item;
					}
				});
				callback( { '&#x9AD8;&#x6E05;': url[0] });
			}
		)
	};
	var mp4 = function(callback){
		core.jsonp(
			'http://zythum.sinaapp.com/youkuhtml5playerbookmark/sohu.php?vid='+vid+'&nid='+nid+'&callback=',
			function(param){
				var url = param.urls.mp4.filter(function(item){
					if(item){
						return item;
					}
				});
				callback( { '&#x9AD8;&#x6E05;': url[0] });
			}
		)
	};
	return{
		reg: /sohu\.com/.test(window.location.host) && vid,
		call: function(callback){
			return (canPlayM3U8 ? (m3u8||mp4) : mp4)(function(urls){
				return callback({ urls: urls, flashElementId: 'player' });
			});
		}
	}
});
