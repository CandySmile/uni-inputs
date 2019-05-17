## 可直接拖进项目运行

## 作者想说
感谢各位小伙伴的不断建议，inputs组件的进步都是因为你们哦~！

如果该组件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)\*✲ﾟ\*  蟹蟹~拜托啦~

## 组件简介
本组件目前支持 input、textarea、radio、checkbox、switch、slider、上传图片、日期选择、城市选择、省市区乡镇街道、picker可联动自定义等类型的快速开发，自动判断、自动取值，只要你填写好每项的类型数据，就可以很方便的开发啦！甚至，表单的类型、布局、取值可以由后端接口动态决定！有需要的小伙伴快点下载吧

---
# 警告
自定义组件模式好像传不了函数属性， 所以 input类型的过滤函数及校验函数不起作用

# 更新说明

| 版本号 | 更新说明 |
|--------|:----------|
| v5.6 | 修复setFocus方法传入参数为0时判断出错问题,顺便修复验证码框focusStyle问题|
| v5.5 | 1、inputs新增`focusStyle`属性(控制input、textarea类型focus或blur时的边框颜色)，input、textarea类型新增focusBorderStyle、blurBorderStyle属性(控制input、textarea类型focus或blur时的边框颜色,优先级大于focusStyle), 详见`1.`<br />2、inputs内新增`setFocus`方法, 用于设置指定的input或textarea的focus属性, 可用`ref方式`调用, 详见`2.0.1`<br />3、突然发现验证码的input框忘记加focusStyle了，下次更新吧|
| v5.4 | 1、input、textarea类型新增`verifyType`(内置正则验证, 有需求的自行添加)<br />2、验证码输入框强制防抖<br />3、修改picker类型的按钮字体大小默认大小与右边文字默认大小一致，并修复该类型的按钮会变形的bug<br />4、修改switch、radio、checkbox的scale默认值为'.8', 并且修改该属性的值类型为`String`<br />5、优化activeFc方法中判断pics的代码|
| v5.3 | 1、switch、radio、checkbox，新增`scale`属性<br />2、限制防抖只能input与textarea类型使用<br />3、pics类型图片选中后，增加阴影<br />4、`废弃cssMode属性`，统一wrap布局<br />5、test页面新增 根据后端获取值给inputs赋值`初始值示例`、`动态增加inputs类型示例`|
| v5.2 | 优化部分样式（pics与textarea类型，textarea类型新增width、backgroundColor、color属性）|
| v5.1 | 优化input类型输入`防抖间隔冲突`，防止用户在防抖间隔后立即输入时出现卡顿的感觉，优化用户体验|
| v5.0 | 优化input类型输入防抖（新增`inputDebounceSet`属性, 其实防抖的不止input类型，是除了picker与checkbox类型的其他类型）, 修复checkbox类型的初始值视图问题|
| v4.9 | 修复picker-provincialStreet类型在自定义组件模式下报错问题，并修复重庆、甘肃等地区的乡、镇、街道数据，若所选择的地区没有街道数据，则为空， 感谢qq：3127653386小伙伴发现的问题~|
| v4.8 | 修复picker-date类型在iOS上的问题（`初始化日期格式已定死`，详见 八、日期选择 的defaultValue属性），感谢unique542@qq.com(243558987)小伙伴发现并查找解决问题！|
| v4.7 | 1、修复picker-custom2所传的数据类型问题（如果使用无联动类型请传itemArray参数，如果使用联动类型请传itemObject参数，因为类型不同，不分开来会报错）<br />2、inputsArray循环时改为使用item.title作为key，所以title每项都必须传！！，不然报错|
| v4.6 | 修复没传buttonStyle就报错问题|
| v4.5 | 1、新增text类型用于展示信息<br />2、增强布局可控性（新增`titleHide`属性，可以隐藏title，并且在设置titleHide为true时，可控制右边部分的width-->contentSet.width，contentSet与titleSet的layout属性新增center值居中显示，因此，在设置titleHide为true并且设置contentSet.layout为center以及设置contentSet.width<100的值时，可以实现预览图中模拟登陆的布局效果）<br />3、获取验证码按钮移到了验证码input的右边<br />4、删除title的冒号，若要回复则在inputs.vue中将title相应的代码取消注释，并删除另外的<br />5、规则及协议改为居中布局<br />6、修复picker-custom2中itemArray的类型|
| v4.4 | 新增picker-custom优化版`picker-custom2`，解决custom数据类型无法使用问题，详见十（2）、picker-custom2， 修复示例中input类型的verifyFc示例 ， 有小伙伴反应picker-custom类型数据使用不了，其实是所传的数据不是json标准格式的数据导致JSON.parse不了，其实从后端拿数据应该不会有这样的问题的|
| v4.3 | input新增`校验功能`|
| v4.2 | 1、新增button样式控制(详见inputs属性说明-buttonStyle)<br />2、pics类型清除按钮新增颜色控制(详见pics类型)<br />3、废弃 titleFontColor 与 titleFontSize 与 contentFontSize 属性，统一归纳到titleSet、contentSet属性中，并增加左对齐或右对齐属性<br />4、废弃ruleArray属性，归纳到ruleSet属性中，并增加设置规则或协议文字颜色，选中框颜色<br />5、若不传activeName（主按钮名称）属性，则不显示主按钮，可以用ref调用inputs的activeFc方法获取输入|
| v4.1 | 新增`省市区乡镇街道四级联动类型`，详见十一、省市区乡镇街道选择<br />(乡镇街道数据文件完整的需1.5MB左右，目前使用的是600KB，只有街道name无code，若需完整街道数据文件，可以找我拿，甚至自定义生成省市区街道数据格式的方法也可以找我拿，若需求多，可上传为另一个插件， 另外， 若无此类型需求并且嫌此组件体积过大可将乡镇街道数据文件删除，并注释相关import代码)|
| v4.0 | 修复picker类型（特别是picker-date）在页面设置custom时picker选择问题|
| v3.9 | 模板中动态样式转到data中,修复textarea类型设置初始值删不掉bug|
| v3.8 | 1、input类型新增过滤函数属性-`filterFc`<br />2、修复h5日一列与时间显示不正确问题<br />|
| v3.7 | 1、增加checkbox类型返回选中状态<br />2、去除changeReset属性，父级传入的inputsArray改变时自动初始化数据<br />3、新增`submitReSet`属性：提交数据后是否重置inputs为初始化<br />4、优化细节<br />5、完善一些注释|
| v3.6 | 修复input类型的一键清除功能在空值时也显示的问题与多项input时inputTap事件无效问题|
| v3.5 | 修复1.8.0新版编译器picker类型bug，并优化picker类型选择记忆，优化picker类型细节，修改picker-date类型defaultValue属性类型为字符串<br />修复上传图片类型|
| v3.4 | input类型 新增 `左边自定义图标`、`一键清除数据功能`、`密码显隐功能`, 可直接拖进项目运行|
| v3.3 | 新增picker可联动自定义类型——picker-custom，(无线无联动+自定义二、三级联动) 详见 十、picker-custom<br />2、修改更新方向|
| v3.2 | 优化布局，新增`segmentationTitle`、`border_bottom`、`border_top`等项内公共属性，修复input无法输入问题|
| v3.1 | 新增textarea类型,完善input类型|
| v3.0 | 1、新增switch、slider，修复checkbox、radio、input（初始化后不改动的情况下）从后台进入前台视图还原为初始化问题（数据不变）<br />2、input、radio、checkbox、switch、slider，各增disabled属性<br />3、修复H5 picker-date类型月份显示不正确问题|
| v2.9 | 新增入场动画（小程序不建议使用此动画，会卡），animationType动画类型属性，animationDuration动画时长系数属性（父级需v-bind传入Number类型，不然H5会报错），这两个属性可以以父级属性统一传入，亦可以项内属性单独传入,详见下方 |
| v2.8 | 紧急修复从后台进入前台input视图为空bug（数据还在）,例如选择图片后返回时input视图为空 |
| v2.7 | 修复picker初始值显示，并增加该属性，详见picker类型 |
| v2.6 | 修复h5报错问题，修改picker类型选择方式为弹出,并增加picker按钮名属性 |
| v2.5 | 1、引入官方picker-city城市选择(稍做修改)<br>2、更改日期控件的默认值defaultDate属性为defaultValue<br>3、修复未判断picker-city的bug|
| v2.4 | 新增changeReSet属性|
| v2.3 | 1、新增defaultValue属性，支持input、radio、checkbox、pics的初始化默认值设置,详见一、input、二、pics、三、radio、四、checkbox， <br>2、新增选中的图片可大图预览|
| v2.2 | 新增时分秒选择与日期融合，详见 五、日期控件|
| v2.1 | 修复pics类型问题，与cssMode为scrollX时样式问题，修复H5 picker-date类型，defaultDate报错问题，修复H5|
| v2.0 | 1、修复input软键盘弹出式样式改变问题（统一单位使用px，数值使用windowHieght计算）<br>2、radio、checkbox、pics等类型统一指定项内数组名为itemArray<br>3、inputs属性改为inputsArray，便于区分<br>4、修复一些bug|
| v1.9 | 新增variableName属性，可自定义该项的变量名, 修复pickers组件的样式问题 |
| v1.8 | 新增日期选择控件 —— picker-date |
| v1.7 | 新增cssMode属性，可控制拥有子项数组的类型的项内布局方式,可在父组件传入，也可在项内属性中传入,默认为wrap |
| v1.6 | ruleName属性修改为ruleArray, 可以支持一个以上的规则或协议 |
| v1.5 | 新增radio(单选)类型，checkbox（多选）类型 |
|  | 为提升用户体验，在循环项数较多的情况下，防止超屏，新增overflow_x为scroll(x轴滚动) |
|  | 判断类型使用type判断 |
|  | 完善213-226行的判断写法不正确问题 |


