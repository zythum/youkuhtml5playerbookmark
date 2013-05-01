'搜狐' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var _id = window.vid;	
	var m3u8 = function(callback){
		return callback({
			'&#x9AD8;&#x6E05;': 'http://hot.vrs.sohu.com/ipad'+vid+'.m3u8'
		});
	};
	var mp4 = function(callback){
		var appkey = 'f351515304020cad28c92f70f002261c';		
		core.jsonp(
			'http://api.tv.sohu.com/video/playinfo/'+vid+'.json?encoding=gbk&api_key='+appkey+'&from=mweb&_='+(new Date()).getTime()+'&callback=',
			function(param){
				callback({ '&#x9AD8;&#x6E05;': param.data.downloadurl });
			}
		);
	};
	return{
		reg: /sohu\.com/.test(window.location.host) && _id,
		call: function(callback){
			return (canPlayM3U8 ? (m3u8||mp4) : mp4)(function(urls){
				return callback({ urls: urls, flashElementId: 'player' });
			});
		}
	}
});
