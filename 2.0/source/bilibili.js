'bilibili' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var aid = window.aid, pageno = window.pageno;
	var sina = function(src, callback, commentInfo){
		var id = src.match(/vid\=([0-9a-zA-Z]+)/);
		if(id){
			id = id[1];
			src = 'http://edge.v.iask.com.sinastorage.com/'+id+'.mp4';
		}
		callback({ 'sina': src }, commentInfo);
	};
	var youku = function(src, callback, commentInfo){		
		var id = src.match(/vid\/([0-9a-zA-Z]+)\//);
		id = id[1];
		if(false && canPlayM3U8){
			callback({
				'&#x6807;&#x6E05;': 'http://v.youku.com/player/getM3U8/vid/'+id+'/type/flv/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8',
				'&#x539F;&#x753B;': 'http://v.youku.com/player/getM3U8/vid/'+id+'/type/hd2/ts/'+(new Date()).getTime().toString().substring(0,10)+'/sc/2/useKeyframe/0/v.m3u8'
			}, commentInfo);
		}else{			
			core.jsonp(
				'http://zythum.sinaapp.com/youkuhtml5playerbookmark/getyoukuid.php?id='+id+'&callback=',
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
	var qq = function(src, callback, commentInfo){
		var id = src.match(/qq\.com\/([0-9a-zA-Z]+)\.mp4/);
		if(id){
			id = id[1];						
			core.jsonp(
				'http://vv.video.qq.com/geturl?otype=json&vid='+id+'&charge=0&callback=',
				function(param){
					callback({ '&#x9AD8;&#x6E05;': param.vd.vi[0].url }, commentInfo);
				}
			);
		}
	};
	var bili = function(src, callback, commentInfo){
		callback({ 'bili': src }, commentInfo);
	};
	var init = function(callback){
		core.jsonp(
			'http://zythum.sinaapp.com/youkuhtml5playerbookmark/bilibili.php?aid='+aid+'&page='+pageno+'&callback=',
			function(cid, videoInfo, commentInfo){
				// if(cid == -1){
				// 	setTimeout(init, 1000);
				// 	return;
				// }
				var src = videoInfo.durl[0]['url'];				
				src.indexOf('v.iask.com') >= 0  ? sina(src, callback, commentInfo)  :
				src.indexOf('v.youku.com') >= 0 ? youku(src, callback, commentInfo) :
				src.indexOf('qq.com') >=0       ? qq(src, callback, commentInfo)    : bili(src, callback, commentInfo);
			}
		);
	};
	return{
		reg:  /bilibili\.tv/.test(window.location.host) && window.aid,
		call: function(callback){			
			return init(function(urls, commentInfo){
				return callback({ urls: urls, flashElementId: 'bofqi', comment: commentInfo });
			});
		}
	};
});
