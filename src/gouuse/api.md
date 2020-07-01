# 全局API


## 状态管理-vuex


基本概念

```
state：基本状态
getters：派生状态
mutation：更改状态的唯一方法，mutation 必须同步执行
action：能同步或异步执行 mutation
```


获取状态基本用法：this.$store.state.模块名.状态值

```js
this.$store.state.demo.count
this.$store.getters.demo_doubleCount
this.$store.dispatch('demo_increment')
```

```html
{{$store.state.demo.count}}
{{$store.getters.demo_doubleCount}}
```

其他特殊地方获取，可以import导入
```js
import store from '@/store';
//store.state.demo.count
```

组件中应用

```js
export default {
	// ...
	computed: {
		count () {
		  return this.$store.state.count
		}
	}
}
//每当 store.state.count 变化的时候, 都会重新计算属性，并且触发更新相关联的 DOM
//例如：模板中{{ count }}会同步store.state.count的变化
```

注意事项：

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。

更多高级用法请参考：[官方文档](https://vuex.vuejs.org/zh-cn/)


## 简单数据共享-setData/getData

setData/getData 简单存储或获取数据。基本用法如下：

```js
	this.goBase.setData('test','测试数据');
	setTimeout(()=>{
		this.goBase.setData('test',['数据更新了','新数据']);
	},2000)
	this.goBase.setData('test2',()=>{
		this.goBase.setData('test',['数据被test2更新了','新数据',new Date()]);
	});
	//this.goBase.getData['test2']()
```

```html
	{{goBase.getData['test']}}
	<a @click="goBase.getData['test2']()">事件</a>
```

## 复杂数据共享-setApi

用 setApi 存储更复杂的数据。基本用法如下：

定义 api.js：

```js
/* eslint-disable */
import Vue from 'vue';
//import goBase from '@/global/goBase'; 
//import store from '@/store';
//import $http from '@/global/$http.js';
let data = new Vue({ 
	data:{
		shareData:'test',
	},
	methods: {
		setData(v){
			this.shareData = [v,new Date()];
		}
	}
})
goBase.setApi('demo',data); 
//命名建议使用模块名称，避免重复
//全局调用 {{api_demo.}} 或 this.api_demo. 调用Api
export default data;
```
?> **注：使用时注意命名建议加上合理前缀或使用模块名，避免重复和冲突。**

组件中应用：

```js
	import './api.js';
	export default {
		// ...
		created(){
			this.api_demo.shareData = '更新了';
		}
	}
```

```html
	{{api_demo.shareData}}
	<a @click="api_demo.setData('数据更新了')">事件</a>
```

## 持久数据共享-setValue/getValue

持久数据存储与读取，该数据会保留在用户浏览器中。

```js
	//全局
	Vue.setValue(key,value) //设置
	Vue.getValue(key,[exp]) //获取,exp为可选参数，exp根据setValue来计算过期时间。如：获取五分钟内的数据 Vue.getValue('name',300*1000);
	Vue.delValue(key) //删除
	//组件中
	this.setValue(key,value)
	this.getValue(key,[exp])
	this.delValue(key)
```

## 调试输出-devlog

建议项目中使用devlog进行调试输出，停用console.log输出，使用devlog仅在开发模式下有输出。

使用中任然遵循加入前缀的方式，来区分输出的调试信息。

```js
	//全局
	Vue.devlog.log("A模块",data);
	//组件中
	this.devlog.log("A模块",data);
```

## 多语言-t

?> 多语言配置位置 \trunk\src\i18n


```js
	this.t(key,[opt]);//opt 为传入扩展参数
	/*
	//配置示例
	"en": {
	  ...
	  "demo": "Hi,{name}，now：{test.time}{no}。"
	},
	"zh-cn": {
	  ...
	  "demo":"{name},你好，当前时间：{test.time}{no}。",
	}
	*/
	this.devlog.log(this.t('demo',{ name:'张三',test:{ time:(new Date()) },no:'——2017' }))
```


```html
	{{t('setting')}}
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

其他特殊地方获取，可以import导入
```js
import $http from '@/global/$http.js';
$http.post('/api/module/...')
.then(function (response) {
    console.log(response);
})
```

## 打印
```js
	...
	this.goBase.print('.content-part');//传入需要打印的DOM节点 id或class
	...
```
针对打印有特殊样式需要自定义时，请使用@media print并加上合理限定。
参考资料 [http://www.daqianduan.com/6370.html](http://www.daqianduan.com/6370.html)

## 省市区数据
```js
	...
	this.goBase.getAddress(() => {
		//provinceAndCity.getProvinceName(id) //获取名称
		//provinceAndCity.getCityName(id) //获取名称
		//provinceAndCity.getAreaName(id) //获取名称
		//provinceAndCity.getAddressArray() //获取省市区关联数据
		//provinceAndCity.province //省
		//provinceAndCity.city	 //市
		//provinceAndCity.area  //区、县
		//provinceAndCity.getArea('成都市') //获取子集区县
		//provinceAndCity.getCity('四川省') //获取子集城市
	});
	...
```

## 工具库-lodash

用法参考

?> [https://lodash.com/docs/4.17.4](https://lodash.com/docs/4.17.4)

项目中按需引入
```js
import _find from 'lodash/find';

var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

_find(users, { 'user':'fred' });
// => { 'user': 'fred',    'age': 40, 'active': false }
```



## 获得部门人员数

```js
	this.goBase.getMemberNumber(pid,[child]) //pid为部门id，child为可选选参数，默认值true。默认会返回所有子集成员数 
```

## 获得人员姓名



```js
	this.goBase.getMemberName(input,[param1])
	//input 接收人员id 如：123,234,345 或 [123,234,345] ,将返回对应人员姓名
	//param1 控制分割符，默认值是 ' '
```

其他用法
```html
	{{ids|getMemberName}}
	{{ids|getMemberName(',')}}
	{{goBase.getMemberName(ids,',')}}
```


## 获得部门名称
```js
	this.goBase.getDepartmentName(input,param1)
	//input 部门id 如：123,234,345 或 [123,234,345] ,将返回对应部门名称
	//param1 控制分割符，默认值是 ' '
```

其他用法
```html
	{{ids|getDepartmentName}}
	{{ids|getDepartmentName(',')}}
	{{goBase.getDepartmentName(ids,',')}}
```

## 格式化文件大小

```html
     {{123312|renderFileSize}}
```

其他用法

```js
     ...
     this.goBase.renderFileSize('123312')
```

## 日期对象格式化

```html
     {{new Date()|dateToStr}}
     {{new Date()|dateToStr('yyyy-MM-dd hh:mm')}}
```
其他用法

```js
     ...
     this.goBase.dateToStr(new Date(),'yyyy-MM-dd hh:mm')
```

## unix时间格式化

```html
     {{'1233331212'|unixToStr}}
     {{'1233331213'|unixToStr('yyyy-MM-dd')}}
```

其他用法

```js
     ...
	 this.goBase.unixToStr('1233331213','yyyy-MM-dd hh:mm')
```

## 获取全局唯一字符id

```js
	this.goBase.uuid();
```

## 时间数字转字符

```js
	this.goBase.getTimeStr(36060);
```

## 时间字符转数字

```js
	this.goBase.getTimeInt('10:01');
```

## 毫秒转小时

```js
	this.goBase.getSec2Hours(7200);
```

## 计算时长

传入时间戳范围.

```js
	this.goBase.getTimeLength('1507502417,1507515417');
```


## 下载

适用于导出、下载第三方资源等

```js
	this.goBase.download({
		url:'/api/test_download.rar',
		para:{
			page:10
		}
	});
```

## 下载附件

```js
	this.goBase.downloadFile(1010); //传入 file_id
```


## 权限检查

```js
goBase.checkAuth({ app_id:2,appType:1 })        //仅检查是否启用
goBase.checkAuth({ appType:2 }                  //是否超管
goBase.checkAuth({ app_id:2,appType:3 })        //检查是否启用、有应用（管理员/子管理）权限
goBase.checkAuth({ app_id:1,appType:4 })        //检查是否有所有范围权限
goBase.checkAuth({ app_id:2,appType:5 })        //超管、应用管理员可见
goBase.checkAuth({ app_id:2,appType:6 })        //仅应用管理员可见
goBase.checkAuth({ role_show_id:2 })            //应用权限菜单可见
goBase.checkAuth({ role_show_id:1 })            //其他应用菜单可见
goBase.checkAuth({ showDev:true })              //测试 和 正式环境不可见
goBase.checkSubAuth({ app_id:1,dept_id:'8' })   //检查传入部门id是否有应用权限
```
----------
　

　

　

　

　

　

　

　

　

　


