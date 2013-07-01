var files = [
	'./source/header.js',
	'./source/playerlite.js',
	'./source/youku.js',
	'./source/tudou.js',
	'./source/qq.js',
	'./source/sina.js',
	'./source/sohu.js',
	'./source/56.js',
	'./source/iqiyi.js',
	'./source/letv.js',
	'./source/acfun.js',
	'./source/bilibili.js',
	'./source/xunlei.js',
	'./source/163open.js',
	// './source/test.js',
	'./source/start.js'
	];

var combineFile = '';

var fs  = require('fs');
var jsp = require('uglify-js').parser;
var pro = require('uglify-js').uglify;


var loopRead = function(callback){
	var file = files.shift();
	if(file){
		fs.readFile(file, function(err, data){
			combineFile += data;
			loopRead(callback);
		});
	}else{
		callback && callback();
	}
};

loopRead(function(){
	var ast;
	combineFile = '(function(){' + combineFile + '})();';
	ast = jsp.parse(combineFile);
	ast = pro.ast_mangle(ast);
	ast = pro.ast_squeeze(ast);
	ast = pro.gen_code(ast);
	fs.writeFile('youkuhtml5playerbookmark2lite.js', ast, function() {
		console.log('-----youkuhtml5playerbookmark2lite.js updated!----');
	});
});