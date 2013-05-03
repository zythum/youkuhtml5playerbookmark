'网易公开课' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var m3u8 = function(callback){		
		callback({
			'&#x9AD8;&#x6E05;': window.openCourse.getCurrentMovie().appsrc
		});
	};
	return{
		reg: /v\.163\.com/.test(window.location.host) && window.openCourse && canPlayM3U8,
		call: function(callback){
			return m3u8(function(urls){
				return callback({ urls: urls, flashElementId: 'FPlayer' });
			});
		}
	}
});