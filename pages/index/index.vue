<template>
	<view class="content">
		<inputs :inputsArray="inputsArray" v-on:activeFc="activeFc" :activeName="activeName" :changeReSet="changeReSet"/>
	</view>
</template>

<script>
	import inputs from '../../components/QuShe-inputs/inputs.vue';
	export default {
		data() {
			return {
				inputsArray: [{
					type: 'picker-date',
					mode: 'picker-dateTime',
					title: '日期',
					variableName: 'date'
				}, {
					type: 'picker-city',
					title: '城市',
					defaultValue: [15, 2, 3]
				},{
					type: 'pics',
					title: '图片',
					itemArray: [{
						title: '测试1',
						ignore: true
					},{
						title: '测试2',
						ignore: true
					},{
						title: '测试3',
						ignore: true
					}],
					variableName: 'pic'
				}, {
					title: 'radio',
					type: 'radio',
					itemArray: [{
						name: 'aa',
						value: 'aa',
						defaultValue: true
					}, {
						name: 'bb',
						value: 'bb'
					}]
				}, {
					title: 'checkbox',
					type: 'checkbox',
					itemArray: [{
						name: 'aa',
						value: 'aa',
						defaultValue: true
					}, {
						name: 'bb',
						value: 'bb',
						defaultValue: true
					}]
				}, {
					title: '测试',
					ignore: true
				}, {
					title: '手机号',
					defaultValue: '13856954623',
					phone: true
				}],
				ruleArray: [{
					name: '某规则',
					value: 'aa'
				}],
				activeName: '发送',
				changeReSet: false
			}
		},
		onLoad() {

		},
		methods: {
			activeFc(res) {
				console.log(JSON.stringify(res));
				/* let _this = this;
				_this.inputsArray = [];
				_this.activeName = '加载中';
				setTimeout(function() {  // 若有重置表单组件需setTimeout后赋值
					_this.inputsArray = [{
						type: 'radio',
						itemArray: [{
							name: 'cc',
							value: 'cc'
						}, {
							name: 'dd',
							value: 'dd'
						}]
					}]
					_this.activeName = '发送';
				}, 500) */
			},
		},
		components: {
			inputs
		}
	}
</script>

<style>
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