# inputs组件使用说明
注：有引入官方的uni-Icon组件（删除图片的叉叉、input一键清除叉叉、input左边自定义图标、密码显隐图标），可自行修改

## html中使用

```html
<template>
  <view>
	<inputs 
	ref="inputs"
	:inputsArray="inputsArray" 
	ifRule
	ifCode 
	activeName="获取输入"
	:ruleSet="ruleSet"
	@chaildOpenEvent="openWin"
	@activeFc="activeFc"
	:onLoadData="onLoadData"
	cssMode="wrap"
	animationType="rotate3d-fade"
	:animationDuration=".4"
	submitReSet
	:buttonStyle="buttonStyle"
	:inputDebounceSet="inputDebounceSet"
	:focusStyle="focusStyle"/>
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
                focusStyle: { //控制input或textarea类型focus或blur时的边框颜色
					focusBorderStyle: '#999999',
					blurBorderStyle: '#f8f8f8'
				},
				inputDebounceSet: { //input、textarea防抖设置
					openInputDebounce: true,
					delay: 500
				},
		        "buttonStyle": { //按钮样式
					"activeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //主按钮样式
					"changeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型更改按钮样式
					"selectButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型选择按钮样式
					"confirmButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型弹出框中确定按钮样式
					"getcodeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;" //获取验证码按钮样式
				},
				"inputsArray": [{
						"segmentationTitle": "展示信息", //分割大标题
						"border_top": "1px solid #f2f2f2", //上划线
						"type": "text",
						"title": "text示例",
						"content": "展示text信息展示text信息展示text信息展示text信息展示text信息展示text信息展示text展示text信息展示text信息展示text信息展示text展示text信息展示text信息",
						"ellipsis": true
					},{
						"segmentationTitle": "表单组件", //分割大标题
						"type": "slider", //类型
						"title": "slider", //标题
						"defaultValue": 50, //默认值
						"min": 0,
						"max": 100,
						"show_value": true,
						"disabled": false,
						"activeColor": "#c0ebd7",
						"step": 1,
						"border_top": "1px solid #f2f2f2", //上划线
						"variableName": "slider" //自定义变量名
					},
					{
						"type": "textarea",
						"title": "textarea",
						"defaultValue": "今天也要加油鸭~" //默认值
					},
					{
						"type": "switch",
						"title": "switch",
						"color": "#c0ebd7",
						"defaultValue": true,
						"variableName": "switch" //自定义变量名
					},
					{
						"title": "radio",
						"type": "radio",
						"itemArray": [{ //子循环数组
							"name": "aa",
							"value": "aa",
							"defaultValue": true
						}, {
							"name": "bb",
							"value": "bb"
						}],
						"color": "#c0ebd7"
					},
					{
						"title": "checkbox",
						"type": "checkbox",
						"itemArray": [{ //子循环数组
							"name": "a",
							"value": "a",
							"defaultValue": true
						}, {
							"name": "b",
							"value": "b",
							"defaultValue": true,
							"disabled": true
						}, {
							"name": "c",
							"value": "c",
							"defaultValue": true
						}],
						"variableName": "checkbox",
						"color": "#c0ebd7"
					}, {
						"title": "内置正则校验Email",
						"verifyType": "Email",
						"defaultValue": "494843897@qq.com"
					}, {
						"title": "手机号校验",
						"verifyFc": function(value) {
							if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value))
								return true;
							return false;
						},
						"verifyErr": "手机号校验错误"
					}, {
						"title": "input",
						"ignore": true, //是否可忽略该值(判断时此项值可以为空)
						"defaultValue": "今天也要加油鸭~",
						"tapClear": true, //input一键清除功能
						"password": true, //input密码类型
						"icon": "search", //input左边图标
						"iconColor": "#c0ebd7", //input图标颜色
						"filterFc": function(value) { //input值过滤函数
							//自定义过滤函数
							value = "filter过滤后的值";
							return value;
						},
						"variableName": "input" //自定义变量名
					}, {
						"segmentationTitle": "上传图片",
						"type": "pics",
						"title": "pics",
						"itemArray": [{
							"title": "测试1",
							"ignore": true
						}, {
							"title": "测试2",
							"ignore": true
						}],
						"variableName": "pic",
						"border_top": "1px solid #f2f2f2",
						"clearColor": "#c0ebd7"
					},
					{
						"segmentationTitle": "picker类型",
						"border_top": "1px solid #f2f2f2",
						"type": "picker-provincialStreet",
						"title": "provincialStreet",
						"onceShowDefaultValue": true, //初始化时显示初始值
						"variableName": "provincialStreet"
					},
					{
						"type": "picker-date",
						"title": "date"
					},
					{
						"type": "picker-city",
						"title": "city",
						"defaultValue": [10, 6, 0],
						"onceShowDefaultValue": true,
						"variableName": "city"
					},
					{ // 无联动示例1
						"segmentationTitle": "picker-custom示例",
						"border_top": "1px solid #f2f2f2",
						"type": "picker-custom",
						"title": "custom-无联动示例1",
						"itemArray": [
							[0, 1, 2],
							[3, 4, 5]
						],
						"defaultValue": [0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
					},
					{ // 无联动示例2
						"type": "picker-custom",
						"title": "custom-无联动示例2",
						"itemArray": [
							[{
								"name": "a", //name变量名需与下方steps.steps_1_value相同
								"value": "a" //可添加多项自定义想要的数据
							}, {
								"name": "b",
								"value": "b"
							}, {
								"name": "c",
								"value": "c"
							}],
							[{
								"name": "d",
								"value": "d"
							}, {
								"name": "e",
								"value": "e"
							}, {
								"name": "f",
								"value": "f"
							}]
						],
						"defaultValue": [0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"steps": {
							"steps_1_value": "name"
						}
					},
					{ // 二级联动示例1
						"type": "picker-custom",
						"title": "custom-二级联动示例1",
						"defaultValue": [1, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"itemArray": [{
							"value_1": "蔬菜", //value_1变量名需与下方steps.steps_1_value相同
							/*
							可添加多项自定义想要的数据
							*/
							"item_2": ["青菜"] //item_2变量名需与下方steps.steps_2_item相同
						}, {
							"value_1": "荤菜",
							"item_2": ["猪肉"]
						}],
						"steps": {
							"steps_1_value": "value_1",
							"steps_2_item": "item_2"
						},
						"linkageNum": 2, //2 表示为2级联动
						"linkage": true //true 表示开启联动
					},
					{ // 二级联动示例2
						"type": "picker-custom",
						"title": "custom-二级联动示例2",
						"defaultValue": [0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"itemArray": [{
							"value_1": "蔬菜", //value_1变量名需与下方steps.steps_1_value相同
							/*
							可添加多项自定义想要的数据
							*/
							"item_2": [{ //item_2变量名需与下方steps_2_item相同
								"name": "青菜", //name变量名需与下方steps.steps_2_value相同
								"value": "青菜" //可添加多项自定义想要的数据
							}]
						}, {
							"value_1": "荤菜",
							"item_2": [{
								"name": "猪肉",
								"value": "猪肉"
							}]
						}],
						"steps": {
							"steps_1_value": "value_1",
							"steps_2_value": "name",
							"steps_2_item": "item_2"
						},
						"linkageNum": 2, //2 表示为2级联动
						"linkage": true //true 表示开启联动
					},
					{ // 三级联动示例1
						"type": "picker-custom",
						"title": "custom-三级联动示例1",
						"itemArray": [{
							"value_1": "浙江", //value_1变量名需与下方steps.steps_1_value相同
							/*
							可添加多项自定义想要的数据
							*/
							"item_2": [{ //item_2变量名需与下方steps.steps_2_item相同
								"value_2": "金华", //value_2变量名需与下方steps.steps_2_value相同
								/*
								可添加多项自定义想要的数据
								*/
								"item_3": ["婺城区"] //item_3变量名需与下方steps.steps_3_item相同
							}, {
								"value_2": "绍兴",
								"item_3": ["越城区"]
							}]
						}, {
							"value_1": "江苏",
							"item_2": [{
								"value_2": "南京",
								"item_3": ["玄武区"],
							}, {
								"value_2": "无锡",
								"item_3": ["锡山区"]
							}]
						}],
						"steps": {
							"steps_1_value": "value_1",
							"steps_2_value": "value_2",
							"steps_2_item": "item_2",
							"steps_3_item": "item_3"
						},
						"defaultValue": [1, 0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"linkageNum": 3, //3 表示为3级联动
						"linkage": true //true 表示开启联动
					},
					{ // 三级联动示例2
						"type": "picker-custom",
						"title": "custom-三级联动示例2",
						"itemArray": [{
							"value_1": "江西", //value_1变量名需与下方steps.steps_1_value相同
							/*
							可添加多项自定义想要的数据
							*/
							"item_2": [{ //item_2变量名需与下方steps.steps_2_item相同
								"value_2": "南昌", //value_2变量名需与下方steps.steps_2_value相同
								/*
								可添加多项自定义想要的数据
								*/
								"item_3": [{ //item_3变量名需与下方steps.steps_3_item相同
									"name": "东湖", //name变量名需与下方steps.steps_3_value相同
									/*
									可添加多项自定义想要的数据
									*/
								}]
							}, {
								"value_2": "九江",
								"item_3": [{
									"name": "德安"
								}]
							}]
						}, {
							"value_1": "山东",
							"item_2": [{
								"value_2": "济南",
								"item_3": [{
									"name": "历下"
								}],
							}, {
								"value_2": "青岛",
								"item_3": [{
									"name": "市南"
								}]
							}]
						}],
						"steps": {
							"steps_1_value": "value_1",
							"steps_2_value": "value_2",
							"steps_2_item": "item_2",
							"steps_3_value": "name",
							"steps_3_item": "item_3"
						},
						"defaultValue": [1, 0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"linkageNum": 3, //3 表示为3级联动
						"linkage": true //true 表示开启联动
					}, {
						"type": "picker-custom2",
						"title": "custom2-无联动示例1",
						"itemArray": [
							[0, 1, 2],
							[3, 4, 5]
						],
						"steps": {
							"step_1_value": "", //第一级显示的属性名
							"step_2_value": "", //第二级显示的属性名
							"step_3_value": "" //第三级显示的属性名
						},
						"defaultValue": [0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
					}, {
						"type": "picker-custom2",
						"title": "custom2-无联动示例2",
						"itemArray": [
							[{
								"name": "a", //name变量名需与下方steps.steps_1_value相同
								"value": "a" //可添加多项自定义想要的数据
							}, {
								"name": "b",
								"value": "b"
							}, {
								"name": "c",
								"value": "c"
							}],
							[{
								"name": "d",
								"value": "d"
							}, {
								"name": "e",
								"value": "e"
							}, {
								"name": "f",
								"value": "f"
							}]
						],
						"steps": {
							"step_1_value": "name", //第一级显示的属性名
							"step_2_value": "", //第二级显示的属性名
							"step_3_value": "" //第三级显示的属性名
						},
						"defaultValue": [0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
					},
					{
						"type": "picker-custom2",
						"title": "custom2-二级联动示例",
						"itemObject": {
							"step_1": [{
								"name": "蔬菜",
								"value": "001"
							}, {
								"name": "荤菜",
								"value": "002"
							}],
							"step_2": [
								["青菜", "白菜"], //对应step_1的蔬菜
								["猪肉", "牛肉"] //对应step_1的荤菜
							]
						},
						"steps": {
							"step_1_value": "name", //第一级显示的属性名
							"step_2_value": "", //第二级显示的属性名
							"step_3_value": "" //第三级显示的属性名
						},
						"defaultValue": [1, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"linkageNum": 2, //3 表示为3级联动
						"linkage": true //true 表示开启联动
					},
					{
						"type": "picker-custom2",
						"title": "custom2-三级联动示例",
						"itemObject": {
							"step_1": [{
								"name": "江西"
							}, {
								"name": "山东"
							}],
							"step_2": [
								["南昌", "九江"], //对应step_1的江西
								["济南", "青岛"] //对应step_1的山东
							],
							"step_3": [
								[
									[ //对应step_2的南昌
										"东湖"
									],
									[ //对应step_2的九江
										"德安"
									]
								],
								[
									[ //对应step_2的济南
										"历下",
									],
									[ //对应step_2的青岛
										"市南",
									]
								]
							]
						},
						"steps": {
							"step_1_value": "name", //第一级显示的属性名
							"step_2_value": "", //第二级显示的属性名
							"step_3_value": "" //第三级显示的属性名
						},
						"defaultValue": [1, 0, 0], //初始数据
						"onceShowDefaultValue": true, //是否显示初始数据
						"linkageNum": 3, //3 表示为3级联动
						"linkage": true //true 表示开启联动
					}, {
						"title": "手机号",
						"phone": true,
						"defaultValue": "13305679845"
					}
				],
				"ruleSet": {
					"color": "#c0ebd7",
					"checkbox_color": "#c0ebd7",
					"itemArray": [{
						"name": "某规则",
						"value": "aa"
					}],
				},
				"onLoadData": "data_",
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
        }
    },
    components: {inputs}
  }
</script>
```

