alert(1);
'测试localhost' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	return{
		reg: /localhost/.test(window.location.host),
		call: function(callback){
			return callback({ urls: {
				'高清': 'http://localhost/youkuhtml5playerbookmark/1.MOV'
			}, flashElement: ''});
		}
	}
});
