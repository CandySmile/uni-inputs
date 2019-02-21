## 作者想说

如果该组件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)*✲ﾟ*  蟹蟹~拜托啦~

## 更新说明

| 序号 | 更新说明 |
|---|------|
| 6 | 新增cssMode属性，可控制非input类型的项内布局方式,可在父组件传入，也可在项内属性中传入 |
| 5 | ruleName属性修改为ruleArray, 可以支持一个以上的规则或协议 |
| 4 | 新增radio(单选)类型，checkbox（多选）类型 |
| 3 | 为提升用户体验，在循环项数较多的情况下，防止超屏，新增overflow_x为scroll(x轴滚动) |
| 2 | 判断类型使用type判断 |
| 1 | 完善213-226行的判断写法不正确问题 |

# inputs组件使用说明
注：有引入官方的uni-Icon组件（删除图片的叉叉），可自行修改
	  `单位使用为vh、vw`， 有样式需求自行修改

## html中使用

```html
<template>
  <view>
	<inputs :inputs="inputsArray" activeName="申请入驻" :ifCode="true" 
			:ifRule="true" :ruleArray="ruleArray" 
			v-on:chaildOpenEvent="openWin" 
			v-on:activeFc="activeFc"  :onLoadData="onLoadData" 
			cssMode="scrollX"/>
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
			type: 'radio',
			title: 'radioName',
			cssMode: 'scrollX',
			radioArray: [{
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
			}]
		},{
			type: 'checkbox',
			title: 'checkboxName',
			checkboxArray: [{
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
			picsArray: [{title: '营业执照(三合一)'}]
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
			picsArray: [{title: '身份证正面'}, {title: '身份证背面'}]
		},{
			type: 'pics',
			title: '门店图片',
			picsArray: [
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
		onLoadData： 'data_'	//获取数据时变量名前缀
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
        // 取值为 this.onloadData + index, onloadData默认值为'data_'
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
## 传给inputs组件的属性
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| inputs| 是| Array| []| 需循环的inputs数组|
| activeName| 是| String| '发送'| 主功能按钮的文字说明|
| ifCode| 否| Boolean| false| 是否启用验证码功能, 若启用则需完善163-168的发送验证码方法|
| ifRule| 否| Boolean| false| 是否需要用户同意某规则或协议|
| ruleArray| ifRule为true时是| Array| []| 需要用户同意某规则或协议的数组|
| v-on:chaildOpenEvent| ifRule为true时是| Function| | 打开某规则或协议的方法|
| v-on:activeFc| 是| Function| | 主功能方法，携带一个用户所输入的数据对象|
| onLoadData| 否| String| 'data_'| activeFc返回的对象中的数据变量名前缀，后面跟index，看下方说明|
| fontSize| 否| Number| '2.1' | title的文字大小|
| fontColor| 否| String| '#666666'| title的文字颜色|
| input_fontSize| 否| Number| '2.1'| input的文字大小|
| cssMode| 否| String| 'wrap'| 非input类型的项内布局方式|

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
注：cssMode属性可在父级中传入，也可在项内属性中传入,优先级: 项内属性>父级属性.


## inputs属性说明

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
### 二、上传图片
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'pics'|
| picsArray| 是| Array| []| 循环的图片数组，下方说明|
| title| 是| String| ''| 该项图片的标题|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
#### picsArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| title| 否| String| ''| 该项图片的标题|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
| ignore| 否| Boolean| false| 可以为空， 不判断是否为空,默认为必填，必填则在title前面有 * 标识|
### 三、radio(单选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'radio'|
| title| 是| String| ''| 该项radio的标题|
| radioArray| 是| Array| []| 需循环的radio数组|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
#### radioArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| name| 是| String| ''| 该radio的标题|
| value| 是| | | 该项radio的值|
### 四、checkbox(多选)
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| type| 是| String| ''| 传固定值 type: 'checkbox'|
| title| 是| String| ''| 该项checkbox的标题|
| checkboxArray| 是| Array| []| 需循环的checkbox数组|
| ignore| 否| Boolean| false| 是否可忽略该项（判断时可以为空）|
| nullErr| 否| String| this.title + '不能为空'| 为空时提示|
#### checkboxArray属性说明
| 属性名| 是否必填| 值类型| 默认值| 说明|
|------|---|----|---|-------|
| name| 是| String| ''| 该checkbox的标题|
| value| 是| | | 该项checkbox的值|

注： checkbox类型与radio类型差不多，只是取值时checkbox为数组，根据需求使用



