## 作者想说

如果该组件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)\*✲ﾟ\*  蟹蟹~拜托啦~

## 组件简介
本组件目前支持 input、radio、checkbox、上传图片、日期选择等类型的快速开发，自动判断、自动取值，只要你填写好每项的类型数据，就可以很方便的开发啦！甚至，表单的类型、布局、取值可以由后端接口动态决定！有需要的小伙伴快点下载吧

---

# 更新说明

| 序号 | 更新说明 |
|---|------|
| 2.3 | 新增defaultValue属性，支持input、radio、checkbox的初始化默认值设置,详见一、input、三、radio、四、checkbox|
| 2.2 | 新增时分秒选择与日期融合，详见 五、日期控件|
| 2.1 | 修复pics类型问题，与cssMode为scrollX时样式问题，修复H5 picker-date类型，defaultDate报错问题，修复H5|
| 2.0 | 1、修复input软键盘弹出式样式改变问题（统一单位使用px，数值使用windowHieght计算）<br>2、radio、checkbox、pics等类型统一指定项内数组名为itemArray<br>3、inputs属性改为inputsArray，便于区分<br>4、修复一些bug|
| 1.9 | 新增variableName属性，可自定义该项的变量名, 修复pickers组件的样式问题 |
| 1.8 | 新增日期选择控件 —— picker-date |
| 1.7 | 新增cssMode属性，可控制非input、picker-date类型的项内布局方式,可在父组件传入，也可在项内属性中传入,默认为wrap |
| 1.6 | ruleName属性修改为ruleArray, 可以支持一个以上的规则或协议 |
| 1.5 | 新增radio(单选)类型，checkbox（多选）类型 |
|  | 为提升用户体验，在循环项数较多的情况下，防止超屏，新增overflow_x为scroll(x轴滚动) |
|  | 判断类型使用type判断 |
|  | 完善213-226行的判断写法不正确问题 |
### 新增的defaultValue属性说明
支持input、radio、checkbox的初始化默认值设置， radio仅能设置一个defaultValue为true，若有多个则取最先选中的值

---
# 下次更新方向
picker的城市选择， picker自定义。敬请期待

---

# inputs组件使用说明
注：有引入官方的uni-Icon组件（删除图片的叉叉），可自行修改

## html中使用

```html
<template>
  <view>
	<inputs :inputsArray="inputsArray" activeName="申请入驻" :ifCode="true" 
			:ifRule="true" :ruleArray="ruleArray" 
			v-on:chaildOpenEvent="openWin" 
			v-on:activeFc="activeFc"  :onLoadData="onLoadData" 
			cssMode="wrap"/>
  </view>
</template>
```
## JS中引入、注册并使用组件
```javascript
<script>
  import inputs from /*inputs组件文件路径；*/
  export default {
    data() {
      return {
	    inputsArray: [{
			type: 'picker-date',
			title: '日期',
			startYear: new Date().getFullYear() - 10,
			endYear: new Date().getFullYear() + 10,
			defaultDate: new Date(),
			variableName: 'date',   // 自定义变量名
			mode: 'picker-dateTime'
		},{
			type: 'radio',
			title: 'radioName',
			itemArray: [{
				name: '测试一',
				value: '测试一值'
			}, {
				name: '测试二',
				value: '测试二值'
			}, {
				name: '测试三',
				value: '测试三值'
			}, {
				name: '测试四',
				value: '测试四值'
			}, {
				name: '测试五',
				value: '测试五值'
			}],
			variableName: 'radio_variableName'   // 自定义变量名
		},{
			type: 'checkbox',
			title: 'checkboxName',
			itemArray: [{
				name: '测试一',
				value: '测试一值'
			}, {
				name: '测试二',
				value: '测试二值'
			}, {
				name: '测试三',
				value: '测试三值'
			}, {
				name: '测试四',
				value: '测试四值'
			}, {
				name: '测试五',
				value: '测试五值'
			}],
		},{
			title: '商家名称'
		},{
			title: '商家地址'
		},{
			type: 'pics',
			title: '营业执照',
			itemArray: [{title: '营业执照(三合一)'}]
		},{
			title: '银行名称'
		},{
			title: '银行账户'
		},{
			title: '开户人'
		},{
			title: '身份证号'
		},{
			type: 'pics',
			title: '身份证截图',
			itemArray: [{title: '身份证正面'}, {title: '身份证背面'}]
		},{
			type: 'pics',
			title: '门店图片',
			itemArray: [
                         {title: '门头照'}, 
                         {title: '店内样式1', ignore: true}, 
                         {title: '店内样式2', ignore: true}]
		},{
			title: '商家折扣'
		},{
			title: '手机号',
			phone: true
		}]，
		ruleArray: [{
			name:'用户协议',
			value: 'yonghuxieyi'
		},{
			name:'隐私政策',
			value: 'yinsizhengce'
		}],
		onLoadData： 'data_'	//获取数据时默认变量名前缀
      };
    },
    methods: {
      openWin(value) {
        //打开规则或协议页
		//若有一个以上的rule，则根据value打开规则页面
		console.log(value);
      },
      activeFc(res) {	// 最终取值
        //主方法，携带用户输入的数据对象
        let _this = this;
        console.log(JSON.stringify(res));
        // 如果项内定义了variableName属性，则取值为定义的variableName，否则取值为 this.onloadData + index, onloadData默认值为'data_'
        // 需要把数据传至服务器时也可以把整个对象传过去，由后端直接处理数据，这样可以实现整体的表单类型、布局、取值都由后端决定
        submitFc(res[_this.onLoadData + '0'], res[_this.onLoadData + '1'], ……, function(result) {
          console.log(JSON.stringify(result))
          if(result.data && result.data == 'success')
            _app.showToast('申请发送成功');
          else
            _app.showToast('出了些问题:' + JSON.stringify(result));
          }, function(err) {
            _app.showToast('申请发送失败:' + JSON.stringify(err));
          });
        }
      },
    components: {inputs}
  }
</script>
```