---

# `1. 传给inputs组件的属性`
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| inputsArray| 是| Array\<Object\>| | 需循环的inputs数组（可从后端接口获取）, 详见3.|
| @activeFc| 是| Function| | 主功能方法，携带一个用户所输入的数据对象|
| activeName| | String| | 主功能按钮的文字说明，不传该值，则主按钮不显示，可以用ref调用inputs的activeFc方法获取输入|
| ifCode| | Boolean| false| 是否启用验证码功能, 若启用则需完善916-921行的发送验证码方法, 并需设置一项input的phone属性为true|
| ifRule| | Boolean| false| 是否需要用户同意某规则或协议|
| ~~ruleArray(废弃,请使用ruleSet)~~| ifRule为true时是| Array\<Object\>| | 需要用户同意某规则或协议的数组|
| @chaildOpenEvent| ifRule为true时是| Function| | 打开某规则或协议的方法|
| onLoadData| | String| 'data_'| activeFc返回的对象中的数据变量名前缀，后面跟index，看下方说明|
| ~~cssMode（废弃，统一wrap布局）~~| | String| 'wrap'| 可控制拥有子项数组的类型的项内布局方式|
| ~~changeReSet(废弃)~~| | Boolean| false| 在inputsArray改变时可重置所有数据为空，但不重置视图，若需重置视图看下方说明|
| submitReSet| | Boolean| false| 提交数据后是否重置数据为初始化|
| animationType| | String| | 入场动画类型, 详见1.0.1|
| animationDuration| | Number| | 入场动画时长系数(index+1 ， 乘以此系数为动画时长)|
| ruleSet| | Object<String\|Array> |  | 规则或协议设置, 详见1.0.4 |
| buttonStyle| | Object<String>| | button自定义样式, 详见1.0.5|
| titleSet| | Object<String>|  | title(左边)设置, 详见1.0.6|
| contentSet| | Object<String>| | content(右边)设置, 详见1.0.7|
| titleHide| | Boolean| false| 隐藏title|
| inputDebounceSet| | Object| | input类型输入防抖设置, 详见1.0.8|
| focusStyle| | Object| | 控制input或textarea类型focus或blur时的边框颜色, 详见1.0.9|
注：titleFontSize、titleFontColor、contentFontSize、changeReSet、ruleArray等属性已废弃

