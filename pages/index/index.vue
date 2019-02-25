<template>
	<view class="content">
        <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
			<inputs :inputsArray="inputsArray" v-on:activeFc="activeFc" :tFontSize="20"/>
        </view>
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
					variableName: 'date'
				}, {
					type: 'pics',
					title: '测试',
					itemArray: [{title:'测试', ignore: true}],
					variableName: 'pic'
				}, {
					title: 'radio',
					type: 'radio',
					itemArray: [{
						name: 'aa',
						value: 'aa'
					}, {
						name: 'bb',
						value: 'bb'
					}]
				}, {
					title: 'checkbox',
					type: 'checkbox',
					itemArray: [{
						name: 'aa',
						value: 'aa'
					}, {
						name: 'bb',
						value: 'bb'
					}]
				}, {
					title: '测试'
				}]
			}
		},
		onLoad() {

		},
		methods: {
activeFc(res) {
	console.log(JSON.stringify(res))
}
		},
		components:{
			inputs
		}
	}
</script>

<style>
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
