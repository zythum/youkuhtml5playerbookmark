'迅雷播放特权' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	var getCookie = function(key){
			var cookies = document.cookie.split('; '),
				i = 0,
				l = cookies.length,
				temp, value;
			for(; i < l; i++){
				temp = cookies[i].split('=');
				if(temp[0] === key){
					return decodeURIComponent(temp[1]);
				}
			}
			return null;
	};
	var m3u8 = function(callback){		
		var href = encodeURI(window.location.href);
		var url = decodeURI(href.match(/&url=([0-9a-zA-Z\%\-\_\.]+)/)[1]);
		var filename = href.match(/&filename=([0-9a-zA-Z\%\-\_\.]+)/);
		if(!filename){
			filename = href.match(/&folder=([0-9a-zA-Z\%\-\_\.]+)/);
		}
		var video_name = decodeURI(filename[1]);
		core.jsonp(
			'http://i.vod.xunlei.com/req_get_method_vod?url='+url+'&video_name='+video_name+'&platform=1&userid='+getCookie('userid')+'&vip=1&sessionid='+getCookie('sessionid')+'&cache='+(new Date()).getTime().toString()+'&from=vlist&jsonp=',
			function(param){
				var urls = {};
				var format = ['&#x6807;&#x6E05;', '&#x9AD8;&#x6E05;', '&#x8D85;&#x6E05;'];
				var list = param.resp.vodinfo_list;				
				for(var i=0,len=list.length; i<len; i++){
					urls[format[i]] = list[i].vod_url;
				}
				callback(urls);
			}
		);		
	};
	return{
		reg: /iplay\.html/.test(window.location.pathname) && window.gCloudVod && canPlayM3U8,
		call: function(callback){
			return m3u8(function(urls){
				return callback({ urls: urls, flashElementId: 'XL_CLOUD_VOD_PLAYER' });
			});
		}
	}
});