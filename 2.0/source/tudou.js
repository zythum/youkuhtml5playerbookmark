'土豆' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var _id = window.iid;
	var m3u8 = function(callback){
		return callback({
			'&#x6807;&#x6E05;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it=' + _id + '&st=2',
			'&#x539F;&#x753B;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it=' + _id + '&st=5'
		});
	};
	var mp4 = function(callback){
		core.jsonp(
			'http://vr.tudou.com/v2proxy/v2.js?it=' + _id + '&st=52%2C53%2C54&pw=&jsonp=',
			function(param){
				if(param.code == -1) return;
				for(var urls={},i=0,len=param.urls.length; i<len; i++){ urls[i] = param.urls[i]; }
				return callback(urls);
			}
		);
	};
	return{
		reg: /tudou\.com/.test(window.location.host) && _id,
		call: function(callback){
			return (canPlayM3U8 ? (m3u8||mp4) : mp4)(function(urls){
				return callback({ urls: urls, flashElementId: 'playerObject' });
			});
		}
	}
});
