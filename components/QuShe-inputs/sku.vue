<template>
	<view class="flex_column width100" :style="{'font-size': wH*.018+'px'}">
		<view class="flex_row width100" v-for="(items,indexs) in skuData.itemArray" :key="indexs">
			<view class="flex_row_c_c width15">
				{{items.name}}
			</view>
			<view class="width85 flex_row" :style="{'margin': wW*.01+'px 0'}">
				<view class="flex_row bg_default border_radius_4px" :style="{'padding': wH*.01+'px ' + wW*.03 + 'px', 'margin': '0 ' + wW*.02+'px'}" v-for="(item,index) in items.item" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			wH: {
				type: Number,
				default: 1200
			},
			wW: {
				type: Number,
				default: 500
			},
		},
		data() {
			return {
				skuData: {
					productName: '衣服',
					itemArray: [
						{
							name: '颜色',
							item: ['红','白', '蓝']
						},{
							name: '大小',
							item: ['M','S', 'L', 'XL', 'XXL']
						},{
							name: '图案',
							item: ['兔','猫', '猪']
						}
					]
				}
			};
		}
	}
</script>

<style scoped>
	.width100{
		width: 100%;
	}
	.width15{
		width: 15%;
	}
	.width85{
		width: 85%;
	}
	.flex_row{
		display: flex;
		flex-direction: row;
	}
	.flex_row_c_c{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.flex_column{
		display: flex;
		flex-direction: column;
	}
	.bg_default{
		background-color: #f8f8f8;
	}
	.border_radius_4px {
		border-radius: 4px;
	}
</style>
