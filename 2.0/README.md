妈妈再也不用担心我的mba看优酷发热了计划
---

服务位置: [http://zythum.sinaapp.com/youkuhtml5playerbookmark/](http://zythum.sinaapp.com/youkuhtml5playerbookmark/)

>在优酷等在线视频网站切换html5方式播放视频。以免macbook可以烫到可以煎牛排。
现在的动漫不是原来越向文字长。无厘头的方向发展不是么。那么朱一也这么来把。妈妈再也不用担心我的macbook发烫了计划2.0 Beta!!
友情提示。目前计划已经支持safari和chrome浏览器

+ 目前支持 优酷，土豆，搜狐视频，爱奇艺，乐视网，qq，迅雷离线，56视频 的单视频播放页面

---

![](http://ww4.sinaimg.cn/large/a74ecc4cjw1e4a7f4njqxj20mq0dzwgx.jpg)

---

更新项：
+ 2013-5-4
	+ 支持迅雷云点播（m3u8）
	+ 支持网易公开课（m3u8）
+ 2013-5-2
	+ 新的ui界面。
	+ 修复土豆的bug
+ 2013-4-6
	+ 土豆换地址了。例行更新
+ 2013-2-9
	+ 支持acfun.tv 以及弹幕
+ 2013-3-17
	+ 支持bilibili.tv 以及弹幕
+ 2013-2-9
	+ 支持56视频，呼呼。
	+ 除了letv权限支持chrome浏览器
+ 2013-2-2
	+ 支持v.qq.com，呼呼。
	+ 支持迅雷离线，呼呼。
	+ ui调整，支持满屏模式。
+ 最早
	+ 将原本的代码挪到了sae上，速度更有保证。
	+ 支持iqiyi.com，呼呼。
	+ 支持letv.com，呼呼。
	+ 新的播放界面以及全屏播放界面。
	+ 代码重构，但是用起来应该没什么感觉。

---

目前js代码结构：

combine.js 是一个node程序。直接执行 `node combine.js ` 可以将sorce中的文件打包成youkuhtml5playerbookmark2.js

打包顺序在combine.js文件中，player.js在最前。 start.js 在最后。其他没有依赖关系。

每个组件的栗子:

```javascript
'acfun' && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8){
	//core 一些代码方法集。详见player.js
	//canPlayM3U8 浏览器是否支持播放M3U8方法 bool
	return{
		//判断是否在这个网站执行这个组件
		reg:  /acfun\.tv/.test(window.location.host) && window.system,
		//执行方法
		//callback回调
		//urls 栗子 {‘高清’: 'http://xxxxxxxxxxxxx.mp4',…}
		//flashElementId 需要隐藏的flash元素的id
		//comment 如果有弹幕的话。 弹幕格式需要使用bilibili格式，不是acfun格式。
		call: function(callback){			
				return callback({ urls: urls, flashElementId: 'area-player', comment: commentInfo });
		}
	};
});	
```

---

用到的项目：

+ [https://github.com/FortAwesome/Font-Awesome]()
+ [https://github.com/mishoo/UglifyJS2]()