### 1.0.1 animationType属性说明

可作为父级属性统一传入，也可项内属性单独传入，目前支持的类型有：fadIn、refadIn、slide-left、slide-fade-left、slide-right、slide-fade-right、slide-fade-bottom、rotate3d-fade等。动画也可自定义，只要定义动画后定义好class属性就可以了。

### 1.0.2 ~~changeReSet属性说明(废弃，3.7版本后自动初始化数据)~~
在父级传入的inputsArray改变时，可以选择重置数据，但是视图的重置需要先inputsArray=[ ]后setTimeout 300或者多少后重新赋值，过程中可以设置主按钮文字为‘加载中’等，可增强用户体验


### 1.0.3 ~~cssMode属性说明(废弃，统一wrap布局)~~
| 值| 说明|
|---|---|
| wrap| 布局方式: 全显+换行  |
| scrollX| 布局方式: 非全显+滑动 |
注：cssMode属性可在父级中传入， 默认为wrap，也可在项内属性中传入,优先级: 项内属性>父级属性.

### 1.0.4 ruleSet属性说明
| 值| 值类型| 默认值| 说明|
|---|---|---|---|
| color| Color| `#007aff`| 规则或协议文字颜色 |
| checkbox_color| Color| `#007aff`| 规则或协议选中框颜色 |
| itemArray| Object| | 需循环的规则或协议 |

#### 1.0.4.0.1 ruleSet的itemArray属性说明
| 值| 值类型| 默认值| 说明|
|---|---|---|---|
| name| String| | 规则或协议名称  |
| value| all| | 规则或协议的标识 |
| color| Color| | 规则或协议的文字颜色（优先于ruleSet的color） |

### 1.0.5 buttonStyle属性说明
| 值| 值类型| 默认值| 说明|
|---|---|---|---|---|---|
| activeButton| CssStyle| |  主按钮样式  |
| changeButton| CssStyle|  |  picker类型更改按钮样式 |
| selectButton| CssStyle|  |  picker类型选择按钮样式 |
| confirmButton| CssStyle|  |  picker类型弹出框中确定按钮样式 |
| getcodeButton| CssStyle|  |  获取验证码按钮样式 |

### 1.0.6 titleSet属性说明
| 值| 值类型| 默认值| 说明|
|---|---|---|---|---|---|
| size| Number| 屏幕高度*`.021`| title字体大小 |
| color| Color| `#666666`| title文字颜色|
| layout| String| `right`| title对齐方式(设置 left 则为左对齐，center为居中， 否则右对齐) |

