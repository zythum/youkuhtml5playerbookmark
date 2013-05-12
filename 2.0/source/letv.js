'乐视' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	canPlayM3U8 = false;
	var getScript = function(){
		var s = document.getElementsByTagName('script');
		for(var i=0,len=s.length; i<len; i++){
			if(/LELib\.Revive\.Player/.test(s[i].innerHTML)){
				return s[i];
			}
		}
		return false;
	}
	var init = function(callback){
		var script = getScript();
		if(!script) return;		
		var temp = LELib.Revive.Player;
		var isfirst = true;
		var value;
		LELib.Revive.Player = function(){
			value = arguments[2];
		}
		eval(script.innerHTML);
		LELib.Revive.Player = temp;
		var urls = {};
		if(canPlayM3U8){			
			if(value.v[0]) urls['&#x6807;&#x6E05;'] = LETV.Base64.decode(value.v[0]);
			if(value.v[1]) urls['&#x9AD8;&#x6E05;'] = LETV.Base64.decode(value.v[1]);
		}else{
			if(value.v[0]) urls['&#x6807;&#x6E05;'] = LETV.Base64.decode(value.v[0]).replace('tss=ios', '');
			if(value.v[1]) urls['&#x9AD8;&#x6E05;'] = LETV.Base64.decode(value.v[1]).replace('tss=ios', '');
		}
		if(urls){
			callback(urls);						
		}		
	};
	return{
		reg: /letv\.com/.test(window.location.host),
		call: function(callback){			
			return init(function(urls){
				return callback({ urls: urls, flashElementId: 'fla_box' });
			});
		}
	}
});