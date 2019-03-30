<template>
	<view class="width100 refadIn" @touchmove.prevent.stop="voidFc">
		<picker-view class="fontColor666666 width100 bg_white border_radius_10px over_hidden box_shadow padding05px box-sizing-border-box"
		 :indicator-style="indicatorStyle||'height: '+windowHeight*.05+'px;width: 100%;'" :value="dateVlue" @change="bindPickerViewChange($event)"
		 :style="{'height': height||windowHeight*.2 + 'px', 'font-size': fontSize+'px'}">
			<block v-if="mode!==picker_date_obj.time">
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<!-- #ifndef H5 -->
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 12" :key="picker_index">{{picker_item+1}}月</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 12" :key="picker_index">{{picker_item}}月</view>
					<!-- #endif -->
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
				</picker-view-column>
			</block>
			<block v-if="mode!==picker_date_obj.date">
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 24" :key="picker_index">{{picker_item}}时</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item}}分</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item}}秒</view>
				</picker-view-column>
			</block>
		</picker-view>
		<button type="primary" :style="{'margin-top': windowHeight*.05 + 'px'}" @tap="confirmFc">{{confirmName||'确定'}}</button>
	</view>
</template>

<script>
	import _app from './app.js';
	export default {
		props: {
			years: {
				type: Array,
				default: null
			},
			indicatorStyle: String,
			height: Number,
			windowHeight: Number,
			defaultDate: String,
			mode: String,
			fontSize: {
				type: Number,
				default: 10
			},
			parentDays: Array,
			confirmName: String,
			index: Number
		},
		data() {
			let _this = this;
			const dateTime = 'picker-dateTime';
			const date = 'picker-date';
			const time = 'picker-time';
			let defaultDate;
			if(_this.defaultDate) defaultDate = new Date(_this.defaultDate); else defaultDate = new Date();
			let thisYear = _this.years;
			let endYear = thisYear[thisYear.length - 1];
			let defaultYear = defaultDate.getFullYear(),
				defaultMonth = defaultDate.getMonth(),
				defaultDay = defaultDate.getDate(),
				defaultHour = defaultDate.getHours(),
				defaultMinute = defaultDate.getMinutes(),
				defaultSecond = defaultDate.getSeconds();
			let compareY = defaultYear > endYear;
			let year = compareY? endYear:defaultYear;
			let month = compareY? 11:defaultMonth;
			let days = _app.countDays(year, month, false, _this.mode).days;
			let day = compareY? days[days.length - 1]:defaultDay;
			let dateVlue = [];
			if (_this.mode != _app.picker_date_obj.time) {
				if(compareY)
					dateVlue.push(thisYear.length-1);
				else
					for (let i = 0; i < thisYear.length; i++) {
						if (year == thisYear[i]) {
							dateVlue.push(i);
						}
					}
				dateVlue.push(compareY?11:month);
				dateVlue.push(compareY?days[days.length - 1]:day - 1);
			}
			if (_this.mode != _app.picker_date_obj.date) {
				dateVlue.push(defaultHour);
				dateVlue.push(defaultMinute);
				dateVlue.push(defaultSecond);
			}
			return {
				days,
				dateVlue,
				picker_date_obj: _app.picker_date_obj
			}
		},
		methods: {
			bindPickerViewChange(e) {
				// console.log(JSON.stringify(e));
				const val = e.detail.value
				let data = _app.countDays(this.years[val[0]], val[1], val);
				this.days = data.days;
				this.dateVlue = data.val;
			},
			changeDays(Y, M, val, d, t) {
				let _this = this;
				const mode = _this.mode;
				const date = _this.date || d;
				const time = _this.time || t;
				const today = new Date();
				const days = [];
				today.setFullYear(Y);
				today.setMonth(M+1);
				today.setDate(0);
				const daysLen = today.getDate();
				for (let i = 1; i <= daysLen; i++) {
					days.push(i);
				}
				// console.log(JSON.stringify(days));
				if(!d)
					_this.days = days;
				if (mode != time)
					if (val){
						val[2] = val[2]<days.length-1?val[2]:days.length-1;
						this.dateVlue = val;
					}
				return !val ? days : '';
			},
			confirmFc() {
				let _this = this;
				const dateValue = _this.dateVlue;
				let Y = _this.years, D = _this.days.length>0?_this.days: _this.parentDays;
				let data =  _this.mode == _app.picker_date_obj.date ?
					`${Y[dateValue[0]]}-${dateValue[1]+1}-${D[dateValue[2]]}` : _this.mode == _app.picker_date_obj.time ?
					`${dateValue[0]}:${dateValue[1]}:${dateValue[2]}` :
					`${Y[dateValue[0]]}-${dateValue[1]+1}-${D[dateValue[2]]} ${dateValue[3]}:${dateValue[4]}:${dateValue[5]}`;
				_this.$emit('getDate',{data, index: _this.index, type: _app.pickerChoosedType.pickerChoosedType_date.name});
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
