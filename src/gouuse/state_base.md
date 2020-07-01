# 状态管理 base

## 获取基本信息

获取 个人、人员、部门、公司信息

```js
this.$store.state.base.member_info         //获取个人信息
this.$store.state.base.department_list     //获取部门信息
this.$store.state.base.department_list_obj //以部门id为key的所有部门信息
this.$store.state.base.all_member          //获取所有人员信息
this.$store.state.base.all_member_obj      //以用户id为key的所有人员信息
this.$store.state.base.company_info        //获取所属公司信息
this.$store.state.base.all_app             //获取应用信息
this.$store.state.base.all_app_obj         //以app_id为key的应用信息
this.$store.state.base.role_list           //获取角色列表
this.$store.state.base.role_list_obj       //以role_id为key的角色列表
this.$store.state.base.role_group_obj      //以role_group_id为key的角色组列表
this.$store.state.base.position_list       //获取职位列表
this.$store.state.base.position_list_obj   //以position_id为key的职位列表
```

同步方式获取 获取 个人、人员、部门、公司信息

参数|是否必填|默认值|说明
----|--------|------|----
type|否|member_info|目前支持类型:member_info,department_list,all_member,company_info,all_app,role_list,position_list
update|否|false|为true时将调接口获取最新数据，否则获取历史数据
repeat|否|1|获取数据失败后，重试次数

```js

this.$store.dispatch('base_info',{ type:'member_info' }).then(() => {
    //this.$store.state.base.member_info 
});
this.$store.dispatch('base_info',{ type:'department_list' }).then(() => {
    //this.$store.state.base.department_list 
});
this.$store.dispatch('base_info',{ type:'all_member' }).then(() => {
    //this.$store.state.base.all_member 
});
this.$store.dispatch('base_info',{ type:'company_info' }).then(() => {
    //this.$store.state.base.company_info 
});
this.$store.dispatch('base_info',{ type:'all_app' }).then(() => {
    //this.$store.state.base.all_app
    //this.$store.state.base.all_app_obj 
});
this.$store.dispatch('base_info',{ type:'role_list' }).then(() => {
    //this.$store.state.base.role_list
    //this.$store.state.base.role_list_obj
    //this.$store.state.base.role_group_obj
});
this.$store.dispatch('base_info',{ type:'position_list' }).then(() => {
    //this.$store.state.base.position_list
    //this.$store.state.base.position_list_obj
});
```

## 获取用户名 

模板中使用

```html
{{$store.getters.base_member_name}}
```

组件中使用

```js
export default {
	// ...
	computed: {
		member_name () {
		  return this.$store.getters.base_member_name
		}
	}
}
```

或

```js
this.$store.dispatch('base_info',{ type:'member_info' }).then(() => {
    //this.$store.getters.base_member_name
});
```


----------
　

　

　

　

　

　

　

　

　

　


