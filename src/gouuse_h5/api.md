# 全局API
## 页面之间过渡效果

页面之间过渡效果可以用以下方式控制

```js
this.goVux.direction = '' //无动画
this.goVux.direction = 'forward' //进入动画
this.goVux.direction = 'out' //离开动画
```

## 持久数据共享-setValue/getValue

持久数据存储与读取，该数据会保留在用户浏览器中。

```js
	this.goVux.setValue(key,value) //设置
	this.goVux.getValue(key,[exp]) //获取,exp为可选参数，exp根据setValue来计算过期时间。如：获取五分钟内的数据 Vue.getValue('name',300*1000);
	this.goVux.delValue(key) //删除
```

## 调试输出-devlog

建议项目中使用devlog进行调试输出，停用console.log输出，使用devlog仅在开发模式下有输出。

使用中任然遵循加入前缀的方式，来区分输出的调试信息。

```js
	this.goVux.devlog.log("A模块",data);
```

## 异步请求-$http

异步请求

?> 详细用法参考  [https://github.com/mzabriskie/axios](https://github.com/mzabriskie/axios)
```js
//项目实例中以 this.$http.. 调用。
this.$http.post('/api/module/...')
.then(function (response) {
    console.log(response);
})
//注：项目中接口请求成功会返回code值。code=0时表示请求成功，否则会返回msg。需要根据业务进行合理提示给用户。
```


## 日期对象格式化

```html
     {{new Date()|dateToStr}}
     {{new Date()|dateToStr('yyyy-MM-dd hh:mm')}}
```
其他用法

```js
     ...
     this.goTool.dateToStr(new Date(),'yyyy-MM-dd hh:mm')
```

## unix时间格式化

```html
     {{'1233331212'|unixToStr}}
     {{'1233331213'|unixToStr('yyyy-MM-dd')}}
```

其他用法

```js
     ...
	 this.goTool.unixToStr('1233331213','yyyy-MM-dd hh:mm')
```

## 时间数字转字符

```js
	this.goTool.getTimeStr(36060);
```

## 时间字符转数字

```js
	this.goTool.getTimeInt('10:01');
```

----------
　

　

　

　

　

　

　

　

　

　


