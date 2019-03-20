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
					segmentationTitle: '日期与时间',
					type: 'picker-date',
					mode: 'picker-date',
					title: 'date',
					defaultValue: new Date(),
					onceShowDefaultValue: true,
					border_top: '1px solid #f2f2f2'
				}, {
					type: 'picker-city',
					title: 'city',
					defaultValue: [10,6,0],
					onceShowDefaultValue: true
				},{
					segmentationTitle: '上传图片',
					type: 'pics',
					title: 'pics',
					itemArray: [{
						title: '测试1',
						ignore: true
					},{
						title: '测试2',
						ignore: true
					}],
					variableName: 'pic',
					border_top: '1px solid #f2f2f2'
				}, {
					segmentationTitle: '表单组件',
					type: 'slider',
					title: 'slider',
					defaultValue: 50,
					min:0,
					max:100,
					show_value:true,
					disabled:false,
					step: 1,
					border_top: '1px solid #f2f2f2'
				},{
					type:'textarea',
					title:'textarea',
					defaultValue: '今天也要加油鸭~'
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
					title: 'input',
					ignore: true,
					defaultValue: '今天也要加油鸭~'
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
