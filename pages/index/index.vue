<template>
	<view>
		<inputs :inputsArray="inputsArray" @activeFc="activeFc" animationType="slide-fade-right" :animationDuration=".4"/>
	</view>
</template>

<script>
	import inputs from '@/components/QuShe-inputs/inputs.vue';
	export default {
		data() {
			return {
				inputsArray: [{
					type: 'picker-date',
					mode: 'picker-date',
					title: '日期',
					defaultValue: new Date(),
					onceShowDefaultValue: true
				}, {
					type: 'picker-city',
					title: '城市',
					defaultValue: [15,2,3],
					onceShowDefaultValue: true
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
					type: 'slider',
					title: 'slider',
					min:0,
					max:100,
					show_value:true,
					disabled:false,
					step: 1
				},{
					type: 'switch',
					title: 'switch',
					defaultValue: true
				},{
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
						name: 'a',
						value: 'a',
						defaultValue: true
					}, {
						name: 'b',
						value: 'b',
						defaultValue: true,
						disabled: true
					}, {
						name: 'c',
						value: 'c',
						defaultValue: true
					}]
				}, {
					title: '测试',
					ignore: true
				}],
				ruleArray: [{
					name: '某规则',
					value: 'aa'
				}],
				activeName: '完成',
				changeReSet: false
			}
		},
		methods:{
			getdate(e) {
				console.log(JSON.stringify(e));
			},
			showDate() {
				this.dateShow = true;
			},
			voidFc() {},
			activeFc(res) {
				console.log(JSON.stringify(res));
			}
		},
		components:{inputs}
	}
</script>

<style>
</style>
