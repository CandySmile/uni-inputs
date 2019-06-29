<template>
	<view>
		<inputs 
		:inputsArray="inputsArray" 
		activeName="获取输入"  
		@activeFc="activeFc"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputsArray: [
					{
						title: 'infinitePics',
						type: 'infinitePics',
						ignore: true
					},
					{
						title: 'infinitePics2',
						type: 'infinitePics',
						variableName: 'infinitePics2',
						ignore: true
					},
					{
						title: 'infinitePics3-限制3张',
						type: 'infinitePics',
						max: 3,
						ignore: true
					}
				]
			}
		},
		methods: {
			activeFc(res) {
				console.log(JSON.stringify(res));
				uni.showToast({
					title: '获取输入成功'
				})
			}
		}
	}
</script>

<style>

</style>