---

## 传给inputs组件的属性
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| inputsArray| 是| Array| []| 需循环的inputs数组（可从后端接口获取）|
| activeName| 是| String| '发送'| 主功能按钮的文字说明|
| ifCode| 否| Boolean| false| 是否启用验证码功能, 若启用则需完善167-172行的发送验证码方法|
| ifRule| 否| Boolean| false| 是否需要用户同意某规则或协议|
| ruleArray| ifRule为true时是| Array| []| 需要用户同意某规则或协议的数组|
| v-on:chaildOpenEvent| ifRule为true时是| Function| | 打开某规则或协议的方法|
| v-on:activeFc| 是| Function| | 主功能方法，携带一个用户所输入的数据对象|
| onLoadData| 否| String| 'data_'| activeFc返回的对象中的数据变量名前缀，后面跟index，看下方说明|
| titleFontSize| 否| Number| 屏幕高度*.021 px | title(左边)的文字大小|
| titleFontColor| 否| String| '#666666'| title(左边)的文字颜色|
| contentFontSize| 否| Number| 屏幕高度*.018 px| 内容(右边)的文字大小|
| cssMode| 否| String| 'wrap'| 非input、picker-date类型的项内布局方式|

### ruleArray属性说明
| 属性 | 说明|
|---|---|
| name| 需要用户同意某规则或协议的名字 |
| value| 需要用户同意某规则或协议的标识(父级方法判断用) |

### cssMode属性说明
| 值| 说明|
|---|---|
| wrap| 布局方式: 全显+换行  |
| scrollX| 布局方式: 非全显+滑动 |
注：cssMode属性可在父级中传入， 默认为wrap，也可在项内属性中传入,优先级: 项内属性>父级属性.


## inputsArray属性说明

### 一、input
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 否| String| ''| 不传该值(因默认为input)|
| title| 是| String| ''| 该项input的标题|
| placeholder| 否| String| '请输入' + this.title| input的placeholder文字|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
| inputType| 否| String| 'text'| 该项input的类型|
| phone| 否| Boolean| false| 是否设此项为手机号input(判断时，判断此属性)|
| variableName| 否| String| this.onloadData\|\|'data_' + index| 自定义变量名,取值时用|
| defaultValue| 否| String| ''| 该项input的初始化默认值|
### 二、上传图片
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'pics'|
| itemArray| 是| Array| []| 循环的图片数组，下方说明|
| title| 否| String| ''| 该项图片的标题|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| cssMode| 否| String| 'wrap'| 非input、picker-date类型的项内布局方式|
| variableName| 否| String| this.onloadData\|\|'data_' + index| 自定义变量名,取值时用|
#### pics的itemArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| title| 否| String| ''| 该项图片的标题|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
| ignore| 否| Boolean| false| 可以为空， 不判断是否为空,默认为必填，必填则在title前面有 * 标识|
注：若启用此项，则需完善245-251行的上传图片至服务器方法
### 三、radio(单选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'radio'|
| title| 否| String| ''| 该项radio的标题|
| itemArray| 是| Array| []| 需循环的radio数组|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
| cssMode| 否| String| 'wrap'| 非input、picker-date类型的项内布局方式|
| variableName| 否| String| this.onloadData\|\|'data_' + index| 自定义变量名,取值时用|
#### radio的itemArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| name| 是| String| ''| 该radio的标题|
| value| 是| | | 该项radio的值|
| defaultValue| 否| Boolean| false| 该项radio的初始化默认值,(只能设置一个true，若设置多个为true，则取最先为true的值)|
### 四、checkbox(多选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'checkbox'|
| title| 否| String| ''| 该项checkbox的标题|
| itemArray| 是| Array| []| 需循环的checkbox数组|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
| cssMode| 否| String| 'wrap'| 非input、picker-date类型的项内布局方式|
| variableName| 否| String| this.onloadData\|\|'data_' + index| 自定义变量名,取值时用|
#### checkbox的itemArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| name| 是| String| ''| 该checkbox的标题|
| value| 是| | | 该项checkbox的值|
| defaultValue| 否| Boolean| false| 该项checkbox的初始化默认值|

注： checkbox类型与radio类型差不多，只是取值时checkbox为数组，根据需求使用

### 五、日期控件
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'picker-date'|
| title| 否| String| ''| 该项picker的标题|
| indicatorStyle| 否| String| 'height: '+ 屏幕高度*.05 +'px;'| picker的行内样式|
| height| 否| String| 屏幕高度*.2 px| picker的高度(vh)|
| mode| 否| String| 'picker-date'| picker-date的类型|
| startYear| 否| Number| new Date().getFullYear() - 5（前五年）| 开始年份, 可直接输入四位数字|
| endYear| 否| Number| new Date().getFullYear() + 5 (后五年)|  结束年份, 可直接输入四位数字|
| defaultDate|否|Date日期对象| new Date()|默认日期, 可传new Date(年,月,日,时,分,秒),为空则默认为现在|
| variableName| 否| String| this.onloadData\|\|'data_' + index| 自定义变量名,取值时用|
#### mode属性说明
| 值|  值类型|说明|
|------|---|----|---|-------|
| picker-dateTime| String| 日期加时间|
| picker-date| String| 日期|
| picker-time| String| 时间|

注：所传的defaultDate若不在范围中，则将显示范围内的最后一年最后一月最后一日;



