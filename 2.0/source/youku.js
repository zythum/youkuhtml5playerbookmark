'优酷' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var _id = window.videoId;
	var m3u8 = function(callback){
		return callback({
			'&#x6807;&#x6E05;': '/player/getM3U8/vid/' + _id + '/type/flv/ts/' + (((new Date()).getTime()/1000).toString()|0) + '/v.m3u8',
			'&#x9AD8;&#x6E05;': '/player/getM3U8/vid/' + _id + '/type/mp4/ts/' + (((new Date()).getTime()/1000).toString()|0) + '/v.m3u8',
			'&#x8D85;&#x6E05;': '/player/getM3U8/vid/' + _id + '/type/hd2/ts/' + (((new Date()).getTime()/1000).toString()|0) + '/v.m3u8'
		});
	};
	var mp4 = function(callback){
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
		core.jsonp(
			'http://v.youku.com/player/getPlaylist/VideoIDS/' + _id + '/Pf/4?__callback=',
			function(param){
				var d      = new Date(),
					fileid = getFileID(param.data[0]['streamfileids']['3gphd'], param.data[0]['seed']),
					sid    = d.getTime() + "" + (1E3 + d.getMilliseconds()) + "" + (parseInt(Math.random() * 9E3)),
					k      = param.data[0]['segs']['3gphd'][0]['k'],
					st     = param.data[0]['segs']['3gphd'][0]['seconds'];
				core.jsonp(
					'http://f.youku.com/player/getFlvPath/sid/'+sid+'_00/st/mp4/fileid/'+fileid+'?K='+k+'&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=',
					function(param){
						callback( { '&#x9AD8;&#x6E05;': param[0]['server'] });
					}
				)		
			}
		);
	};	
	return{
		reg: /youku\.com/.test(window.location.host) && _id,
		call: function(callback){
			return (canPlayM3U8 ? (m3u8||mp4) : mp4)(function(urls){
				return callback({ urls: urls, flashElementId: 'movie_player' });
			});
		}
	}
});
