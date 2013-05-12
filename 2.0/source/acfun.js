'acfun' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){	
	var sina = function(vid, callback, commentInfo){
		callback({ 'sina': 'http://edge.v.iask.com.sinastorage.com/'+vid+'.mp4'}, commentInfo);
	};
	var youku = function(vid, callback, commentInfo){
		if(false && canPlayM3U8){
			callback({
				'&#x6807;&#x6E05;': 'http://v.youku.com/player/getM3U8/vid/'+vid+'/type/flv/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8',
				'&#x539F;&#x753B;': 'http://v.youku.com/player/getM3U8/vid/'+vid+'/type/hd2/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8'
			}, commentInfo);
		}else{
			core.jsonp(
				'http://zythum.sinaapp.com/youkuhtml5playerbookmark/getyoukuid.php?id='+vid+'&callback=',
				function(param){					
					function getFileIDMixString(seed){
						var source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890".split(''),
							mixed = [],index;
						for (var i=0, len = source.length; i< len;i++){
							seed = (seed * 211 + 30031) % 65536;
							index = Math.floor(seed/65536 * source.length);
							mixed.push(source[index]);
							source.splice(index,1);
						}
						return mixed.join('');
					};
					function getFileID(fileid, seed){
						var mixed = getFileIDMixString(seed), ids= fileid.split("*"), realId = [], idx;
						for (var i=0; i< ids.length; i++){
							idx = parseInt(ids[i],10);
							realId.push(mixed.charAt(idx));
						}
						return realId.join('');
					};					
					var d      = new Date(),
						fileid = getFileID(param.data[0]['streamfileids']['3gphd'], param.data[0]['seed']),
						sid    = d.getTime() + "" + (1E3 + d.getMilliseconds()) + "" + (parseInt(Math.random() * 9E3)),
						k      = param.data[0]['segs']['3gphd'][0]['k'],
						st     = param.data[0]['segs']['3gphd'][0]['seconds'];
					core.jsonp(
						'http://f.youku.com/player/getFlvPath/sid/'+sid+'_00/st/mp4/fileid/'+fileid+'?K='+k+'&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=',
						function(param){
							callback( { '&#x9AD8;&#x6E05;': param[0]['server'] }, commentInfo);
						}
					);
				}
			);
		}
	};
	var qq = function(vid, callback, commentInfo){				
		core.jsonp(
			'http://vv.video.qq.com/geturl?otype=json&vid='+vid+'&charge=0&callback=',
			function(param){
				callback({ '&#x9AD8;&#x6E05;': param.vd.vi[0].url }, commentInfo);
			}
		);
	};
	var tudou = function(vid, callback, commentInfo){
		if(canPlayM3U8){
			callback({
				'&#x6807;&#x6E05;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it='+vid+'&st=2',
				'&#x539F;&#x753B;': 'http://vr.tudou.com/v2proxy/v2.m3u8?it='+vid+'&st=5'
			}, commentInfo);
		}else{
			core.jsonp(
				'http://vr.tudou.com/v2proxy/v2.js?it=' + vid + '&st=52%2C53%2C54&pw=&jsonp=',
				function(param){
					if(param.code == -1) return;
					for(var urls={},i=0,len=param.urls.length; i<len; i++){ urls[i] = param.urls[i]; }
					return callback(urls, commentInfo);
				}
			);
		}
	};
	var init = function(callback){
		var aid = location.href.match(/\/(ac[0-9a-zA-Z\_]+)/)[1];
		core.jsonp(
			'http://zythum.sinaapp.com/youkuhtml5playerbookmark/acfun.php?aid='+aid+'&callback=',
			function(vid, videoInfo, commentInfo){
				// if(vid == -1){
				// 	setTimeout(init, 1000);
				// 	return;
				// }
				videoInfo.toLowerCase() == 'sina'   ? sina(vid, callback, commentInfo)  :
				videoInfo.toLowerCase() == 'youku'  ? youku(vid, callback, commentInfo) :
				videoInfo.toLowerCase() == 'qq'     ? qq(vid, callback, commentInfo)    : 
				videoInfo.toLowerCase() == 'tudou'  ? tudou(vid, callback, commentInfo) : 'false';
			}
		);
	};
	return{
		reg:  /acfun\.tv/.test(window.location.host) && window.system,
		call: function(callback){			
			return init(function(urls, commentInfo){
				return callback({ urls: urls, flashElementId: 'area-player', comment: commentInfo });
			});
		}
	};
});
