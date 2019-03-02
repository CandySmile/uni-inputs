<template>
	<view class="width100">
		<picker-view class="fontColor666666 width100" :indicator-style="indicatorStyle||'height: '+windowHeight*.05+'px;'" :value="dateVlue"
		 @change="bindPickerViewChange($event)" :style="{'height': height||windowHeight*.2 + 'px', 'font-size': fontSize+'px'}">
			<picker-view-column v-if="mode!=time">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
			</picker-view-column>
			<picker-view-column v-if="mode!=time">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view>
			</picker-view-column>
			<picker-view-column v-if="mode!=time">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
			</picker-view-column>
			<picker-view-column v-if="mode!=date">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in Hours" :key="picker_index">{{picker_item}}时</view>
			</picker-view-column>
			<picker-view-column v-if="mode!=date">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in minutes" :key="picker_index">{{picker_item}}分</view>
			</picker-view-column>
			<picker-view-column v-if="mode!=date">
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in seconds" :key="picker_index">{{picker_item}}秒</view>
			</picker-view-column>
		</picker-view>
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
			}
		},
		data() {
			let _this = this;
			const dateTime = 'picker-dateTime';
			const date = 'picker-date';
			const time = 'picker-time';
			let months = [];
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			let thisYear = _this.years;
			let endYear = thisYear[thisYear.length - 1];
			let defaultYear = _this.defaultDate.getFullYear();
			let defaultMonth = _this.defaultDate.getMonth() + 1;
			let defaultDay = _this.defaultDate.getDate();
			let defaultHour = _this.defaultDate.getHours();
			let defaultMinute = _this.defaultDate.getMinutes();
			let defaultSecond = _this.defaultDate.getSeconds();
			let year = endYear > defaultYear ? defaultYear : endYear;
			let month = endYear > defaultYear ? defaultMonth : months[11];
			let days = _this.changeDays(year, month, false, endYear > defaultYear, defaultDay, date, time, defaultHour, defaultMinute, defaultSecond);
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
				dateVlue[1] = month - 1;
				dateVlue[2] = day - 1;
			}
			if(_this.mode != date){
				for (let i = 0; i <= 24; i++) {
					Hours.push(i);
				}
				for (let i = 0; i <= 60; i++) {
					minutes.push(i);
					seconds.push(i);
				}
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
				months,
				days,
				Hours,
				minutes,
				seconds,
				dateVlue,
				dateTime,
				date,
				time
			}
		},
		methods: {
			bindPickerViewChange(e) {
				console.log(JSON.stringify(e));
				const val = e.detail.value
				this.changeDays(this.years[val[0]], this.months[val[1]], val);
			},
			changeDays(Y, M, val, compare, defaultDay, d, t, H, m, s) {
				let _this = this;
				let mode = _this.mode;
				let date = _this.date || d;
				let time = _this.time || t;
				let today = new Date();
				let days = [];
				today.setFullYear(Y);
				today.setMonth(M);
				today.setDate(0);
				for (let i = 1; i <= today.getDate(); i++) {
					days.push(i);
				}
				console.log(JSON.stringify(days));
				if(_this.days != days)
					_this.days = days;
				if (val) {
					let commitDay = null;
					if(mode!=time) {
						if (val[2] + 1 < days[days.length - 1]) {
							commitDay = val[2] + 1;
						} else {
							commitDay = days[days.length - 1];
						}
					}
					_this.$emit('getDate', mode == date ? `${Y}-${M}-${commitDay}` : mode == time ? `${val[0]}:${val[1]}:${val[2]}` :
						`${Y}-${M}-${commitDay} ${val[3]}:${val[4]}:${val[5]}`);
				} else {
					_this.$emit('getDate', mode == date ? `${Y}-${M}-${compare?defaultDay:days[days.length-1]}` : mode == time ?
						`${H}:${m}:${s}` : `${Y}-${M}-${compare?defaultDay:days[days.length-1]} ${H}:${m}:${s}`);
				}
				return !val?days:'';
			}
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
</style>
