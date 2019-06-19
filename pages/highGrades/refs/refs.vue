<template>
	<view>
		<textView :content="content"/>
		<itemList :itemList="items"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: 'ref调用需要在inputs传入ref属性，以下列出可能用到的ref调用inputs方法',
				items: [
					{
						name: 'ref设置input、textarea的focus值',
						path: '/pages/highGrades/refsitems/setFocus/setFocus'
					},
					{
						name: 'ref设置inputs内部值',
						path: '/pages/highGrades/refsitems/setInputsValue/setInputsValue'
					},
					{
						name: 'ref从外部触发inputs内部activeFc方法',
						path: '/pages/highGrades/refsitems/refActiveFc/refActiveFc'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
