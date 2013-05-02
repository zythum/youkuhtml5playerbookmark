'土豆' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var _id = window.iid;
	var youkuCode = window.itemData && window.itemData.vcode;	
	var m3u8 = function(callback){
		return !youkuCode ? 
		callback({
			'&#x6807;&#x6E05;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it=' + _id + '&st=2',
			'&#x539F;&#x753B;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it=' + _id + '&st=5'
		}):
		callback({
			'&#x6807;&#x6E05;': 'http://v.youku.com/player/getM3U8/vid/'+youkuCode+'/type/flv/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8',
			'&#x539F;&#x753B;': 'http://v.youku.com/player/getM3U8/vid/'+youkuCode+'/type/hd2/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8'
		});
	};
	var mp4 = function(callback){
		if(!youkuCode){
			core.jsonp(
				'http://vr.tudou.com/v2proxy/v2.js?it=' + _id + '&st=52%2C53%2C54&pw=&jsonp=',
				function(param){
					if(param.code == -1) return;
					for(var urls={},i=0,len=param.urls.length; i<len; i++){ urls[i] = param.urls[i]; }
					return callback(urls);
				}
			);
		}else{
			core.jsonp(
				'https://openapi.youku.com/v2/videos/files.json?client_id=513edb6cf9833ca7&client_secret=eaf151ffdbf1383d934ab4cb91250fa6&type=play&video_id='+youkuCode+'&_='+(new Date()).getTime().toString()+'&callback=',
				function(param){
					return callback({
						'&#x6807;&#x6E05;': param.files['3gphd'].segs[0].url
					});
				}
			);
		}
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