### 1.0.7 contentSet属性说明
| 值| 值类型| 默认值| 说明|
|---|---|---|---|
| size| Number| 屏幕高度*`.018`| content字体大小  |
| width| Color| `100`| content的宽度，在titleHide设置为true时生效，单位 `%`  |
| layout| String| `right`| content对齐方式(设置 left 则为左对齐，center为居中， 否则右对齐) |

### 1.0.8 inputDebounceSet属性说明(5.0新增)
| 值| 值类型| 默认值| 说明|
|---|---|---|---|
| openInputDebounce| Boolean |`false`|是否开启input输入防抖 |
| delay| Number |`500`|输出延迟时间 |

注：  其实防抖的不止input类型，是除了picker与checkbox类型的其他类型

### 1.0.9 focusStyle属性说明(5.5新增)
| 值| 值类型| 默认值| 说明|
|---|---|---|---|
| focusBorderStyle| Color| `#999999`|  input或textarea类型focus时的边框颜色 |
| blurBorderStyle| Color| `#f8f8f8`|  input或textarea类型blur时的边框颜色 |

---

# 2. ref调用方法说明(列出的是可能用到的)
| 方法名| 功能| 参数|
|------|----|----|----|-------|
| activeFc| 主功能方法， 触发绑定的activeFc获取用户输入方法| |
| setFocus| 设置指定input、textarea类型的focus值| 见下方示例|
| picker_hideFc| 关闭所有弹出picker| |
| inputs_reSet| 重置inputs为初始化| |

## 2.0.1 setFocus示例
#### 传入参数（Number | Function）, focus值(Boolean)
```javascript
//setFocus示例1
this.$refs.inputs.setFocus(2, true);
```

```javascript
//setFocus示例2
this.$refs.inputs.setFocus((inputsArray)=>{ //可以接收一个参数也可以在下面自己获取当前inputsArray数组
	let i = inputsArray.findIndex((item)=>{	//findIndex方法 返回符合测试条件的第一个数组元素索引，如果没有符合条件的则返回 -1
		return item.title === '手机号校验';
	})
	return i;
	//可以不使用findIndex方法，但是必须return一个Number
}, true);
```


# 3. inputsArray详解
## `inputsArray项内公共属性`

| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 除input类型外是| String| | 该项的类型|
| title| 是| String| | 该项的标题|
| ignore| | Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| | String| `this.title + '不能为空'`| 为空时提示|
| variableName| | String| `(this.onloadData|'data_') + index`| 自定义变量名,取值时用|
| defaultValue| | 根据各类型而定| | 该项初始化默认值|
| segmentationTitle| | String| | 分割大标题|
| border_bottom| | String| | 下边框，例 `'1px solid #F2F2F2'`|
| border_top| | String| | 上边框，例 `'1px solid #F2F2F2'`|

##  目前共十一种类型

### 3.0.1 input
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| | String| | 不传该值(因默认为input)|
| placeholder| | String| `'请输入' + this.title`| input的placeholder文字|
| inputType| | String| `text`| 该项input的类型|
| password| | Boolean| false| 是否是密码类型, 为true时自动开启密码显隐功能|
| phone| | Boolean| false| 是否设此项为手机号input(判断时，判断此属性，最多设置一项)|
| disabled| | Boolean| false| 是否禁用|
| placeholder_style| | String| | 指定 placeholder 的样式|
| placeholder_class| | String| | 指定 placeholder 的样式类|
| maxlength| | Number| 140| 该项input的最大输入长度,-1则不限|
| cursor_spacing| | Number| | 详见官网input|
| focus| | Boolean| false| 获取焦点|
| confirm_type| | Number| done| 设置键盘右下角按钮的文字，仅在 `type="text"` 时生效|
| confirm_hold| | Number| | 详见官网input|
| selection_start| | Number| -1| 光标起始位置，自动聚集时有效，需与selection-end搭配使用|
| selection_end| | Number| -1| 光标结束位置，自动聚集时有效，需与selection-start搭配使用|
| cursor| | Number| | 指定focus时的光标位置|
| adjust_position| | Boolean| true| 详见官网input|
| tapClear| | Boolean| false| 是否开启`一键清除功能`|
| icon| | String| | input左边`自定义图标`(目前使用官方uniIcon，可自行修改)|
| iconColor| | String| `#999999`| 左边自定义图标与密码显示时图标颜色（密码显示默认颜色为`#33CC33`）|
| filterFc| | Fuction| | `自定义过滤值函数`|
| verifyFc| | Fuction| | `自定义校验值函数`|
| verifyErr| | String| | `校验错误提示`|
| verifyType| | String| | `内置正则校验`, 可取值见下方, 优先级大于自定义的verifyFc |
| focusBorderStyle| | Color| `#999999`| input或textarea类型focus时的边框颜色, 优先级大于focusStyle |
| blurBorderStyle| |Color| `#f8f8f8`| input或textarea类型blur时的边框颜色, 优先级大于focusStyle |
注：最好看源码对照官网属性

#### 3.0.1.0.1 filterFc示例  3.8更新

```javascript
{
 title: '有过滤函数的input'，
 filterFc: function(value) { // 必须接收一个参数
  value = '过滤后的值';
  return value; //必须return
 }
}
```

#### 3.0.1.0.2 verifyFc示例  4.3更新

```javascript
{
	title: "手机号校验",
	verifyFc: function(value) {
		if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value))
			return true;
		return false;
	},
	verifyErr: "手机号校验错误"
}
```

#### 3.0.1.0.3 verifyType属性可取值(内置正则校验)
| 可取值| 说明|
|------|-------|
| Tel| 手机号|
| Email| 电子邮箱|
| idCart| 身份证号|
| NationalNumber| 国内号码|
| QQ| QQ号|
| PostalCode| 邮政编码|
| IpAddress| IP地址|
| Chinese| 中文字符|
| Char| 英文字母|
| Int| 整数|
| Number| 数字|

---

### 3.0.2  textarea
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'textarea'`|
| height| | Number| 屏幕高度*.1| textarea的高度|
| placeholder| | String| `'请输入' + this.title`| textarea的placeholder文字|
| disabled| | Boolean| false| 是否禁用|
| placeholder_style| | String| | 指定 placeholder 的样式|
| placeholder_class| | String| | 指定 placeholder 的样式类|
| maxlength| | Number| 140| 该项input的最大输入长度,-1则不限|
| focus| | Boolean| false| 获取焦点|
| auto_height| | Boolean| false| 是否自动增高，设置auto-height时，style.height不生效|
| fixed| | Boolean| false| 详见官网textarea|
| cursor_spacing| | Number| 0| 详见官网textarea|
| cursor| | Number| | 指定focus时的光标位置,详见官网textarea|
| show_confirm_bar| | Boolean| true| 是否显示键盘上方带有”完成“按钮那一栏,详见官网textarea|
| selection_start| | Number| -1| 光标起始位置，自动聚集时有效，需与selection-end搭配使用|
| selection_end| | Number| -1| 光标结束位置，自动聚集时有效，需与selection-start搭配使用|
| adjust_position| | Boolean| true| 详见官网textarea|
| width| | String| `60%`| textarea的宽度，自带单位|
| backgroundColor| | Color| `#F8F8F8`| textarea背景颜色|
| color| | Color| `#666666`| textarea的文字颜色|
| filterFc| | Fuction| | `自定义过滤值函数`, 详见一、input类型的filterFc|
| verifyFc| | Fuction| | `自定义校验值函数`, 详见一、input类型的verifyFc|
| verifyErr| | String| | `校验错误提示`, 详见一、input类型的verifyErr|
| verifyType| | String| | `内置正则校验`, 可取值见下方, 优先级大于自定义的verifyFc, 详见一、input类型的verifyType |
| focusBorderStyle| | Color| `#999999`| input或textarea类型focus时的边框颜色, 优先级大于focusStyle |
| blurBorderStyle| | Color| `#f8f8f8`| input或textarea类型blur时的边框颜色, 优先级大于focusStyle |
注：最好看源码对照官网属性，在微信小程序上 textarea类型尽量不要与picker类型同时使用

