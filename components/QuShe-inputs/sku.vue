<template>
	<view class="flex_column width100" :style="{'font-size': wH*.018+'px'}">
		<view class="flex_row width100" v-for="(items,indexs) in skuData.itemArray" :key="indexs">
			<view class="flex_row_c_c width15">
				{{items.name}}
			</view>
			<view class="width85 flex_row" :style="{'margin': wW*.01+'px 0'}">
				<view class="flex_row border_radius_4px margin1vh" :class="viewData[indexs][index]?selectValue[indexs]===index?'bg_ok':'bg_hv':'bg_no'" :style="{'padding': wH*.01+'px ' + wW*.03 + 'px', 'margin': '0 ' + wW*.02+'px'}"
				 v-for="(item,index) in items.item" :key="index" @tap="viewData[indexs][index]||selectValue[indexs]===index?change(indexs, index):''">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _app from './app.js';
	const DATA = {}; //数据源
	const DV = []; //key数据源
	const VOD = []; //视图数据源
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
					keyType: 'string',
					keySg: '|',
					itemArray: [{
						name: '颜色',
						item: ['红', '白', '蓝']
					}, {
						name: '尺码',
						item: ['大', '中', '小']
					}, {
						name: '型号',
						item: ['A', 'B', 'C']
					}]
				},
				originData: [{
						key: '红|大|A',
						inventory: 12,
						price: 22.5,
						img: 'img1'
					},
					{
						key: '白|中|B',
						inventory: 5,
						price: 12,
						img: 'img2'
					},
					{
						key: '红|中|C',
						inventory: 22,
						price: 8.6,
						img: 'img3'
					},
					// {key:'蓝|小|C', inventory: 22, price: 8.6, img: 'img3'},
					// 					{key:'红|中|B', inventory: 0, price: 35, img: 'img4'}
				],
				selectValue: [],
				vName: 'sku-',
				selectObj: {},
				viewData: [],
				selectedView: []
			};
		},
		created() {
			let _this = this;
			let oD = _this.originData;
			let sD = _this.skuData.itemArray;
			let vD = [];
			let defaultValue = [];
			for (let i = 0; i < sD.length; i++) {
				if (!vD[i]) vD[i] = [];
				if (!VOD[i]) VOD[i] = [];
				for (let j = 0; j < sD[i].item.length; j++) {
					vD[i].push(false);
					VOD[i].push(false);
				}
				defaultValue.push(false);
			}
			for (let i = 0; i < oD.length; i++) {
				let d = oD[i];
				let k = d.key.split("|");
				let name = [];
				for (let j = 0; j < k.length; j++) {
					let n = sD[j].item.indexOf(k[j]);
					if (n < 0) {
						_app.showToast('在数据中未发现' + k[j]);
						return;
					}
					vD[j][n] = true;
					VOD[j][n] = true;
					name.push(n);
				}
				DV.push(name);
				DATA[_this.vName + name.join('-')] = d;
			}
			// for(let i = 0; i < vD.length; i++) {
			// 				for(let j = 0; j < vD[i].length; j++) {
			// 					if(vD[i][j])
			// 						defaultValue.push(j);
			// 					break;
			// 				}
			// }
			this.viewData = vD;
			// this.selectValue = defaultValue;
			this.$set(this, 'selectValue', defaultValue)
			console.log(JSON.stringify(DATA));
			console.log(JSON.stringify(vD));
			console.log(JSON.stringify(defaultValue));
		},
		methods: {
			change(is, i) {
				if (this.selectValue[is] === i)
					this.$set(this.selectValue, is, false);
				else
					this.$set(this.selectValue, is, i);
					// this.selectValue[is] = i;
				console.log(JSON.stringify(this.selectValue));
				let d = this.selectValue;
// 				let a = [];
// 				for(let i = 0; i < d.length; i++) {
// 					if(d[i]!==false)
// 						a.push(d[i]);
// 				}
// 				console.log(JSON.stringify(a));
				let obj = {};
				for(let j = 0; j < d.length; j++) {
					if(d[j]!==false)
						obj['objdata_' + j] = d[j];
				}
				let s = [];
				let data = [];
				for(let j in obj) {
					data = [];
					let a = j.split('_')[1];
					if(s.length>0) {
						for(let i = 0; i < s.length; i++) {
							if(s[i][a]===obj[j])
								data.push(DV[i]);
						}
						s = data;
					}else{
						for(let i = 0; i < DV.length; i++) {
							if(DV[i][a]===obj[j])
								data.push(DV[i]);
						}
						s = data;
					}
				}
				console.log(JSON.stringify(s));
				if(s.length>0) {
					let r = this.skuData.itemArray;
					let viewdata = [];
					for(let i = 0; i < r.length; i++) {
						for(let j = 0; j < s.length; j++) {
							if(!viewdata[i]) viewdata[i] = [];
							viewdata[i].push(s[j][i]);
						}
						console.log('viewdata:'+JSON.stringify(viewdata));
						
					}
					for(let i = 0; i < viewdata.length; i++) {
						for(let j = 0; j < r[i].item.length; j++) {
							if(viewdata[i].indexOf(j)>0) {
								this.$set(this.viewData[i], j, true);
							}else{
								this.$set(this.viewData[i], j, false);
							}
						}
					}
// 					for(let i = 0; i < r.length; i++) {
// 						console.log('最外层:' + i)
// 						for(let k = 0; k < r[i].item.length; k++) {
// 							console.log('二层:' + k)
// 							let c = false;
// 							for(let j = 0; j < viewdata.length; j++) {
// 							console.log('3层:' + j)
// 						// console.log('viewdata[k]:'+JSON.stringify(viewdata[k]) + '-------j:' + j);
// 						console.log('viewdata[k]:'+JSON.stringify(viewdata[k]));
// 						console.log('viewdata[k].indexOf(j)-----:' + viewdata[k].indexOf(j));
// 						console.log('viewdata[k].indexOf(j)<0?-----:'+viewdata[k].indexOf(j)<0);
// 								if(viewdata[k].indexOf(j)>0) {
// 									console.log('viewData[' + i + '][' + j + ']为---false')
// 									this.$set(this.viewData[i], k, false);
// 									c = true;
// 									break;
// 								}
// // 								else {
// // 									console.log('viewData[' + i + '][' + j + ']为---true')
// 									// this.$set(this.viewData[i], k, true);
// 								// }
// 							}
// 							
// 							this.$set(this.viewData[i], k, c);
// 						}
// 					}
				}else{
					for(let i = 0; i < VOD.length; i++) {
						for(let j = 0; j < VOD[i].length; j++) {
							this.$set(this.viewData[i], j, VOD[i][j]);
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
	.width100 {
		width: 100%;
	}

	.width15 {
		width: 15%;
	}

	.width85 {
		width: 85%;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.bg_no {
		background-color: #f2f2f2;
		color: #adadad;
		border: 1px solid #F2F2F2;
	}

	.bg_hv {
		background-color: #ffffff;
		box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .1);
		border: 1px solid #FFFFFF;
	}

	.bg_ok {
		background-color: #ffffff;
		box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .1);
		border: 1px solid #F1505C;
	}

	.border_radius_4px {
		border-radius: 4px;
	}
	.margin1vh{
		margin: 1vh;
	}
</style>
