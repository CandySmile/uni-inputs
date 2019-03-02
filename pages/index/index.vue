<template>
	<view class="content">
		<inputs :inputsArray="inputsArray" v-on:activeFc="activeFc" ifCode ifRule :ruleArray="ruleArray" />
	</view>
</template>

<script>
	import inputs from '../../components/QuShe-inputs/inputs.vue';
	export default {
		data() {
			return {
				title: 'Hello',
				inputsArray: [{
					type: 'picker-date',
					title: '日期',
					mode: 'picker-dateTime',
					variableName: 'date'
				}, {
					type: 'pics',
					title: '图片',
					itemArray: [{
						title: '测试',
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
					defaultValue: '今天也要加油呀'
				}, {
					title: '手机号',
					defaultValue: '13856954623',
					phone: true
				}],
				ruleArray: [{
					name: '某规则',
					value: 'aa'
				}],
				text: '测试',
				msg: 'wowanni'
			}
		},
		onLoad() {

		},
		methods: {
			activeFc(res) {
				console.log(JSON.stringify(res))
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