---
### 3.0.3 上传图片
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'pics'`|
| itemArray| 是| Array\<Object\>| | 循环的图片数组，下方说明|
| title| | String| | 该项图片的标题|
| cssMode（废弃，统一wrap布局）| | String| `wrap`| 项内布局方式|
| clearColor| | Color| `#f5105c`| 清除按钮颜色|

#### 3.0.3.0.1 pics的itemArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| title| | String| | 该项图片的标题|
| nullErr| | String| `this.title + '不能为空'`| 为空时提示|
| ignore| | Boolean| `false`| 可以为空， 不判断是否为空,默认为必填，必填则在title前面有 * 标识|
| defaultValue| | String| | 该项pics的初始化默认图片路径(本地图片路径)|
注：若启用此项，则需完善1012-1021行的上传图片至服务器方法，并且完善1039-1042的拼接返回的图片路径方法

---
### 3.0.4 radio(单选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'radio'`|
| itemArray| 是| Array\<Object\>| | 需循环的radio数组|
| cssMode（废弃，统一wrap布局）| | String| `wrap`| 项内布局方式|
| color| | Color| | radio的颜色|
| scale| | String| `.8`| 大小比例, 取0-1的值|

#### 3.0.4.0.1 radio的itemArray属性说明

| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| name| 是| String| | 该radio的标题|
| value| 是| | | 该项radio的值|
| defaultValue| | Boolean| `false`| 该项radio的初始化默认值,(只能设置一个true，若设置多个为true，则取最先为true的值)|
| disabled| | Boolean| `false`| 是否禁用|
| color| | Color| | radio的颜色|

注：itemArray的color优先于外部的color

---
### 3.0.5 checkbox(多选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'checkbox'`|
| itemArray| 是| Array\<Object\>| | 需循环的checkbox数组|
| cssMode（废弃，统一wrap布局）| | String| `wrap`| 项内布局方式|
| color| | Color| | checkbox的颜色|
| scale| | String| `.8`| 大小比例, 取0-1的值|

#### 3.0.5.0.1checkbox的itemArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|-----|----|----|-------|
| name| 是| String| | 该checkbox的标题|
| value| 是| | | 该项checkbox的值|
| defaultValue| | Boolean| `false`| 该项checkbox的初始化默认值|
| disabled| | Boolean| `false`| 是否禁用|
| color| | Color| | checkbox的颜色|

注：checkbox返回数据为:{value,status}  3.7更新

---
### 3.0.6 switch
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'switch'`|
| disabled| | Boolean| `false`| 是否禁用|
| mode| | String| `switch`| switch的type|
| color| | Color| | switch的颜色|
| scale| | String| `.8`| 大小比例, 取0-1的值|

---
### 3.0.7 slider
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'slider'`|
| min| | Number| `0`| slider的最小值|
| max| | Number| `100`| slider的最大值|
| step| | Number| `1`| 步长，取值必须大于 0，并且可被(max - min)整除|
| disabled| | Boolean| false| 是否禁用|
| color| | Color| `#e9e9e9`| 背景条的颜色（请使用 backgroundColor）|
| selected_color| | Color| `#1aad19`| 已选择的颜色（请使用 activeColor）|
| activeColor| | Color| `#1aad19`| 已选择的颜色|
| backgroundColor| | Color| `#e9e9e9`| 背景条的颜色|
| block_size| | Number| `28`| 滑块的大小，取值范围为 12 - 28|
| block_color| | Color| `#ffffff`| 滑块的颜色|
| show_value| | Boolean| `false`| 是否显示当前 value|

---


### 3.0.8 picker-date 日期控件
#### picker类型注意
若要设置picker的样式，比如我要设置picker高为5，picker内的行内样式高为1，这样可以显示5行，但是，不要把样式设置的太死，行内高设为.9或.8 即可，设置的太死会导致picker在选择最后一项时出现bug

| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'picker-date'`|
| indicatorStyle| | String| `'height: '+ 屏幕高度*.048 +'px;'`| picker的行内样式|
| height| | String| 屏幕高度*.2 px| picker的高度|
| mode| | String| `picker-date`| picker-date的类型|
| startYear| | Number| new Date().getFullYear() - 5（前五年）| 开始年份, 可直接输入四位数字|
| endYear| | Number| new Date().getFullYear() + 5 (后五年)|  结束年份, 可直接输入四位数字|
| defaultValue| |String| 现在| 默认日期,注意：格式尽量传`YYYY/MM/dd`的格式，不然iOS中有可能new不了Date对象! 例: '2019/03/30 10:00:00'、'2019/03/30',不支持直接初始化time|
| chooseName| | String| 选择日期| 选择日期按钮命名|
| editorName| | String| 更改| 更改日期按钮命名|
| confirmName| | String| 确定| 弹出时,确定选择日期按钮命名|
| onceShowDefaultValue| | Boolean| `false`| 初始化时是否显示初始值|
#### 3.0.8.0.1 mode属性说明
| 值|  值类型|说明|
|------|----|----|----|-------|
| picker-dateTime| String| 日期加时间|
| picker-date| String| 日期|
| picker-time| String| 时间|

注：所传的defaultDate若不在范围中，则将显示范围内的最后一年最后一月最后一日, defaultValue中所传的月份需-1;

---
### 3.0.9 picker-city 城市选择
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'picker-city'`|
| indicatorStyle| | String| `'height: '+ 屏幕高度*.048 +'px;'`| picker的行内样式|
| height| | String| 屏幕高度*.2 px| picker的高度|
| defaultValue| |Array| `[0, 0, 0]`|默认城市(需注意对应的项是否存在)|
| chooseName| | String| 选择城市| 选择城市按钮命名|
| editorName| | String| 更改| 更改城市按钮命名|
| confirmName| | String| 确定| 弹出时,确定选择城市按钮命名|
| onceShowDefaultValue| | Boolean| `false`| 初始化时是否显示初始值|

注：picker-city取值时返回对象，可根据需求修改

