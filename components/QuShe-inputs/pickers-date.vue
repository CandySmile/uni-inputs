<template>
	<view class="width100 refadIn" @touchmove.prevent.stop="voidFc">
		<picker-view class="fontColor666666 width100 bg_white border_radius_10px over_hidden box_shadow padding05px box-sizing-border-box"
		 :indicator-style="indicatorStyle||'height: '+windowHeight*.05+'px;'" :value="dateVlue" @change="bindPickerViewChange($event)"
		 :style="{'height': height||windowHeight*.2 + 'px', 'font-size': fontSize+'px'}">
			<block v-if="mode!=time">
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 12" :key="picker_index">{{picker_item+1}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
				</picker-view-column>
			</block>
			<block v-if="mode!=date">
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
		<button type="primary" :style="{'margin-top': windowHeight*.05 + 'px'}" @tap="confirmFc">确定</button>
	</view>
</template>

<script>
	export default {
		props: {
			years: {
				type: Array,
				default: null
			},
			indicatorStyle: String,
			height: String,
			windowHeight: Number,
			defaultDate: {
				type: Date,
				default: new Date()
			},
			mode: {
				type: String,
				default: 'picker-date'
			},
			fontSize: {
				type: Number,
				default: 10
			},
			index: {
				type: Number
			}
		},
		data() {
			let _this = this;
			const dateTime = 'picker-dateTime';
			const date = 'picker-date';
			const time = 'picker-time';
			let thisYear = _this.years;
			let endYear = thisYear[thisYear.length - 1];
			let defaultYear = _this.defaultDate.getFullYear();
			let defaultMonth = _this.defaultDate.getMonth();
			let defaultDay = _this.defaultDate.getDate();
			let defaultHour = _this.defaultDate.getHours();
			let defaultMinute = _this.defaultDate.getMinutes();
			let defaultSecond = _this.defaultDate.getSeconds();
			let year = endYear > defaultYear ? defaultYear : endYear;
			let month = endYear > defaultYear ? defaultMonth : 11;
			let days = _this.changeDays(year, month, false, date, time);
			let day = endYear > defaultYear ? defaultDay : days[days.length - 1];
			let Hours = [];
			let minutes = [];
			let seconds = [];
			let dateVlue = [];
			if (_this.mode != time) {
				for (let i = 0; i < thisYear.length; i++) {
					if (year == thisYear[i]) {
						dateVlue[0] = i;
					}
				}
				dateVlue[1] = month;
				dateVlue[2] = day - 1;
			}
			if (_this.mode != date) {
				if (_this.mode == time) {
					dateVlue[0] = defaultHour;
					dateVlue[1] = defaultMinute;
					dateVlue[2] = defaultSecond;
				} else {
					dateVlue[3] = defaultHour;
					dateVlue[4] = defaultMinute;
					dateVlue[5] = defaultSecond;
				}
			}
			return {
				days,
				dateVlue,
				dateTime,
				date,
				time
			}
		},
		methods: {
			bindPickerViewChange(e) {
				// console.log(JSON.stringify(e));
				const val = e.detail.value
				this.changeDays(this.years[val[0]], val[1], val);
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
				_this.days = days;
				if (mode != time)
					if (val){
						val[2] = val[2]<days.length-1?val[2]:days.length-1;
						this.dateVlue = val;
					}
				return !val ? days : '';
			},
			confirmFc() {
				console.log(JSON.stringify(this.dateVlue));
				let _this = this;
				const dateValue = _this.dateVlue;
				let data =  _this.mode == _this.date ?
					`${_this.years[dateValue[0]]}-${dateValue[1]+1}-${_this.days[dateValue[2]]}` : _this.mode == _this.time ?
					`${dateValue[0]}:${dateValue[1]}:${dateValue[2]}` :
					`${_this.years[dateValue[0]]}-${dateValue[1]+1}-${_this.days[dateValue[2]]} ${dateValue[3]}:${dateValue[4]}:${dateValue[5]}`;
				_this.$emit('getDate',{data, index: _this.index});
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
