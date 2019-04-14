<template>
	<view>
		<inputs :inputsArray="inputsArray" activeName="登录" :ruleSet="ruleSet" ifRule ifCode @chaildOpenEvent="openWin"
		 @activeFc="activeFc" :onLoadData="onLoadData" animationType="slide-fade-right" :animationDuration=".3"
		 submitReSet :buttonStyle="buttonStyle" :contentSet="contentSet" titleHide/>
	</view>
</template>

<script>
	import inputs from "@/components/QuShe-inputs/inputs.vue";
	export default {
		data() {
			return {
				"buttonStyle": { //按钮样式
					"activeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //主按钮样式
					"changeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型更改按钮样式
					"selectButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型选择按钮样式
					"confirmButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;", //picker类型弹出框中确定按钮样式
					"getcodeButton": "background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;" //获取验证码按钮样式
				},
				"inputsArray": [{
						"title": "手机号",
						"phone": true,
						"tapClear": true,
						"defaultValue": "13305679845"
					}
				],
				"ruleSet": {
					"color": "#c0ebd7",
					"checkbox_color": "#c0ebd7",
					"itemArray": [{
						"name": "用户协议",
						"value": "用户协议"
					},{
						"name": "隐私政策",
						"value": "隐私政策"
					}],
				},
				"contentSet": {
					"width": 80,
					"layout": "center"
				},
				"onLoadData": "data_",
			}
		},
		methods: {
			openWin(value) {
				//打开规则或协议页
				//若有一个以上的rule，则根据value打开规则页面
				console.log(value);
			},
			activeFc(res) {
				uni.showToast({
					title: "获取输入成功"
				})
				console.log(JSON.stringify(res));
			}
		},
		components: {
			inputs
		}
	}
</script>

<style>
</style>