---
### 3.1.0 picker-custom 自定义 （建议使用3.1.1 picker-custom2，返回的数据更简单）
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'picker-custom'`|
| itemArray|是 |Array| |自定义的picker数组，详见示例说明|
|linkage| | Boolean| `false`| 是否联动|
|steps|linkage为true时是| Object| | 自定义阶级变量名，详见下方示例与说明|
|linkageNum| | Number| | 联动级数|
| defaultValue| |Array| `[0,0,……]`|默认值(需注意对应的项是否存在)|
| indicatorStyle| | String| `'height: '+ 屏幕高度*.048 +'px;'`| picker的行内样式|
| height| | String| `屏幕高度*.2 px`| picker的高度|
| chooseName| | String| 选择| 选择按钮命名|
| editorName| | String| 更改| 更改按钮命名|
| confirmName| | String| 确定| 弹出时,确定选择按钮命名|
| onceShowDefaultValue| | Boolean| false| 初始化时是否显示初始值|

#### 3.1.0.0.1 picker-custom的steps属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| steps_1_value| | String| | 一级显示属性名|
| steps_2_value| |String| |二级显示属性名|
|steps_2_item| | String| | 二级联动数组属性名|
|steps_3_value| | String| | 三级显示属性名|
|steps_3_item| | String| | 三级联动数组属性名|
注：详见下方示例

##### 3.1.0.0.2无联动示例1：

```javascript
{ // 无联动示例1
	type: 'picker-custom',
	title: 'custom-无联动1',
	itemArray: [
		[0, 1, 2],
		[3, 4, 5]
	],
	defaultValue: [0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
}

//返回数据格式: {"result":[0,3],"value":[0,0]}
```


##### 3.1.0.0.3 无联动示例2：

```javascript
{ // 无联动示例2
	type: 'picker-custom',
	title: 'custom-无联动2',
	itemArray: [
		[{
			name: 'a', //name变量名需与下方steps.steps_1_value相同
			value: 'a' //可添加多项自定义想要的数据
		}, {
			name: 'b',
			value: 'b'
		}, {
			name: 'c',
			value: 'c'
		}],
		[{
			name: 'd',
			value: 'd'
		}, {
			name: 'e',
			value: 'e'
		}, {
			name: 'f',
			value: 'f'
		}]
	], //name变量名与下方steps.steps_1_value相同
	defaultValue: [0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	steps: {
		steps_1_value: 'name'
	}
}

//返回数据格式: {"result":[{"name":"a","value":"a"},{"name":"d","value":"d"}],"value":[0,0]}
```
##### 3.1.0.0.4 二级联动示例1：

```javascript
{ // 二级联动示例1
	type: 'picker-custom',
	title: 'custom-二级联动示例1',
	defaultValue: [1, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	itemArray: [{
		value_1: '蔬菜', //value_1变量名需与下方steps.steps_1_value相同
		/*
		可添加多项自定义想要的数据
		*/
		item_2: ['青菜'] //item_2变量名需与下方steps.steps_1_value相同
	}, {
		value_1: '荤菜',
		item_2: ['猪肉']
	}],
	steps: {
		steps_1_value: 'value_1',
		steps_2_item: 'item_2'
	},
	linkageNum: 2, //2 表示为2级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"result":{"steps1":{"value_1":"荤菜","item_2":["猪肉"]},"steps2":"猪肉"},"value":[1,0]}
```

##### 3.1.0.0.5 二级联动示例2：

```javascript
{ // 二级联动示例2
	type: 'picker-custom',
	title: 'custom-二级联动示例2',
	defaultValue: [0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	itemArray: [{
		value_1: '蔬菜', //value_1变量名需与下方steps.steps_1_value相同
		/*
		可添加多项自定义想要的数据
		*/
		item_2: [{
			name: '青菜',
			value: '青菜' //可添加多项自定义想要的数据
		}] //item_2变量名需与下方steps.steps_1_value相同
	}, {
		value_1: '荤菜',
		item_2: [{
			name: '猪肉',
			value: '猪肉'
		}] //name变量名需与下方steps.steps_2_value相同
	}],
	steps: {
		steps_1_value: 'value_1',
		steps_2_value: 'name',
		steps_2_item: 'item_2'
	},
	linkageNum: 2, //2 表示为2级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"result":{"steps1":{"value_1":"蔬菜","item_2":[{"name":"青菜","value":"青菜"}]},"steps2":{"name":"青菜","value":"青菜"}},"value":[0,0]}
```

##### 3.1.0.0.6 三级联动示例1：

```javascript
{ // 三级联动示例1
	type: 'picker-custom',
	title: 'custom',
	itemArray: [{
		value_1: '浙江', //value_1变量名需与下方steps.steps_1_value相同
		/*
		可添加多项自定义想要的数据
		*/
		item_2: [{		 //item_2变量名需与下方steps.steps_2_item相同
			value_2: '金华', //value_2变量名需与下方steps.steps_2_value相同
			/*
			可添加多项自定义想要的数据
			*/
			item_3: ['婺城区'] //item_3变量名需与下方steps.steps_3_item相同
		}, {
			value_2: '绍兴',
			item_3: ['越城区']
		}]
	}, {
		value_1: '江苏',
		item_2: [{
			value_2: '南京',
			item_3: ['玄武区'],
		}, {
			value_2: '无锡',
			item_3: ['锡山区']
		}]
	}],
	steps: {
		steps_1_value: 'value_1',
		steps_2_value: 'value_2',
		steps_2_item: 'item_2',
		steps_3_item: 'item_3'
	},
	defaultValue: [1, 0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	linkageNum: 3, //3 表示为3级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"result":{"steps1":{"value_1":"江苏","item_2":[{"value_2":"南京","item_3":["玄武区"]},{"value_2":"无锡","item_3":["锡山区"]}]},"steps2":{"value_2":"南京","item_3":["玄武区"]},"steps3":"玄武区"},"value":[1,0,0]}
```

##### 3.1.0.0.7 三级联动示例2：

```javascript
{ // 三级联动示例2
	type: 'picker-custom',
	title: 'custom-三级联动示例2',
	itemArray: [{
		value_1: '江西', //value_1变量名需与下方steps.steps_1_value相同
		/*
		可添加多项自定义想要的数据
		*/
		item_2: [{		 //item_2变量名需与下方steps.steps_2_item相同
			value_2: '南昌', //value_2变量名需与下方steps.steps_2_value相同
			/*
			可添加多项自定义想要的数据
			*/
			item_3: [{ 	//item_3变量名需与下方steps.steps_3_item相同
				name: '东湖' ,//name变量名需与下方steps.steps_3_value相同
				/*
				可添加多项自定义想要的数据
				*/
			}]
		}, {
			value_2: '九江',
			item_3: [{
				name: '德安'
			}]
		}]
	}, {
		value_1: '山东',
		item_2: [{
			value_2: '济南',
			item_3: [{
				name: '历下'
			}],
		}, {
			value_2: '青岛',
			item_3: [{
				name: '市南'
			}]
		}]
	}],
	steps: {
		steps_1_value: 'value_1',
		steps_2_value: 'value_2',
		steps_2_item: 'item_2',
		steps_3_value: 'name',
		steps_3_item: 'item_3'
	},
	defaultValue: [1, 0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	linkageNum: 3, //3 表示为3级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"result":{"steps1":{"value_1":"山东","item_2":[{"value_2":"济南","item_3":[{"name":"历下"}]},{"value_2":"青岛","item_3":[{"name":"市南"}]}]},"steps2":{"value_2":"济南","item_3":[{"name":"历下"}]},"steps3":{"name":"历下"}},"value":[1,0,0]}
```


注：picker-cutsom取值时无联动类型返回数组，联动类型返回对象

---
### 3.1.1 picker-custom2 自定义（同类型优化版,解决custom数据类型问题）
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'picker-custom2'`|
| itemArray|是(若是无联动类型) |Array| |自定义的picker数组，详见示例说明（无联动请传此参数）|
| itemObject|是(若是联动类型) |Object| |自定义的picker对象，详见示例说明（联动类型请传此参数）|
|linkage| | Boolean| `false`| 是否联动|
|steps|linkage为true时是| Object| | 自定义阶级变量名，详见下方示例与说明|
|linkageNum| | Number| | 联动级数|
| defaultValue| |Array| `[0,0,……]`|默认值(需注意对应的项是否存在)|
| indicatorStyle| | String| `'height: '+ 屏幕高度*.048 +'px;'`| picker的行内样式|
| height| | String| `屏幕高度*.2 px`| picker的高度|
| chooseName| | String| 选择| 选择按钮命名|
| editorName| | String| 更改| 更改按钮命名|
| confirmName| | String| 确定| 弹出时,确定选择按钮命名|
| onceShowDefaultValue| | Boolean| `false`| 初始化时是否显示初始值|

#### 3.1.1.0.1 picker-custom2的steps属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| step_1_value| | String| | 一级显示属性名|
| step_2_value| |String| |二级显示属性名|
|step_3_value| | String| | 三级显示属性名|
注：详见下方示例

##### 3.1.1.0.2 无联动示例1：

```javascript
{
	type: 'picker-custom2',
	title: 'custom2-无联动示例1',
	itemArray: [
		[0, 1, 2],
		[3, 4, 5]
	],
	defaultValue: [0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
}

//返回数据格式: {"result":[0,3],"value":[0,0]}
```


##### 3.1.1.0.3 无联动示例2：

```javascript
{
	type: 'picker-custom2',
	title: 'custom2-无联动示例2',
	itemArray: [
		[{
			name: 'a', //name变量名需与下方steps.steps_1_value相同
			value: 'a' //可添加多项自定义想要的数据
		}, {
			name: 'b',
			value: 'b'
		}, {
			name: 'c',
			value: 'c'
		}],
		[{
			name: 'd',
			value: 'd'
		}, {
			name: 'e',
			value: 'e'
		}, {
			name: 'f',
			value: 'f'
		}]
	],
	steps: {
		step_1_value: 'name', //第一级显示的属性名
	},
	defaultValue: [0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
}

//返回数据格式: {"result":[{"name":"a","value":"a"},{"name":"d","value":"d"}],"value":[0,0]}
```
##### 3.1.1.0.4 二级联动示例1：

```javascript
{
	type: 'picker-custom2',
	title: 'custom2-二级联动示例',
	itemObject: {
		step_1: [{
			"name": "蔬菜"
		}, {
			"name": "荤菜"
		}],
		step_2: [
			['青菜', '白菜'], //对应step_1的江西
			['猪肉', '牛肉'] //对应step_1的山东
		]
	},
	steps: {
		step_1_value: 'name', //第一级显示的属性名
		step_2_value: '', //第二级显示的属性名
		step_3_value: '' //第三级显示的属性名
	},
	defaultValue: [1, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	linkageNum: 2, //3 表示为3级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"data":{"result":{"steps1":{"name":"荤菜"},"steps2":"牛肉"},"value":[1,1]},"index":19,"type":"custom2"}
```

##### 3.1.1.0.5 三级联动示例1：

```javascript
{
	type: 'picker-custom2',
	title: 'custom2-三级联动示例',
	itemObject: {
		step_1: [{
			"name": "江西"
		}, {
			"name": "山东"
		}],
		step_2: [
			['南昌', '九江'], //对应step_1的江西
			['济南', '青岛'] //对应step_1的山东
		],
		step_3: [
			[
				[ //对应step_2的南昌
					'东湖'
				],
				[ //对应step_2的九江
					'德安'
				]
			],
			[
				[ //对应step_2的济南
					'历下',
				],
				[ //对应step_2的青岛
					'市南',
				]
			]
		]
	},
	steps: {
		step_1_value: 'name', //第一级显示的属性名
		step_2_value: '', //第二级显示的属性名
		step_3_value: '' //第三级显示的属性名
	},
	defaultValue: [1, 0, 0], //初始数据
	onceShowDefaultValue: true, //是否显示初始数据
	linkageNum: 3, //3 表示为3级联动
	linkage: true //true 表示开启联动
}

//返回数据格式: {"data":{"result":{"steps1":{"name":"山东"},"steps2":"青岛","steps3":"市南"},"value":[1,1,0]},"index":20,"type":"custom2"}
```

注：picker-cutsom取值时无联动类型返回数组，联动类型返回对象

### 3.1.2 picker-provincialStreet 省市区乡镇街道选择

乡镇街道数据文件完整的需1.5MB左右，目前使用的是600KB，只有街道name无code，若需完整街道数据文件，可以找我拿，甚至自定义生成省市区街道数据格式的方法也可以找我拿，若需求多，可上传为另一个插件

| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'picker-provincialStreet'`|
| indicatorStyle| | String| `'height: '+ 屏幕高度*.048 +'px;'`| picker的行内样式|
| height| | String| `屏幕高度*.2 px`| picker的高度|
| defaultValue| |Array| `[0, 0, 0, 0]`|默认城市(需注意对应的项是否存在)|
| chooseName| | String| 选择| 选择按钮命名|
| editorName| | String| 更改| 更改按钮命名|
| confirmName| | String| 确定| 弹出时,确定选择按钮命名|
| onceShowDefaultValue| | Boolean| `false`| 初始化时是否显示初始值|

注：picker-provincialStreet取值时返回对象，可根据需求修改， 若无此类型需求并且嫌此组件体积过大可将乡镇街道数据文件(QuShe-inputs/mpvue-citypicker/city-data/streets.js)删除，并注释相关import代码(QuShe-inputs/mpvue-citypicker/picker-provincialStreet.vue)！

---


### 3.1.3 text 用于展示信息

| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|----|----|----|-------|
| type| 是| String| | 传固定值 `type: 'text'`|
| title| | String| | 展示的标题,在titleHide为true时会自动在右边显示|
| content| | String|  | 展示的内容|
| contentStyle| | cssStyle| | 展示内容的内联样式|
| ellipsis| | Boolean| `false`| 一行将要超出时是否隐藏多余的并加上省略号|

注：text类型在取值时不会判断该项，但是会占一个位子

---

