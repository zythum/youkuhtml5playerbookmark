'新浪' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var _id;
	try{ _id = $SCOPE.video.videoData.ipad_vid; }catch(e){ _id = false; }
	var mp4 = function(callback){		
		callback({
			'&#x9AD8;&#x6E05;': 'http://edge.v.iask.com.sinastorage.com/' + _id + '.mp4'
		})			
	};
	return{
		reg: /video\.sina\.com\.cn/.test(window.location.host) && _id,
		call: function(callback){
			return mp4(function(urls){
				return callback({ urls: urls, flashElementId: 'myMovie' });
			});
		}
	}
});
