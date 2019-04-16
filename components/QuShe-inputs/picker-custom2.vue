<template>
	<view class="width100 refadIn" @touchmove.prevent.stop="voidFc">
		<picker-view class="fontColor666666 width100 bg_white border_radius_10px over_hidden box_shadow padding05px box-sizing-border-box"
		 :indicator-style="indicatorStyle||'height: '+wH*.048+'px;'" :value="value" @change="bindPickerViewChange($event)"
		 :style="classObj.picker">
		 <block v-if="linkage">
			<block v-if="linkageNum==2">
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(item,index) in itemObject.step_1" :key="index">{{steps.step_1_value?item[steps.step_1_value]:item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(item,index) in itemObject.step_2[value[0]]" :key="index">{{steps.step_2_value?item[steps.step_2_value]:item}}</view>
				</picker-view-column>
			</block>
			<block v-else-if="linkageNum==3">
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(item,index) in itemObject.step_1" :key="index">{{steps.step_1_value?item[steps.step_1_value]:item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(item,index) in itemObject.step_2[value[0]]" :key="index">{{steps.step_2_value?item[steps.step_2_value]:item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(item,index) in itemObject.step_3[value[0]][value[1]]" :key="index">{{steps.step_3_value?item[steps.step_3_value]:item}}</view>
				</picker-view-column>
			</block>
		</block>
		 <block v-else>
			<picker-view-column v-for="(items, indexs) in itemArray" :key="indexs">
				<view class="flex_row_c_c" v-for="(item, index) in items" :key="index">{{steps.step_1_value?item[steps.step_1_value]:item}}</view>
			</picker-view-column>
		</block>
		</picker-view>
		<button type="primary" :style="classObj.marginTop5 + confirmStyle" @tap="confirmFc">{{confirmName||'确定'}}</button>
	</view>
</template>

<script>
	import _app from './app.js';
	export default {
		props: {
			itemArray: {
				type: Array,
				default() {
					return [];
				}
			},
			itemObject: {
				type: Object,
				default() {
					return {};
				}
			},
			linkage: {
				type: Boolean,
				default: false
			},
			linkageNum: {
				type: Number,
				default: 2
			},
			steps: {
				type: Object,
				default() {
					return {
						step_1_value: '', //第一级显示的属性名
						step_2_value: '', //第二级显示的属性名
						step_3_value: '' //第三级显示的属性名
					}
				}
			},
			fontSize: {
				type: Number,
				default: 10
			},
			confirmName: String,
			index: Number,
			indicatorStyle: String,
			height: Number,
			wH: Number,
			pickerValueDefault: Array,
			confirmStyle: String
		},
		data() {
			let value = [];
			if(this.pickerValueDefault)
				value = this.pickerValueDefault;
			else{
				if(this.linkage)
					for(let i = 0; i < this.linkageNum; i++) {
						value.push(0);
					}
				else
					this.itemArray.forEach(item=>{
						value.push(0);
					});
			}
			return {
				value,
				classObj: {
					picker: 'height:' + (this.height||this.wH*.2) + 'px;font-size:' + this.fontSize+'px;',
					marginTop5: 'margin-top:' + this.wH*.05 + 'px;'
				}
			}
		},
		methods: {
			bindPickerViewChange({detail:{value}}) {		//解构 赋值
				this.value = value;
			},
			confirmFc() {
				let _this = this;
				let datas = _this.linkage?_this.itemObject:_this.itemArray;
				let v = _this.value;
				let data = {result:{}, value:v};
				let steps = _this.steps;
				if(_this.linkage) {
					if(_this.linkageNum == 2) {		//二级联动
						data.result.steps1 = datas.step_1[v[0]];
						data.result.steps2 = datas.step_2[v[0]][v[1]];
					}else if(_this.linkageNum == 3) {		//三级联动
						data.result.steps1 = datas.step_1[v[0]];
						if(!data.result.steps1)
							_app.showToast('第一列中不存在第'+v[0]+'项');
						data.result.steps2 = datas.step_2[v[0]][v[1]];
						if(!data.result.steps2)
							_app.showToast('第二列中不存在第'+v[1]+'项');
						data.result.steps3 = datas.step_3[v[0]][v[1]][v[2]];
						if(!data.result.steps3)
							_app.showToast('第三列中不存在第'+v[2]+'项');
					}else{
						_app.showToast('不在指定范围中');
					}
				}else{		//无联动
					data.result=[];
					for(let i = 0; i < datas.length; i++) {
						let d = datas[i];
						data.result.push(d[v[i]]);
					}
				}
				_this.$emit('getCustom', {data, index: _this.index, type: _app.pickerChoosedType.pickerChoosedType_custom2.name});
			},
			voidFc() {}
		},
	}
</script>

<style scoped>
	.width100 {
		width: 100%;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.fontColor666666 {
		color: #666666;
	}

	.bg_white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.over_hidden {
		overflow: hidden;
	}

	.box_shadow {
		box-shadow: 3px 3px 3px rgba(0, 0, 0, .2);
	}

	/* 新增 */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(.8);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes refadeIn {
		from {
			transform: scale(1.2);
		}

		to {
			transform: scale(1);
		}
	}

	.fadIn {
		animation: fadeIn .3s 1;
	}

	.refadIn {
		animation: refadeIn .3s 1;
		animation-fill-mode: forwards;
	}

	.padding05px {
		padding: 0 5px;
	}

	.box-sizing-border-box {
		box-sizing: border-box;
	}
</style>
