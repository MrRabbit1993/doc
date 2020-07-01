# 通用API

## 引入图表

文档参考 [http://echarts.baidu.com/examples/](http://echarts.baidu.com/examples/)

```html
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:400px;"></div>
```

```js
window.ljs.load('./static/lib/echarts/echarts.min.js',()=>{
	var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})
```
## 权限判断
方法定义的位置: @/global/scrm_auth.js

```js
this.scrm_auth.checkAuth({appType:2}); // 是否是超管
this.scrm_auth.checkAuth({role_show_manage:true}); // 是否具有管理员权限(是否能进入管理员界面)
this.scrm_auth.checkAuth({is_admin_role:true}); // 是否具有超管授权
this.scrm_auth.checkAuth({appType:3,app_id:0}); // 是否具有公司管理的权限
this.scrm_auth.checkAuth({appType:3,app_id:1}); // 是否具有员工管理的权限
this.scrm_auth.checkAuth({appType:3,app_id:13}); // 是否有销售管理的权限
this.scrm_auth.checkAuth({is_export:true}); // 是否具有从SCRM导出联系人 导出客户的权限
this.scrm_auth.checkAuth({is_assort:true}); //  是否具有分配联系人，分配客户的权限
this.scrm_auth.checkAuth({is_field_manege:true}); //  是否具有管理 联系人属性字段、客户属性字段
this.scrm_auth.checkAuth({is_tag_manege:true}); // 是否有标签的增删改权限
this.scrm_auth.checkAuth({can_view_or_edit:true}); // 是否有部门或公司的查看或者编辑权限
this.scrm_auth.checkAuth({is_leader_dept:true}); // 是否是超管或者部门负责人
this.scrm_auth.checkAuth({is_principal_or_admin:true}); // 是否是企业负责人或者超管
this.scrm_auth.checkAuth({role_show_id:1}); // 办公协同应用管理权限
this.scrm_auth.checkAuth({role_show_id:2}); // 应用权限菜单:超管可见,有至少1个应用管理员权限
this.scrm_auth.checkAuth({appType:4,app_id:xxx}); // 是否具有某个应用的管理权限
this.scrm_auth.checkAuth({appType:5,app_id:xxx}); // 超管 || 某个应用的管理员
this.scrm_auth.checkAuth({appType:1,app_id:xxx}); // 某个应用是否被启用
this.scrm_auth.checkAuth({hidden_pro:true}); // 屏蔽生产环境
this.scrm_auth.checkAuth({showDev:true}); // 只在开发环境显示
```
## 处理时间
1.获得距离今天指定天数前的年月日 格式yyyy-MM-dd
```js
import {getTodayBefore} from '@/global/util.js'
getTodayBefore(6)
```
2.将秒转化成x天x小时x分钟
```js
import {minuToTimeObj} from '@/global/util.js'
minuToTimeObj(minu) // {day:xxx,hour:xxx,minu:xxx,second:xxx}
```

## 处理字符串

1.统计字符串的字节数,一个英文字符记为一个字节，一个汉字字符记为两个字节

```js
import {getLength} from '@/global/util.js'
getLength(str)

```

2.统计字符串中汉字字符的个数
```js
import {getHNum} from '@/global/util.js'
getHNum(str)

```
3.统计字符串中英文字符的个数
```js
import {getENum} from '@/global/util.js'
getENum(str)

```
4.将给定的字符串截取成指定的字节长度(一个汉字为2个字节,一个英文为1个字节)
```js
import {getSliceStr} from '@/global/util.js'
getSliceStr(str,byteLength)
```
5.将包含表情文字的字符串转换成包含表情图片的字符串
```js
import {replaceEmoji} from '@/global/util.js'
replaceEmoji('欢迎光临![可爱]')
```

----------
　

　

　

　

　

　

　

　

　

　


